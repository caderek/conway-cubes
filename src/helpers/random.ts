const randomToInt = (num, min, max) => {
  return Math.floor(num * (max - min + 1)) + min
}

const randomInt = (rng = Math.random, min, max) => {
  return Math.floor(rng() * (max - min + 1)) + min
}

export { randomToInt, randomInt }
