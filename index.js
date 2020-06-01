const express = require('express')

const server = express()

server.use(express.json())

let users = [
  {
    id: "1",
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane",
  }
]

// GET requests
server.get('/api/users', (req, res) => {
  
  res.status(200).json(users)
})

// POST requests
server.post('/api/users', (req, res) => {
  const user = req.body;

  if (user.name === null || user.bio === null) {
    res.status(400)
    res.send({ errorMessage: "Please provide name and bio for the user." })
  }

  users.push(user)

  res.status(201).json(users)
})

// DELETE requests
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id

  users = users.filter(user => user.id !== Number(id))

  res.status(201).json(users)
})

// PUT requests
server.put('/api/users/:id', (req, res) => {
  const updateUser = req.body;

  updateUser(req.params.id, updateUser);

  res.send({message: 'User updated.'})
})

// 404 error code
server.use('/api/users/:id', (req, res) => {
  res.status(404).send({ message: "The user with the specified ID does not exist." })
})

// listen for incoming requests
const port = 8000

server.listen(port, () => console.log(`\n == API on port ${port} == \n`))