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

  users.push(user)

  res.status(201).json(users)
})

// DELETE requests
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id

  users = users.filter(user => user.id !== Number(id))

  res.status(201).json(users)
})

// listen for incoming requests
const port = 8000

server.listen(port, () => console.log(`\n == API on port ${port} == \n`))