const atoms = require("./atoms")
const test = require("./test")

// atoms contain "elemental", base circuits

// custom xor circuit 
// see: https://vlsiuniverse.blogspot.com/2016/10/xor-using-nand.html
const custom_xor = (a, b) => (
  atoms.nand(
    atoms.nand(atoms.not(a), b),
    atoms.nand(a, atoms.not(b))
  )
)

// xor truth table (test function also accepts "atoms.xor" instead of an expected value)
const truth_table = [
  [[0, 0], atoms.xor],
  [[0, 1], 1],
  [[1, 0], 1],
  [[1, 1], 0]
]

// test custom circuit
test(truth_table, custom_xor)