var FileStreamRotator = require('file-stream-rotator')
var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var app = express()
var logDirectory = path.join(__dirname, 'log')

console.log('logDirectory ', logDirectory);

// ensure log directory exists
try{
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
}catch(err){
  console.log('err ',err);
}

// create a rotating write stream - rotate every minute
var accessLogStream = FileStreamRotator.getStream({
  filename: path.join(logDirectory, 'access.log'),
  frequency: '1m',
  verbose: false
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.use(express.static('loaderio'));

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(3000);

console.log("api gateway listening...");
