// when invoked, pass in 'max' JS integer
function getRandomInt(max) {
  // this returns
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports.getRandomInt = getRandomInt;