const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// const Phonebook = require('./models/phonebook')
/*

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then((phonebooks) => {
    response.json(phonebooks)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(phonebook => {
      if (phonebook) {
        response.json(phonebook)
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
})

app.get('/info', (request, response) => {
  Phonebook.find({}).then((phonebooks) => {
    response.send(`Phonebook has info for ${phonebooks.length} people
      ${new Date()}`)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, resposne, next) => {
  const person = request.body
  if (!person.name || !person.number) {
    return resposne.status(400).json({
      error: 'either name or number is missing'
    })
  }

  const phonebook = new Phonebook({
    name: person.name,
    number: person.number
  })

  phonebook.save().then(savedPerson => {
    resposne.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  Phonebook.findById(request.params.id)
    .then(phonebook => {
      if(!phonebook) {
        return response.status(404).end()
      }
      phonebook.number = number

      return phonebook.save().then((updatedPhonebook) => {
        response.json(updatedPhonebook)
      }).catch(error => next(error))
    })
})

*/

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})