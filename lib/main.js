const isPrime = require('prime-check')
const { getSanitizedText } = require('./read-sanitized')
const wordCount = require('./word-count')

const markWordsAsPrime = (words) => {
  return words.map(word => {
    return Object.assign(word, { prime: isPrime(word.amount) })
  })
}

const getWordCountForPath = (pathName) => {
  return new Promise((resolve, reject) => {
    getSanitizedText(pathName).then(stream => {
      resolve(wordCount(stream))
    }).catch(reject)
  })
}

const getWordCountAndIfPrime = (pathName) => {
  return new Promise((resolve, reject) => {
    getWordCountForPath(pathName).then(words => {
      resolve(markWordsAsPrime(words))
    }).catch(reject)
  })
}

module.exports = {
  getWordCountForPath,
  getWordCountAndIfPrime
}
