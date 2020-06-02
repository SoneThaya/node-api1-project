const express = require('express')
const cors = require('cors')
const server = express()

server.use(express.json())

server.use(cors())

let users = [
  {
    id: "1",
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: "2",
    name: "John shoe", 
    bio: "another one",
  }
]

// GET requests
server.get('/api/users', (req, res) => {
  if (users) {
    res.status(200).json(users)
  } else {
    res.status(500)
        .json({ errorMessage: "The users information could not be retrieved." })
  }
})

// when client makes GET request to /api/users/:id
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  const user = users.find(user => user.id === Number(id))

  if (user) {
    res.status(404).send({ message: "The user with the specified ID does not exist." })
  } else {
    try {
      res.status(200).json(user)
    } catch (err) {
      res.status(500)
        .json({ errorMessage: "The user information could not be retrieved." })
    }
    
  }
})

// POST requests
server.post('/api/users', (req, res) => {
  const user = req.body;
 
  if (!user.name || !user.bio) {
    res.status(400)
      .json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    try {
      users.push(user)
      res.status(201).json(users)
    } catch (err) {
      res.status(500)
        .json({ errorMessage: "There was an error while saving the user to the database" })
    }
  }
})

// DELETE requests
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id

  users = users.filter(user => user.id !== id)

  if (users) {
    res.status(404).send({ message: "The user with the specified ID does not exist." })
  } else {
    try {
      res.status(201).json(users)
    } catch (err) {
      res.status(500)
        .json({ errorMessage: "The user could not be removed" })
    }
    
  }
})

// PUT requests
server.put('/api/users/:id', (req, res) => {
  const updateUser = req.body;

  if (!updateUser) {
    res.status(404).send({message: "The user with the specified ID does not exist."})
  } else if (!updateUser.name || !updateUser.bio) {
    res.status(400).send({errorMessage: "Please provide name and bio for the user."})
  } try {
    users.push(updateUser)
    res.status(200)
    res.send({message: 'User updated.'})
  } catch (err) {
    res.status(500)
        .json({ errorMessage: "The user information could not be modified." })
  }
})

// 404 error code
server.use('/api/users/:id', (req, res) => {
  res.status(404).send({ message: "The user with the specified ID does not exist." })
})

// listen for incoming requests
const port = 8000

server.listen(port, () => console.log(`\n == API on port ${port} == \n`))