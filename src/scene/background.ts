import * as BABYLON from "babylonjs"

const addBackground = (scene) => {
  scene.clearColor = BABYLON.Color3.FromInts(0, 0, 0)
}

export { addBackground }
