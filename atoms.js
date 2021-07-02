const not = (bit) => 1 - bit

const and = (a, b) => a * b
const nand = (...bits) => not(and(...bits))

const or = (a, b) => Math.min(Math.max(a + b, 0), 1)
const nor = (...bits) => not(or(...bits))

const xor = (a, b) => and(nand(a, b), or(a, b))

module.exports = {
  not,
  and, nand,
  or, nor,
  xor
}