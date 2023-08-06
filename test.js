const array = [1, 2, 3, 4, 5, 6]

const map = array.filter( (x)=> x !== 2)//.map((x)=> x)

array[0] = 34

console.log(array)
console.log(map)