const fs = require('fs')
const path = require('path')
const filter = require('../lib/stream-filter')
const { Stream } = require('stream')
const existantFile = path.resolve(__dirname, './test-file.txt')
const fileContents = 'Testing for some input! What for? Some output!'
const removeCapitals = (text) => text.toLowerCase()

beforeAll(() => {
  fs.writeFileSync(existantFile, fileContents)
})

afterAll(() => {
  fs.unlink(existantFile)
})

test('filter() should return a stream', () => {
  expect(filter()).toBeInstanceOf(Stream)
})

test('filter() should accept an input stream and return output', () => {
  const filterStream = filter(removeCapitals)
  const readStream = fs.createReadStream(existantFile)

  return new Promise((resolve, reject) => {
    readStream.pipe(filterStream)
    filterStream.on('finish', () => {
      resolve(true)
    })
  }).then(data => expect(data).toEqual(true))
})

test('filter() should apply a transformation function and return a filtered stream', () => {
  const transformFn = removeCapitals
  const filterStream = filter(removeCapitals)
  const readStream = fs.createReadStream(existantFile)

  return new Promise((resolve, reject) => {
    readStream.pipe(filterStream)
    let result = ''
    filterStream.on('data', (chunk) => {
      result += chunk
    })
    filterStream.on('finish', () => {
      resolve(result)
    })
  }).then(data => expect(data).toEqual(transformFn(fileContents)))
})
