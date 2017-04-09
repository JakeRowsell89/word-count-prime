const readFile = require('./read-file')
const filter = require('./stream-filter')

const sanitize = (str) => str.replace(/[^a-z\s]/ig, '').toLowerCase()

const getWordCount = (pathName) => {
  return readFile(pathName)
}

const getSanitizedText = (pathName) => {
  const filterStream = filter(sanitize)
  return new Promise((resolve, reject) => {
    readFile(pathName).then(stream => {
      resolve(stream.pipe(filterStream))
    }).catch(reject)
  })
}

module.exports = {
  getWordCount,
  getSanitizedText,
  sanitize
}

// get wordcount for path
// get contents as clean lines
