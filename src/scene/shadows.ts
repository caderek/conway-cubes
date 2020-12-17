import * as BABYLON from "babylonjs"

class Shadows {
  shadowGenerator: any
  private scene: any
  private light: any

  constructor(scene, light) {
    this.scene = scene
    this.light = light

    this.create()
  }

  private create() {
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light)

    shadowGenerator.bias = 0.01
    shadowGenerator.usePercentageCloserFiltering = true
    shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM

    this.shadowGenerator = shadowGenerator
  }

  addCaster(mesh) {
    this.shadowGenerator.addShadowCaster(mesh)
  }

  refresh() {
    this.shadowGenerator.dispose()
    this.create()
  }
}

export default Shadows
