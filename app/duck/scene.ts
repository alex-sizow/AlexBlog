import { clock, draw, frameLoop, geometry, init, sampler, surface, texture } from 'vgpu'
import type { FrameLoopHandle } from 'vgpu'
import {
  composeMatrix,
  disk,
  group,
  instances,
  orbit,
  orbitRig,
  perspective,
  rigPose,
  smoothRig,
  sphere,
  viewMatrices,
} from 'vgpu/scene'
import { instanceGeometry } from 'vgpu/scene/gpu'
import duckShader from './duck.wgsl'
import { loadDuckMesh } from './mesh'
import toonShader from './toon.wgsl'

const SOLID = 0
const WATER = 1
const SHADOW = 2
const schema = { tint: 'float32x4', wave: 'float32' } as const
const pondBlue = [0.18, 0.58, 0.92, 1] as const
const lilyGreen = [0.28, 0.74, 0.3, 1] as const
const bubbleWhite = [0.9, 0.97, 1, 1] as const
const shadowInk = [0.12, 0.08, 0.16, 0.28] as const
const lightDir = new Float32Array([0.35, 0.86, 0.28])
const limits = { minPitch: 0.12, maxPitch: 1.05, minDistance: 1.8, maxDistance: 6 }
// Mesh faces +Z. A camera yaw near 0 sits on +Z and sees the beak.
const DUCK_SCALE = 5.1

export type DuckOptions = {
  reduced: boolean
  onQuack: () => void
}

export type DuckHandle = {
  dispose: () => void
  quack: () => void
  orbit: (deltaYaw: number, deltaPitch: number) => void
}
type PointerHandlers = {
  onDrag: (dx: number, dy: number) => void
  onLook: (x: number, y: number) => void
  onLeave: () => void
  onQuack: () => void
}

export async function startDuck(canvas: HTMLCanvasElement, options: DuckOptions): Promise<DuckHandle> {
  if (!navigator.gpu) throw new Error('webgpu-unavailable')

  const [gpu, mesh, bitmap] = await Promise.all([
    init(),
    loadDuckMesh(),
    loadAlbedo(),
  ])
  let loop: FrameLoopHandle | undefined
  let disposed = false
  const cleanups: Array<() => void> = []
  const stop = () => {
    if (disposed) return
    disposed = true
    for (const cleanup of cleanups) cleanup()
    loop?.stop()
    gpu.dispose()
  }

  try {
    const canvasSurface = surface(gpu, canvas, {
      depth: true,
      msaa: true,
      dpr: [1, 2],
      alphaMode: 'premultiplied',
    })
    const albedo = texture(gpu, {
      kind: '2d',
      size: [bitmap.width, bitmap.height],
      format: 'rgba8unorm-srgb',
      usage: ['texture_binding', 'copy_dst', 'render_attachment'],
    })
    gpu.gpu.queue.copyExternalImageToTexture(
      { source: bitmap },
      { texture: albedo.gpu },
      [bitmap.width, bitmap.height],
    )
    bitmap.close()

    const duckGeometry = geometry(gpu, {
      buffers: [
        { data: mesh.positions, attributes: { position: { format: 'float32x3', location: 0 } } },
        { data: mesh.normals, attributes: { normal: { format: 'float32x3', location: 1 } } },
        { data: mesh.uvs, attributes: { uv: { format: 'float32x2', location: 2 } } },
      ],
      indices: mesh.indices,
    })
    const duckFill = draw(gpu, { shader: duckShader, geometry: duckGeometry, cull: 'back' })
    const duckShell = draw(gpu, { shader: duckShader, geometry: duckGeometry, cull: 'front' })
    const albedoSampler = sampler(gpu, { magFilter: 'linear', minFilter: 'linear' })

    const disks = instances({ capacity: 4, attributes: schema })
    const spheres = instances({ capacity: 8, attributes: schema })
    const shadows = instances({ capacity: 1, attributes: schema })
    attach(disks, { position: [0, 0, 0.05], scale: [1.7, 1, 1.2] }, pondBlue, WATER)
    attach(disks, { position: [0.95, 0.05, 0.35], rotation: [0, 0.4, 0], scale: [0.42, 1, 0.34] }, lilyGreen)
    const shadowNode = attach(shadows, { position: [0, 0.03, 0.05], scale: [0.85, 1, 0.62] }, shadowInk, SHADOW)
    const bubbles = [0, 1, 2, 3].map(() => attach(spheres, { scale: 0.05 }, bubbleWhite))
    const diskMesh = geometry(gpu, disk({ radius: 1, segments: 40 }))
    const sphereMesh = geometry(gpu, sphere({ radius: 0.5, widthSegments: 16, heightSegments: 12 }))
    const pondBridge = instanceGeometry(gpu, disks, { mesh: diskMesh })
    const bubbleBridge = instanceGeometry(gpu, spheres, { mesh: sphereMesh })
    const shadowBridge = instanceGeometry(gpu, shadows, { mesh: geometry(gpu, disk({ radius: 1, segments: 24 })) })
    const pondFill = draw(gpu, { shader: toonShader, geometry: pondBridge.geometry, cull: 'back' })
    const pondShell = draw(gpu, { shader: toonShader, geometry: pondBridge.geometry, cull: 'front' })
    const bubbleFill = draw(gpu, { shader: toonShader, geometry: bubbleBridge.geometry, cull: 'back' })
    const shadowFill = draw(gpu, {
      shader: toonShader,
      geometry: shadowBridge.geometry,
      cull: 'back',
      blend: 'premultiplied',
    })

    const goal = orbitRig({ target: [0, 0.62, 0.02], yaw: 0.4, pitch: 0.2, distance: 3.35 })
    const current = orbitRig({ target: [0, 0.62, 0.02], yaw: 0.4, pitch: 0.2, distance: 3.35 })
    const pose = { position: new Float32Array(3), quaternion: new Float32Array(4) }
    const projection = new Float32Array(16)
    const camera = { view: new Float32Array(16), viewProjection: new Float32Array(16) }
    const model = new Float32Array(16)
    const lens = { fov: 28, near: 0.05, far: 30 }
    canvasSurface.onResize(({ width, height }) => {
      perspective(lens, width / Math.max(height, 1), projection)
    })

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = options.reduced || motion.matches
    const onMotion = () => {
      reduced = motion.matches
    }
    motion.addEventListener('change', onMotion)
    cleanups.push(() => motion.removeEventListener('change', onMotion))

    let goalYaw = 0
    let lookYaw = 0
    let quackAge = 0
    let pointerInside = false
    function poke() {
      quackAge = 0.001
      options.onQuack()
    }
    cleanups.push(bindPointer(canvas, {
      onDrag(dx, dy) {
        orbit(goal, -dx * 0.007, dy * 0.004, limits)
      },
      onLook(x) {
        pointerInside = true
        goalYaw = x * 0.45
      },
      onLeave() {
        pointerInside = false
      },
      onQuack: poke,
    }))

    const time = clock(gpu)
    loop = frameLoop(gpu, (currentFrame) => {
      const dt = Math.min(time.deltaTime, 0.05)
      const t = reduced ? 0 : time.time
      const bob = reduced ? 0 : Math.sin(t * 1.6) * 0.035
      const roll = reduced ? 0 : Math.sin(t * 1.2) * 0.04
      if (quackAge > 0) {
        quackAge += dt
        if (quackAge > 0.38) quackAge = 0
      }
      const squash = quackAge > 0 ? Math.sin((quackAge / 0.38) * Math.PI) : 0
      const follow = reduced ? 1 : 1 - Math.exp(-dt * 8)
      if (!pointerInside) goalYaw += (0 - goalYaw) * follow
      lookYaw += (goalYaw - lookYaw) * follow

      composeMatrix({
        position: [0, 0.02 + bob + squash * 0.08, 0],
        rotation: [0.08, lookYaw, roll],
        scale: [DUCK_SCALE * (1 + squash * 0.05), DUCK_SCALE * (1 - squash * 0.14), DUCK_SCALE * (1 + squash * 0.05)],
      }, model)
      shadowNode.set({
        position: [Math.sin(lookYaw) * 0.04, 0.03, 0.05],
        scale: [0.9 + bob, 1, 0.62],
      })
      for (let index = 0; index < bubbles.length; index++) {
        const phase = (t * 0.16 + index * 0.23) % 1
        const rise = reduced ? 0.3 : phase
        const angle = index * 1.4 + 0.6
        bubbles[index]?.set({
          position: [Math.cos(angle) * 0.7, 0.06 + rise * 0.55, Math.sin(angle) * 0.45],
          scale: 0.04 + (1 - rise) * 0.025,
        })
      }
      disks.syncWorlds()
      spheres.syncWorlds()
      shadows.syncWorlds()

      smoothRig(current, goal, dt, { timeConstant: reduced ? 0 : 0.1 })
      viewMatrices(rigPose(current, pose), projection, camera)
      const duckFrame = {
        viewProjection: camera.viewProjection,
        model,
        cameraPosition: pose.position,
        lightDir,
        inflate: 0,
        shell: 0,
      }
      const pondFrame = {
        viewProjection: camera.viewProjection,
        cameraPosition: pose.position,
        time: t,
        lightDir,
        inflate: 0,
        shell: 0,
      }
      duckFill.set({ frame: duckFrame, albedo, albedoSampler })
      duckShell.set({ frame: { ...duckFrame, inflate: 0.008, shell: 1 }, albedo, albedoSampler })
      pondFill.set({ frame: pondFrame })
      pondShell.set({ frame: { ...pondFrame, inflate: 0.01, shell: 1 } })
      bubbleFill.set({ frame: pondFrame })
      shadowFill.set({ frame: pondFrame })

      const pondCount = pondBridge.publish()
      const bubbleCount = bubbleBridge.publish()
      const shadowCount = shadowBridge.publish()
      currentFrame.pass({ target: canvasSurface, clear: [0, 0, 0, 0] }, (pass) => {
        pass.draw(pondShell, { instances: pondCount })
        pass.draw(pondFill, { instances: pondCount })
        pass.draw(shadowFill, { instances: shadowCount })
        pass.draw(duckShell)
        pass.draw(duckFill)
        pass.draw(bubbleFill, { instances: bubbleCount })
      })
    })

    return {
      dispose: stop,
      quack: poke,
      orbit(deltaYaw, deltaPitch) {
        orbit(goal, deltaYaw, deltaPitch, limits)
      },
    }
  } catch (error) {
    stop()
    throw error
  }
}

async function loadAlbedo() {
  const response = await fetch('/duck/rubber_duck_toy_diff.jpg')
  if (!response.ok) throw new Error('duck-texture')
  return createImageBitmap(await response.blob())
}

function attach(
  collection: ReturnType<typeof instances<typeof schema>>,
  transform: Parameters<typeof group>[0],
  tint: readonly [number, number, number, number],
  wave = SOLID,
) {
  const node = group(transform)
  const id = collection.add({ tint: [tint[0], tint[1], tint[2], tint[3]], wave })
  collection.bindWorld(id, () => node.worldMatrix)
  return node
}

function bindPointer(target: HTMLCanvasElement, handlers: PointerHandlers) {
  let drag: { x: number, y: number, moved: number, id: number } | undefined
  const down = (event: PointerEvent) => {
    drag = { x: event.clientX, y: event.clientY, moved: 0, id: event.pointerId }
    target.setPointerCapture(event.pointerId)
  }
  const move = (event: PointerEvent) => {
    if (drag && drag.id === event.pointerId) {
      const dx = event.clientX - drag.x
      const dy = event.clientY - drag.y
      drag.x = event.clientX
      drag.y = event.clientY
      drag.moved += Math.abs(dx) + Math.abs(dy)
      handlers.onDrag(dx, dy)
      return
    }
    const rect = target.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    handlers.onLook((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1)
  }
  const up = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return
    const moved = drag.moved
    drag = undefined
    if (moved < 8) handlers.onQuack()
  }
  target.addEventListener('pointerdown', down)
  target.addEventListener('pointermove', move)
  target.addEventListener('pointerup', up)
  target.addEventListener('pointercancel', up)
  target.addEventListener('pointerleave', handlers.onLeave)
  return () => {
    target.removeEventListener('pointerdown', down)
    target.removeEventListener('pointermove', move)
    target.removeEventListener('pointerup', up)
    target.removeEventListener('pointercancel', up)
    target.removeEventListener('pointerleave', handlers.onLeave)
  }
}
