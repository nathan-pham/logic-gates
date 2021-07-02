const print = (...args) => console.log(...args)

const not = (bit) => 1 - bit

const and = (...bits) => 
  bits.reduce((acc, cur) => acc * cur)

const or = (...bits) => 
  Math.min(Math.max(bits.reduce((acc, cur) => acc + cur), 0), 1)

const xor = (a, b) => and(nand(a, b), or(a, b))

const nand = (...bits) => not(and(...bits))
const nor = (...bits) => not(or(...bits))