const express =require('express')
const app=express()
const morgan=require('morgan')
//add the middleware to parse incoming JSON requests
app.use(express.json())
// custom token for POST body
morgan.token('post-data', (req) => {
  return JSON.stringify(req.body)
})

// logger middleware - customized one 
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post-data')
)
let persons =[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// get all the persons in phonebook 
app.get('/api/persons', (request,response)=>{
    response.json(persons)
})

// get an individual person in phonebook
app.get('/api/persons/:id', (request,response)=>{
    const id=Number(request.params.id)
    const person=persons.find(person=>person.id==id)
    if (person){response.json(person)}
    else{response.status(404).end()}
})

//page info about the phonebook
app.get('/info',(request,response)=>{
 const date=new Date()
 response.send(`<p>Phonebook has info for ${persons.length} people
    </p><p>${date}</p>`)
})
//deleting a person from the phonebook
app.delete('/api/persons/:id', (request,response)=>{
    const id=Number(request.params.id)
    persons=persons.filter(person=>person.id!=id)
    response.status(204).end()
})
app.post('/api/persons', (request,response)=>{
    const body=request.body
    // cross-check if content is missing or not
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    // check if the name already exists in the phonebook or not
    const nameExists=persons.find(person=>person.name===body.name)
    if(nameExists){
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else {
        const newPerson = {
            id: Math.floor(Math.random()*1000000),
            name: body.name,
            number: body.number
        }
        persons = persons.concat(newPerson)
        response.json(newPerson)
    }
})
const PORT=3001
app.listen(PORT)
console.log(`Server runnning on port ${PORT}`)