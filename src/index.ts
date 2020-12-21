import "pepjs"
import * as BABYLON from "babylonjs"
import gameLoop from "./game-loop"
import createScene from "./createScene"
// import stats from "./helpers/stats"
import { randomInt } from "./helpers/random"

const targetFPS = 60

let pause = false

const generate = () => {
  const w = randomInt(Math.random, 1, 50)
  const h = randomInt(Math.random, 1, 30)
  let arr = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => (Math.random() > 0.7 ? "#" : ".")),
  )

  if (w % 2 === 0) {
    arr = arr.map((row) => [
      ...row.slice(0, w / 2),
      ...row.slice(0, w / 2).reverse(),
    ])
  }

  if (h % 2 === 0) {
    arr = [...arr.slice(0, h / 2), ...arr.slice(0, h / 2).reverse()]
  }

  return arr.map((row) => row.join("")).join("\n")
}

const main = async () => {
  const canvas = document.getElementById("viewport") as HTMLCanvasElement

  const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    disableWebGL2Support: true,
  })

  BABYLON.Engine.audioEngine.useCustomUnlockedButton = true

  const { renderFrame, scene, init } = await createScene(engine, canvas)

  gameLoop(() => {
    // stats.begin()
    if (!pause) {
      renderFrame()
    }

    scene.render()
    // stats.end()
  }, targetFPS)

  const $menu = document.getElementById("menu")
  const $pause = document.getElementById("pause")
  const $generate = document.getElementById("generate")
  const $start = document.getElementById("start")
  const $input = document.getElementById("input")
  const $turns = document.getElementById("turns")
  const $form = document.getElementById("form")
  const $info = document.getElementById("info")
  const $controls = document.getElementById("controls")

  window.addEventListener("resize", function () {
    engine.resize()
  })

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === " ") {
      pause = !pause
    } else if (e.key === "Enter") {
      if (!pause) {
        pause = true
      }

      $info.classList.add("none")
      $controls.classList.add("none")
      $form.classList.remove("none")
    }
  })

  $start.addEventListener("click", () => {
    // @ts-ignore
    const rawInput = $input.value
    // @ts-ignore
    const rawTurns = $turns.value

    const turns = Number(rawTurns) > 0 ? Number(rawTurns) : 0

    let input

    if (rawInput.indexOf("#") !== -1) {
      const afterSplit = rawInput.replace(/[^#\n]/g, ".").split("\n")
      const max = Math.max(...afterSplit.map((x) => x.length))
      input = afterSplit.map((x) => x.padEnd(max, ".")).join("\n")
    } else {
      input = generate()
    }

    $form.classList.add("none")
    $info.classList.remove("none")
    $controls.classList.remove("none")
    init(input, turns)
    if (pause) {
      pause = false
    }
  })

  $generate.addEventListener("click", () => {
    // @ts-ignore
    $input.value = generate()
  })

  $pause.addEventListener("click", () => {
    pause = !pause
  })

  $menu.addEventListener("click", () => {
    if (!pause) {
      pause = true
    }
    $form.classList.remove("none")
    $info.classList.add("none")
    $controls.classList.add("none")
  })
}

main()
