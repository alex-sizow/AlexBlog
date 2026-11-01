import { transformNormal, transformPosition } from "@vgpu/wgsl-std/scene";

struct Frame {
  viewProjection: mat4x4f,
  model: mat4x4f,
  cameraPosition: vec3f,
  lightDir: vec3f,
  inflate: f32,
  shell: f32,
}

@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var albedo: texture_2d<f32>;
@group(0) @binding(2) var albedoSampler: sampler;

struct VertexOut {
  @builtin(position) clip: vec4f,
  @location(0) normal: vec3f,
  @location(1) worldPos: vec3f,
  @location(2) uv: vec2f,
}

@vertex fn vs_main(
  @location(0) position: vec3f,
  @location(1) normal: vec3f,
  @location(2) uv: vec2f,
) -> VertexOut {
  let n = transformNormal(frame.model, normal);
  let p = transformPosition(frame.model, position) + n * frame.inflate;
  var out: VertexOut;
  out.clip = frame.viewProjection * vec4f(p, 1.0);
  out.normal = n;
  out.worldPos = p;
  out.uv = uv;
  return out;
}

fn cel(ndotl: f32) -> f32 {
  if (ndotl > 0.55) { return 1.0; }
  if (ndotl > 0.22) { return 0.78; }
  return 0.55;
}

fn toSrgb(color: vec3f) -> vec3f {
  let below = color * 12.92;
  let above = 1.055 * pow(color, vec3f(1.0 / 2.4)) - 0.055;
  return select(above, below, color <= vec3f(0.0031308));
}

@fragment fn fs_main(input: VertexOut) -> @location(0) vec4f {
  if (frame.shell > 0.5) {
    return vec4f(0.1, 0.07, 0.12, 1.0);
  }
  let n = normalize(input.normal);
  let light = normalize(frame.lightDir);
  let view = normalize(frame.cameraPosition - input.worldPos);
  let shade = cel(max(dot(n, light), 0.0));
  let rim = pow(1.0 - max(dot(n, view), 0.0), 3.0);
  let color = textureSample(albedo, albedoSampler, input.uv).rgb * shade + vec3f(1.0, 0.9, 0.7) * rim * 0.08;
  return vec4f(toSrgb(color), 1.0);
}
