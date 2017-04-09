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

const wordFrequenciesToArray = (words) => {
  return Object.keys(words).map(key => {
    return {
      amount: words[key],
      word: key
    }
  })
}

const collectWordsFromStream = (stream) => {
  return new Promise((resolve, reject) => {
    let words = {}
    stream.on('data', (chunk) => {
      const wordArray = chunk.toString().split(' ').filter(str => str.length)
      wordArray.forEach((word) => {
        addWordToWords(word, words)
      })
    })

    stream.on('end', () => {
      const wordsArray = wordFrequenciesToArray(words)
      resolve(wordsArray)
    })
  })
}

module.exports = collectWordsFromStream
