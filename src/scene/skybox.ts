class Skybox {
  constructor(scene) {
    scene.clearColor = BABYLON.Color3.FromInts(0, 0, 0)

    const skybox = BABYLON.MeshBuilder.CreateBox(
      "skyBox",
      { size: 10000.0 },
      scene,
    )
    skybox.position.x = 9
    skybox.position.y = 9
    skybox.position.z = 9

    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      "skybox/skybox",
      scene,
    )
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skybox.material = skyboxMaterial
    skybox.isPickable = false
  }
}

export default Skybox
