/*
  Given a file location attempts to locate the file and returns a promise.
  Resolves with a readable stream or rejects with an Error
*/

const fs = require('fs')
const split = require('split')

const fileExists = (filePath, cb) => {
  fs.access(filePath, 'r', (err) => {
    if (err) {
      cb(err.code === 'ENOENT' ? new Error('file not found') : err)
    } else {
      cb(null)
    }
  })
}

const fileReadStream = (filePath) => {
  return new Promise((resolve, reject) => {
    fileExists(filePath, (err, data) => {
      if (!err) {
        resolve(fs.createReadStream(filePath).pipe(split()))
      } else {
        reject(new Error('file not found'))
      }
    })
  })
}

module.exports = fileReadStream
