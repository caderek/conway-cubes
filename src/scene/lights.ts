import * as BABYLON from "babylonjs"

class Lights {
  top: any
  bottom: any
  ambient: any
  skybox: any
  private glow: any
  private scene: any

  constructor(scene) {
    this.scene = scene
    this.createLights()
    this.createGlow()
  }

  createGlow() {
    const glow = new BABYLON.GlowLayer("glow", this.scene)
    glow.intensity = 0

    this.glow = glow
  }

  excludeFromGlow(mesh) {
    this.glow.addExcludedMesh(mesh)
  }

  private createLights() {
    const color = new BABYLON.Color3(1, 1, 1)
    const top = new BABYLON.DirectionalLight(
      "topLight",
      new BABYLON.Vector3(9, -30, 30),
      this.scene,
    )
    top.diffuse = color
    top.intensity = 3
    top.autoUpdateExtends = false
    top.autoCalcShadowZBounds = true
    top.setEnabled(true)
    const bottom = new BABYLON.DirectionalLight(
      "underLight",
      new BABYLON.Vector3(9, 30, 9),
      this.scene,
    )
    bottom.intensity = 0.5
    bottom.setEnabled(true)
    const ambient = new BABYLON.HemisphericLight(
      "ambientLight",
      new BABYLON.Vector3(0, 30, 0),
      this.scene,
    )
    ambient.intensity = 0.2
    ambient.setEnabled(true)
    this.top = top
    this.bottom = bottom
    this.ambient = ambient
  }
}

export default Lights
