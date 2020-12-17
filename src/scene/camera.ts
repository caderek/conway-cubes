import * as BABYLON from "babylonjs"

class Camera {
  public camera: any

  constructor(scene, canvas) {
    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 3,
      Math.PI / 3,
      20,
      new BABYLON.Vector3(0, 0, 0),
      scene,
    )

    camera.inertia = 0
    camera.panningInertia = 0
    camera.panningSensibility = 50
    camera.pinchPrecision = 20
    camera.allowUpsideDown = false
    camera.checkCollisions = true
    camera.lowerRadiusLimit = 10
    camera.angularSensibilityY = 500
    camera.angularSensibilityX = 500
    camera.useNaturalPinchZoom = true

    camera.attachControl(canvas, true)

    let touches = 0

    scene.onPrePointerObservable.add((action) => {
      const { type, event } = action

      if (type === 1) {
        touches++
      } else if (type === 2) {
        touches--
      }

      if (touches > 2) {
        action.skipOnPointerObservable = true
      }
    })

    // camera.target = new BABYLON.Vector3(0, 0, 0)
    this.camera = camera
  }
}

export default Camera
