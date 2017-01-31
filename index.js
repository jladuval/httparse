const { drop, compose, reduce, assocPath, assoc } = require('ramda')

const COLON = ': '
const OPEN_PARENTHESES = '{'
const FIND_COLON = /:(.+)/

const httparse = req => {
  if (!req) throw new Error('httparse requires an input string to work. See tests for examples')
  const lines = req.split('\n')
  if (!lines.length) throw new Error('httparse encountered an error reading the given request. Could not split lines')

  const firstLine = lines[0]
  const verb = getVerbFromLine(firstLine)
  const blankRes = {
    headers: {},
    data: {}
  }

  return compose(
    reduce((acc, val) => {
      if (val && val[0] === OPEN_PARENTHESES) {
        return assoc('data', JSON.parse(val), acc)       
      }
      if (!val.includes(COLON)) return acc
      const header = val.split(FIND_COLON)

      return assocPath(['headers', header[0]], drop(1, header[1]), acc)
    }, blankRes),
    drop(1)
  )(lines)
}

const getVerbFromLine = line => {
  const get = line.includes('GET')
  const post = line.includes('POST')
  if (get) return 'GET'
  if (post) return 'POST'
  return
}

module.exports = httparse
