var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const cors = require('cors')
const FoodsController = require('./lib/controllers/foods')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.options('*', cors(corsOptions))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.send(app.locals.title)
})

//app.get('/api/secrets/:id', function(request, response){
  //SecretController.getSecret(request, response)
//})

//app.post('/api/secrets', (request, response) => {
  //SecretController.postSecret(request, response)
//})

app.get('/api/v1/foods', function(request, response){
  FoodsController.index(request, response)
})

app.get('/api/v1/foods/:id', function(request, response){
  FoodsController.show(request, response)
})

app.post('/api/v1/foods', function(request, response){
  FoodsController.create(request, response)
})

app.patch('/api/v1/foods/:id', (request, response) => {
  FoodsController.update(request, response)
})

app.delete('/api/v1/foods/:id', (request, response) => {
  FoodsController.destroy(request, response)
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}

module.exports = app
