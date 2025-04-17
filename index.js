require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
// const Phonebook = require('./models/phonebook')


const app = express()

app.use(express.json())
app.use(express.static('dist'))

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch (error => {
    next(error)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if(!note) {
        return response.status(404).end()
      }
      note.content = content
      note.important = important

      return note.save().then((updateNote) => {
        response.json(updateNote)
      }).catch(error => next(error))
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

/*
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)
*/
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})