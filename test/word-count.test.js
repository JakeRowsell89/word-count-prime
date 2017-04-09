const stream = require('stream')
const wordCount = require('../lib/word-count')

const createStreamAndWriteInput = (input) => {
  const readStream = new stream.PassThrough()
  readStream.end(input)
  return readStream
}

test('wordCount() returns a Promise', () => {
  expect(wordCount()).toBeInstanceOf(Promise)
})

test('wordCount() can take a stream with 1 word and return {<word>: 1}', () => {
  const input = 'thing'
  const readStream = createStreamAndWriteInput(input)

  return wordCount(readStream).then(data => expect(data).toEqual([{ word: 'thing', amount: 1 }]))
})

test('wordCount() can take a stream with 2 the same words and return {<word>: 2}', () => {
  const input = 'thing thing'
  const readStream = createStreamAndWriteInput(input)

  return wordCount(readStream).then(data => expect(data).toEqual([{ word: 'thing', amount: 2 }]))
})

test('wordCount() can take a stream with 2 different words and return {<word1>: 1, <word2>: 1}', () => {
  const input = 'thing thang'
  const readStream = createStreamAndWriteInput(input)

  return wordCount(readStream).then(data => {
    expect(data).toEqual([{ word: 'thing', amount: 1 }, { word: 'thang', amount: 1 }])
  })
})
