import * as BABYLON from "babylonjs"
import Lights from "./scene/lights"
import Shadows from "./scene/shadows"
import Camera from "./scene/camera"
import solve from "./world/solve"
import Skybox from "./scene/skybox"
import createCubes from "./createCubes"
import createMaterials from "./materials"

const input = `.......#
....#...
...###.#
#...###.
....##..
##.#..#.
###.#.#.
....#...`

const $turn = document.getElementById("turn")
const $count = document.getElementById("count")

const createScene = async (engine, canvas) => {
  const scene = new BABYLON.Scene(engine)

  // @ts-ignore
  scene.clearColor = BABYLON.Color3.FromHexString("#110011")

  scene.blockMaterialDirtyMechanism = true
  // @ts-ignore
  scene.useGeometryIdsMap = true
  // @ts-ignore
  scene.useClonedMeshMap = true

  const lights = new Lights(scene)
  const camera = new Camera(scene, canvas)

  const materials = createMaterials(scene)

  type State = {
    steps: { state: any; count: number }[]
    cubes: Map<string, BABYLON.Mesh>
    newCubes: Set<string>
    deadCubes: Set<string>
  }

  const state: State = {
    steps: [],
    cubes: new Map(),
    newCubes: new Set(),
    deadCubes: new Set(),
  }

  let i = 0
  let scaleNew = 0.1
  let scaleDead = 1
  let interval = 60
  let scaleDelta = 1 / 60
  let ticks = 0

  const init = (input: string, turns: number) => {
    state.cubes.forEach((cube) => cube.dispose())
    state.cubes.clear()
    state.newCubes.clear()
    state.deadCubes.clear()
    state.steps = solve(input, turns)
    i = 0
    scaleNew = 0.1
    scaleDead = 1
    ticks = 0
  }

  const renderFrame = () => {
    if (state.steps.length === 0) {
      return
    }
    if (ticks === 0) {
      scaleNew = 0.1
      scaleDead = 1

      if (i === 0) {
        state.cubes.forEach((cube) => cube.dispose())
        state.cubes.clear()
        state.newCubes.clear()
        state.deadCubes.clear()
      }

      const { cubes, newCubes, deadCubes } = createCubes(
        state.steps[i].state,
        materials,
        scene,
      )

      $turn.innerText = String(i)
      $count.innerText =
        i === 6
          ? String(state.steps[i].count).replace(/\d/g, "?")
          : String(state.steps[i].count)

      cubes.forEach((cube) => state.cubes.set(cube.name, cube))
      state.newCubes = newCubes
      state.deadCubes = deadCubes

      i = (i + 1) % state.steps.length
    }

    if (scaleNew < 0.99) {
      scaleNew += scaleDelta
    }

    if (scaleDead > 0.01) {
      scaleDead -= scaleDelta
    }

    state.cubes.forEach((cube) => {
      if (state.newCubes.has(cube.id)) {
        cube.scaling = new BABYLON.Vector3(scaleNew, scaleNew, scaleNew)
      } else if (state.deadCubes.has(cube.id)) {
        if (scaleDead <= 0.01) {
          state.cubes.get(cube.id).dispose()
          state.cubes.delete(cube.id)
        } else {
          cube.scaling = new BABYLON.Vector3(scaleDead, scaleDead, scaleDead)
        }
      }
    })

    ticks = (ticks + 1) % interval
  }

  return { renderFrame, scene, init }
}

export default createScene
