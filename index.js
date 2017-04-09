#! /usr/bin/env node

const tabula = require('tabula')
const { getWordCountAndIfPrime } = require('./lib/main')
const file = process.argv.slice(2)[0]
const nodeVersion = Number(process.version.match(/^v(\d+\.\d+)/)[1])

if (nodeVersion < 6.9) {
  process.stdout.write('Please use Node v6.9.0 or later\n')
} else {
  getWordCountAndIfPrime(file).then(words => {
    process.stdout.write('\u001B[2J\u001B[0;0F')
    process.stdout.write(`Occurrences of words in: ${file}\n\n`)
    tabula(words)
  }).catch(err => {
    process.stdout.write(err.message + '\n')
  })
}
