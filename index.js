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

// parseInt(binary, 2)

// more complicated circuits: half-adder
// returns [sum, cout]
const half_adder = (a, b) => ([
  atoms.xor(a, b),
  atoms.and(a, b)
])

// full-adder, composed of 2 half-adders
// returns [sum, cout]
const full_adder = (a, b, cin=0) => {
  let [s1, c1] = half_adder(a, b)
  let [s2, c2] = half_adder(s1, cin)

  return [
    s2,
    atoms.or(c1, c2)
  ]
}

const to_decimal = (results) => parseInt(results.reverse().join(''), 2)
const to_binary = (decimal) => Number(decimal).toString(2)
const format = (num) => to_binary(num).split('').map(n => parseInt(n))


console.log("\nI can add 1 + 1! yay!", to_decimal(full_adder(1, 1)))

// composed_adders(decimal_value, decimal_value)
// returns [sum, cout]
const composed_adders = (n1, n2) => {
  n1 = format(n1).reverse()
  n2 = format(n2).reverse()
  
  const adders = new Array(Math.max(n1.length, n2.length)).fill(full_adder)
  let total_sum = []
  let cache_cout = 0

  for(let i = 0; i < adders.length; i++) {
    const adder = adders[i]

    let [sum, cout] = adder(n1[i] || 0, n2[i] || 0, cache_cout)
    total_sum.push(sum)
    cache_cout = cout
  }

  return [total_sum, cache_cout]
}

console.log("I can add 2 + 10 too!", to_decimal(composed_adders(2, 10)[0]))