/*
  Given an input stream returns a filtered output stream
*/

const stream = require('stream')

const createTransformStream = (transformFn) => {
  return new stream.Transform({
    transform (chunk, encoding, callback) {
      chunk = chunk.toString()
      callback(null, transformFn(chunk))
    }
  })
}

module.exports = createTransformStream
