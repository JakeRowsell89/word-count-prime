const fs = require('fs')
const path = require('path')
const { getWordCountForPath, getWordCountAndIfPrime } = require('../lib/index')
const existantFile = path.resolve(__dirname, './test-file.txt')
const nonExistantFile = 'nonExistant' + existantFile
const fileContents = 'Test this text! Is, being sanitized!'
const primeFileContents = 'Test, 1!test test'
const nonPrimeFileContents = 'test'

beforeAll(() => {
  fs.writeFileSync(existantFile, fileContents)
})

afterAll(() => {
  fs.unlink(existantFile)
})

test('getWordCountForPath(<invalidPath> rejects with an error)', () => {
  return getWordCountForPath(nonExistantFile).catch(e => {
    expect(e.message).toEqual('file not found')
  })
})

test('getWordCountForPath(<validPath>) returns a promise', () => {
  expect(getWordCountForPath(existantFile)).toBeInstanceOf(Promise)
})

test('getWordCountForPath(<validPath>) resolves to an object', () => {
  return getWordCountForPath(existantFile).then(data => expect(typeof data).toEqual('object'))
})

test('getWordCountForPath(<validPath>) returns the counts of each word', () => {
  return getWordCountForPath(existantFile).then(data => {
    expect(data).toEqual([
{ word: 'test', amount: 1 },
{ word: 'this', amount: 1 },
{ word: 'text', amount: 1 },
{ word: 'is', amount: 1 },
{ word: 'being', amount: 1 },
{ word: 'sanitized', amount: 1 }
    ])
  })
})

test('getWordCountAndIfPrime(<invalidPath>) rejects with an error', () => {
  getWordCountAndIfPrime(nonExistantFile).catch(e => {
    expect(e.message).toEqual('file not found')
  })
})

test('getWordCountAndIfPrime(<validPath>) with primeFileContents returns [{test: {amount: 3, prime: true}]', () => {
  fs.writeFileSync(existantFile, primeFileContents)
  return getWordCountAndIfPrime(existantFile).then(data => {
    expect(data).toEqual([{'word': 'test', 'amount': 3, 'prime': true}])
  })
})

test('getWordCountAndIfPrime(<validPath>) with nonPrimeFileContents returns [{test: {amount: 1, prime: false}]', () => {
  fs.writeFileSync(existantFile, nonPrimeFileContents)
  return getWordCountAndIfPrime(existantFile).then(data => {
    expect(data).toEqual([{'word': 'test', 'amount': 1, 'prime': false}])
  })
})
