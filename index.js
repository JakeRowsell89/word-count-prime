const tabula = require('tabula')
const { getWordCountAndIfPrime } = require('./lib/main')
const file = process.argv.slice(2)[0]

getWordCountAndIfPrime(file).then(words => {
  process.stdout.write('\u001B[2J\u001B[0;0F')
  process.stdout.write(`Occurrences of words in: ${file}\n\n`)
  tabula(words)
}).catch(err => {
  process.stdout.write(err.message + '\n')
})
