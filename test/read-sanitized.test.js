const fs = require('fs')
const path = require('path')
const { Stream } = require('stream')
const { sanitize, getSanitizedText } = require('../lib/read-sanitized')
const existantFile = path.resolve(__dirname, './test-file.txt')
const nonExistantFile = 'nonExistant' + existantFile
const fileContents = 'Test this text! Is, being sanitized!'

beforeAll(() => {
  fs.writeFileSync(existantFile, fileContents)
})

afterAll(() => {
  fs.unlink(existantFile)
})

test('sanitize() removes capitalisation and non-space special characters from a string', () => {
  expect(sanitize(fileContents)).toEqual('test this text is being sanitized')
})

test('getSanitizedText() returns a promise', () => {
  expect(getSanitizedText()).toBeInstanceOf(Promise)
})

test('getSanitizedText(<invalidFilename>) returns a Promise that errors', () => {
  return getSanitizedText(nonExistantFile).catch(e => expect(e.message).toEqual('file not found'))
})

test('getSanitizedText(<validFilename>) returns a Promise that resolves to a stream', () => {
  return getSanitizedText(existantFile).then(d => expect(d).toBeInstanceOf(Stream))
})

test('getSanitizedText(<validFilename>) resolves to a stream of lowercase text with no special characters', () => {
  return getSanitizedText(existantFile).then(stream => {
    return new Promise((resolve, reject) => {
      let result = ''
      stream.on('data', (chunk) => {
        result += chunk
      })
      stream.on('end', () => {
        const cleanFileContents = sanitize(fileContents)
        resolve(result === cleanFileContents)
      })
    }).then(data => expect(data).toEqual(true))
  })
})
