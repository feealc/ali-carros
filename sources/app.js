var express = require('express')
var mongoose = require('mongoose')
var bluebird = require('bluebird')
var router = require('./router.js')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')

//

const app = express()
const port = process.env.PORT || 4001

//

app
	.use(bodyParser.json())
	.use(expressValidator())
	.use('/api/doc', express.static('doc'))
	.use('/api', router)

mongoose.Promise = bluebird

const mongoconect = 'mongodb://apicarrosadm:qwerty123@ds145659.mlab.com:45659/apicarrosdb'

mongoose.connect(mongoconect, err => {
  if (err) {
    return console.log('error on connect db')
  }
  app.listen(port, () => console.log(`localhost:${port}`))
})
