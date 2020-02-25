const express = require('express')

const server = express()

server.use(express.json())

server.use( (req,res, next) => {
  console.log( `Método: ${req.method}; Contagem de requisições:`)
  console.count('No. ')
  
  
  return next()
})

function checkIdExists(req, res, next) {
  const idExists = projects[req.params.id]
  if (!idExists){
    return res.status(400).json({ error: "Id not exists."})
  }
  return next()
}

const projects = [
  {
    id: "1",
    title: "Projeto A",
    tasks: ["Criar rotas"]
  },
  {
    id: "2",
    title: "Projeto B",
    tasks: ["Criar rotas, Criar middleware"]
  }
]


server.get('/projects', (req, res)=>{
  return res.json(projects)
})

server.get('/projects/:id', checkIdExists, (req, res)=>{
  const { id } = req.params
  
  return res.json(projects[id])
})

server.post('/projects', (req, res) => {
  const newProject  = req.body

  projects.push(newProject)

  return res.json(newProject)
})

server.put('/projects/:id',  (req, res) => {
  const { id } = req.params
  const { title } = req.body

  projects[id].title = title

  return res.json(projects[id])
})

server.delete('/projects/:id', checkIdExists, (req,res) => {
  const { id } = req.params
  
  projects.splice(id, 1)

  return res.json(projects)
})

server.post('/projects/:id/tasks', checkIdExists, (req,res) => {
  const { id } = req.params
  const { title } = req.body

  projects[id].tasks.push(title)

  return res.json(projects[id])

})

server.listen(3001)