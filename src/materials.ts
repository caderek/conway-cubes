import * as BABYLON from "babylonjs"

type Materials = {
  id: number | string
  name: string
  color: [number, number, number]
  colorHex?: string
  roughness: number
  metallic: number
  alpha: number
  emission: number
}[]

const materialEntries: Materials = [
  {
    id: 1,
    name: "crystal-yellow",
    color: [1, 0.468, 0],
    colorHex: "#FFB600",
    roughness: 0.8,
    metallic: 0,
    alpha: 1,
    emission: 1,
  },
  {
    id: 2,
    name: "crystal-magenta",
    color: [0.799, 0, 0.178],
    colorHex: "#E70075",
    roughness: 0.8,
    metallic: 0,
    alpha: 1,
    emission: 1,
  },
  {
    id: 3,
    name: "crystal-cyan",
    color: [0, 0.266, 0.799],
    colorHex: "#008DE7",
    roughness: 0.8,
    metallic: 0,
    alpha: 1,
    emission: 1,
  },
  {
    id: 4,
    name: "crystal-purple",
    color: [0.136, 0.016, 0.8],
    colorHex: "#6723E7",
    roughness: 0.8,
    metallic: 0,
    alpha: 1,
    emission: 1,
  },
  {
    id: 5,
    name: "crystal-green",
    color: [0.007, 0.8, 0.133],
    colorHex: "#14E766",
    roughness: 0.8,
    metallic: 0,
    alpha: 1,
    emission: 1,
  },
]

const createMaterials = (scene) =>
  Object.fromEntries(
    materialEntries.map((entry) => {
      let material = new BABYLON.PBRMaterial(entry.name, scene)
      material.alpha = entry.alpha
      material.albedoColor = new BABYLON.Color3(...entry.color)
      material.roughness = entry.roughness
      material.metallic = entry.metallic
      material.maxSimultaneousLights = 12

      if (entry.alpha !== 1) {
        material.needDepthPrePass = true
        material.alphaMode = BABYLON.Engine.ALPHA_COMBINE
      }

      if (entry.emission !== 0) {
        material.emissiveColor = new BABYLON.Color3(...entry.color)
        material.emissiveIntensity = entry.emission
      }

      return [entry.id, { ...entry, material }]
    }),
  )

const materialsByID = Object.fromEntries(
  materialEntries.map((entry) => [entry.id, entry]),
)

export { materialEntries, materialsByID }
export default createMaterials
