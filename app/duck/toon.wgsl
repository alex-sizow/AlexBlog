import { instanceWorldMatrix, transformNormal, transformPosition } from "@vgpu/wgsl-std/scene";

// wave: 0 solid, 1 water, 2 shadow (shadow is a separate draw, never outlined)
struct Frame {
  viewProjection: mat4x4f,
  cameraPosition: vec3f,
  time: f32,
  lightDir: vec3f,
  inflate: f32,
  shell: f32,
}

@group(0) @binding(0) var<uniform> frame: Frame;

struct VertexIn {
  @location(0) position: vec3f,
  @location(1) normal: vec3f,
  @location(2) uv: vec2f,
  @location(3) world0: vec4f,
  @location(4) world1: vec4f,
  @location(5) world2: vec4f,
  @location(6) world3: vec4f,
  @location(7) tint: vec4f,
  @location(8) wave: f32,
}

struct VertexOut {
  @builtin(position) clip: vec4f,
  @location(0) normal: vec3f,
  @location(1) worldPos: vec3f,
  @location(2) tint: vec4f,
  @location(3) wave: f32,
}

@vertex fn vs_main(input: VertexIn) -> VertexOut {
  let world = instanceWorldMatrix(input.world0, input.world1, input.world2, input.world3);
  var local = input.position;
  if (input.wave > 0.5 && input.wave < 1.5) {
    let ripple = sin(local.x * 8.0 + frame.time * 1.6) * cos(local.z * 6.5 - frame.time * 1.15);
    local.y += ripple * 0.045;
  }
  let n = transformNormal(world, input.normal);
  let p = transformPosition(world, local) + n * frame.inflate;
  var out: VertexOut;
  out.clip = frame.viewProjection * vec4f(p, 1.0);
  out.normal = n;
  out.worldPos = p;
  out.tint = input.tint;
  out.wave = input.wave;
  return out;
}

fn cel(ndotl: f32) -> f32 {
  if (ndotl > 0.62) { return 1.0; }
  if (ndotl > 0.28) { return 0.74; }
  return 0.46;
}

@fragment fn fs_main(input: VertexOut) -> @location(0) vec4f {
  let ink = vec3f(0.1, 0.07, 0.14);
  if (frame.shell > 0.5) {
    return vec4f(ink, 1.0);
  }
  if (input.wave > 1.5) {
    let a = input.tint.a;
    return vec4f(input.tint.rgb * a, a);
  }

  let n = normalize(input.normal);
  let light = normalize(frame.lightDir);
  let view = normalize(frame.cameraPosition - input.worldPos);
  var rgb = input.tint.rgb;

  if (input.wave > 0.5) {
    let band = sin(input.worldPos.x * 5.0 + frame.time * 1.4) * 0.5 + 0.5;
    rgb = mix(rgb, rgb * vec3f(0.72, 0.95, 1.08), band * 0.4);
    rgb = rgb * (0.62 + 0.38 * cel(max(dot(n, light), 0.0)));
  } else {
    let shade = cel(max(dot(n, light), 0.0));
    let half_dir = normalize(light + view);
    let spec = step(0.9, pow(max(dot(n, half_dir), 0.0), 24.0));
    let rim = pow(1.0 - max(dot(n, view), 0.0), 2.6);
    rgb = rgb * shade + vec3f(1.0, 0.96, 0.78) * spec * 0.7 + vec3f(1.0, 0.86, 0.55) * rim * 0.22;
  }

  let a = input.tint.a;
  return vec4f(rgb * a, a);
}
