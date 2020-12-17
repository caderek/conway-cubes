const gameLoop = function (fn, fps) {
  let then = Date.now()

  fps = fps || 60
  const interval = 1000 / fps

  return (function loop(time) {
    requestAnimationFrame(loop)

    var now = Date.now()
    var delta = now - then

    if (delta > interval) {
      then = now - (delta % interval)
      fn()
    }
  })(0)
}

export default gameLoop
