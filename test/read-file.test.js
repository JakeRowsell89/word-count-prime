const fs = require('fs')
const path = require('path')
const { Stream } = require('stream')
const readFile = require('../lib/read-file')
const existantFile = path.resolve(__dirname, './test-file.txt')
const fileContents = 'Test'

beforeAll(() => {
  fs.writeFileSync(existantFile, fileContents)
})

afterAll(() => {
  fs.unlink(existantFile)
})

test('readFile returns a promise', () => {
  expect(readFile()).toBeInstanceOf(Promise)
})

test('Attempting to read an non-existing file will throw an error', () => {
  return readFile(existantFile).catch(err => expect(err.message).toEqual('file not found'))
})

test('Reading an existing file will return a promise containing a Readable stream', () => {
  return readFile(existantFile).then(data => expect(data).toBeInstanceOf(Stream))
})

test('Readable stream contents after completion should be the same as fileContents', () => {
  return readFile(existantFile).then(stream => {
    return new Promise((resolve, reject) => {
      let result = ''
      stream.on('data', (chunk) => {
        result += chunk
      })
      stream.on('end', () => {
        resolve(result === fileContents)
      })
    }).then(data => expect(data).toEqual(true))
  })
})
