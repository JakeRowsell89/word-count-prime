/*
Convert a stream of text and return a promise containing word counts
*/

const addWordToWords = (word, words) => {
  if (!words[word]) {
    words[word] = 1
  } else {
    words[word] = words[word] + 1
  }
  return words
}

const collectWordsFromStream = (stream) => {
  return new Promise((resolve, reject) => {
    let words = {}
    stream.on('data', (chunk) => {
      chunk.toString().split(' ').forEach((word) => {
        addWordToWords(word, words)
      })
    })

    stream.on('end', () => resolve(words))
  })
}

module.exports = collectWordsFromStream
