import * as BABYLON from "babylonjs"

const gap = 0.05

const bases: { [key: number]: BABYLON.Mesh } = {}

const createBaseCube = (item, scene, material) => {
  const cube = BABYLON.MeshBuilder.CreateBox(`cube_${material.id}`, {}, scene)
  cube.material = material.material
  cube.isVisible = false
  bases[item] = cube
}

let previousMap = []

type Return = {
  cubes: BABYLON.Mesh[]
  newCubes: Set<string>
  deadCubes: Set<string>
}

const createCubes = (
  map: (number | null)[][][],
  materials,
  scene: BABYLON.Scene,
): Return => {
  const cubes = []
  const newCubes: Set<string> = new Set()
  const deadCubes: Set<string> = new Set()

  const h = map.length
  const d = map[0].length
  const w = map[0][0].length

  for (let y = 0; y < h; y++) {
    for (let z = 0; z < d; z++) {
      for (let x = 0; x < w; x++) {
        const item = map[y][z][x]
        const prevItem = previousMap[y]?.[z]?.[x]
        const id = `${y}_${z}_${x}`

        if (!item && prevItem) {
          deadCubes.add(id)
          continue
        } else if (item && !prevItem) {
          newCubes.add(id)

          if (!bases[item]) {
            createBaseCube(item, scene, materials[item])
          }

          const cube = bases[item].createInstance(`${y}_${z}_${x}`)
          cube.position.y = -((h + gap * (h - 1)) / 2) + y + gap * y
          cube.position.z = -((d + gap * (d - 1)) / 2) + z + gap * z
          cube.position.x = -((w + gap * (w - 1)) / 2) + x + gap * x
          cube.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)

          cubes.push(cube)
        }
      }
    }
  }

  previousMap = map

  return { cubes, newCubes, deadCubes }
}

export default createCubes
