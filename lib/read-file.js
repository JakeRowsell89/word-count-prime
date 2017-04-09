const fs = require('fs')

const fileExists = (filePath, cb) => {
  fs.access(filePath, (err) => {
    cb(err && err.code === 'ENOENT')
  })
}

module.exports = function (filePath) {
  const p = new Promise((resolve, reject) => {
    fileExists(filePath, (exists) => {
      if (exists) {
        const stream = fs.createReadStream(filePath)
        resolve(stream)
      } else {
        reject(new Error('file not found'))
      }
    })
  })

  return p
}
