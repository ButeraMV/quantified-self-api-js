var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'
app.locals.secrets = {
  wowowow: 'I am a banana'
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.send(app.locals.title)
})

app.get('/api/secrets/:id', function(request, response){
  SecretController.getSecret(request, response)
})

app.post('/api/secrets', (request, response) => {
  SecretController.postSecret(request, response)
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}

module.exports = app
