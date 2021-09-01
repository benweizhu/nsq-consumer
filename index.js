const express = require('express')
const nsq = require('nsqjs')
const app = express()
const port = 5000

const reader = new nsq.Reader('8d60bdfb-bcaf-47c9-8ebf-544860f751b8', 'test', {
  lookupdHTTPAddresses: 'localhost:4161'
})

reader.connect()

reader.on('message', msg => {
  console.log('Received message [%s]: %s', msg.id, msg.body.toString())
  msg.finish()
})

app.listen(port, () => console.log(`NSQ Consumer is listening on port ${port}!`))
