const test = (tests, circuit) => {
  tests.forEach(([args, expected], i) => {
    circuit(...args) == (typeof expected == "function" ? expected(...args) : expected)
      ? console.log("successfully completed test:", i)
      : console.log("failed test:", i)
  })
}

module.exports = test