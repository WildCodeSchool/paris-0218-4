const express = require('express')
const Parser = require('rss-parser')

const router = express.Router()
const parser = new Parser()

console.log("test")

router.get('/get-rss', async (req, res) => {
  const feed = await parser.parseURL('https://c.developpez.com/index/rss')
  console.log(feed)

  res.json(feed)
 
  feed.items.forEach(item => {
    console.log(item.title + ': ' + item.link + '\n')
  })
})

module.exports = router