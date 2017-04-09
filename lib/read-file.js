const fs = require('fs')

const fileExists = (filePath, cb) => {
  fs.access(filePath, 'r', (err) => {
    if (err) {
      cb(err.code === 'ENOENT' ? new Error('file not found') : err)
    } else {
      cb(null)
    }
  })
}

module.exports = function (filePath) {
  const p = new Promise((resolve, reject) => {
    fileExists(filePath, (err, data) => {
      if (!err) {
        const stream = fs.createReadStream(filePath)
        resolve(stream)
      } else {
        reject(new Error('file not found'))
      }
    })
  })

  return p
}
