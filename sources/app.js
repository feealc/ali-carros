var express = require('express')
var mongoose = require('mongoose')
var bluebird = require('bluebird')
var router = require('./router.js')
var bodyParser = require('body-parser')

//

const server = express()
const port = process.env.PORT || 4001

server
	.use(bodyParser.json())
	.use('/api', router)

mongoose.Promise = bluebird

const mongoconect = 'mongodb://apicarrosadm:qwerty123@ds145659.mlab.com:45659/apicarrosdb'

mongoose.connect(mongoconect, err => {
  if (err) {
    return console.log('error on connect db')
  }
  server.listen(port, () => console.log(`localhost:${port}`))
})
