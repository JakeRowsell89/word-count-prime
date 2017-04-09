/*
  Read file at specified path and return promise containing a filtered stream
*/
const readFile = require('./read-file')
const filter = require('./stream-filter')

const sanitize = (str) => str.replace(/[^a-z\s]/ig, '').toLowerCase()

const getSanitizedText = (pathName) => {
  const filterStream = filter(sanitize)
  return new Promise((resolve, reject) => {
    readFile(pathName).then(stream => {
      resolve(stream.pipe(filterStream))
    }).catch(reject)
  })
}

module.exports = {
  sanitize,
  getSanitizedText
}
