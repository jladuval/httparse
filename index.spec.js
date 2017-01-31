const test = require('ava')
const Promise = require('bluebird')
const { readFileAsync } = Promise.promisifyAll(require('fs'))
const httparse = require('./')

test('httparse should parse a post request', async t => {
  const buff = await readFileAsync('./specs/data/post-request.txt')
  const parsedRes = httparse(buff.toString())
  console.log(parsedRes)
})

test('httparse should parse a post request', async t => {
  const buff = await readFileAsync('./specs/data/post-response.txt')
  const parsedRes = httparse(buff.toString())
  console.log(parsedRes)
})

test('httparse should parse a post request', async t => {
  const buff = await readFileAsync('./specs/data/get-request.txt')
  const parsedRes = httparse(buff.toString())
  console.log(parsedRes)
})

test('httparse should parse a post request', async t => {
  const buff = await readFileAsync('./specs/data/get-response.txt')
  const parsedRes = httparse(buff.toString())
  console.log(parsedRes)
})
