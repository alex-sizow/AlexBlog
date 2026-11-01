export type DuckMesh = {
  positions: Float32Array
  normals: Float32Array
  uvs: Float32Array
  indices: Uint16Array
}

// glTF accessors from public/duck/rubber_duck_toy.gltf (Poly Haven, CC0).
const VERTEX_COUNT = 2489
const INDEX_COUNT = 12864

export async function loadDuckMesh(): Promise<DuckMesh> {
  const bin = await fetch('/duck/rubber_duck_toy.bin').then((response) => {
    if (!response.ok) throw new Error('duck-mesh')
    return response.arrayBuffer()
  })
  return {
    positions: copyFloats(bin, 0, VERTEX_COUNT * 3),
    normals: copyFloats(bin, 29868, VERTEX_COUNT * 3),
    uvs: copyFloats(bin, 59736, VERTEX_COUNT * 2),
    indices: new Uint16Array(new Uint16Array(bin, 79648, INDEX_COUNT)),
  }
}

function copyFloats(bin: ArrayBuffer, byteOffset: number, count: number) {
  return new Float32Array(new Float32Array(bin, byteOffset, count))
}
