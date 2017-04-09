require('console.table')
const { getWordCountAndIfPrime } = require('./lib/main')
const file = process.argv.slice(2)[0]
const title = `Occurrences of words in ${file}`

getWordCountAndIfPrime(file).then(words => {
  process.stdout.write('\u001B[2J\u001B[0;0F')
  console.table(title, words)
}).catch(err => {
  process.stdout.write(err.message + '\n')
})
