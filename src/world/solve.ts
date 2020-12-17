// @ts-ignore
import * as gen from "generatorics"
import { randomInt } from "../helpers/random"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((row) =>
      row.split("").map((x) => (x === "." ? 0 : randomInt(Math.random, 1, 5))),
    )

const deltas = [...gen.clone.baseN([0, 1, -1])].slice(1)

const countNeighbors = (arr, z, y, x) => {
  let n = 0

  deltas.forEach(([i, j, k]) => {
    if (arr[z + i]?.[y + j]?.[x + k]) {
      n++
    }
  })

  return n
}

const surroundByEmptySpace = (arr: (number | undefined)[][][]) => {
  const h = arr.length + 2
  const d = arr[0].length + 2
  const w = arr[0][0].length + 2
  return Array.from({ length: h }, (_, z) =>
    Array.from({ length: d }, (_, y) =>
      Array.from({ length: w }, (_, x) => arr[z - 1]?.[y - 1]?.[x - 1]),
    ),
  )
}

const solve = (rawInput: string, depth: number = 6) => {
  const input = prepareInput(rawInput)

  let world = surroundByEmptySpace([input])
  let i = 0
  const steps = [
    {
      state: JSON.parse(JSON.stringify(world)),
      count: world.flat(2).filter((x) => x >= 1).length,
    },
  ]

  while (i < depth) {
    const copy = JSON.parse(JSON.stringify(world))

    for (let z = 0; z < world.length; z++) {
      for (let y = 0; y < world[0].length; y++) {
        for (let x = 0; x < world[0][0].length; x++) {
          const item = world[z][y][x]
          const neighbors = countNeighbors(world, z, y, x)

          copy[z][y][x] = item
            ? neighbors === 2 || neighbors === 3
              ? item
              : 0
            : neighbors === 3
            ? randomInt(Math.random, 1, 5)
            : 0
        }
      }
    }

    world = surroundByEmptySpace(copy)
    steps.push({
      state: copy,
      count: copy.flat(2).filter((x) => x >= 1).length,
    })
    i++
  }

  return steps
}

export default solve
