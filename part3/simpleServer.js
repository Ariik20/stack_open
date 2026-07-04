// const http =require('http')
// // The primary purpose of the backend server in this course is 
// // to offer raw data in JSON format to the frontend. For this reason, let's immediately change our server to return a hardcoded list of notes in the JSON format:

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]
// const app =http.createServer((request, response)=>{
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

// const PORT=3001
// app.listen(PORT)
// console.log(`Server runnning on port ${PORT}`)


// With express now - 
const express=require('express')
const app=express()

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
//MIDDLEWARE 
// Middleware are functions that can be used for handling 
// request and response objects 
// - You can use several middleware at the same time 
// when you have more than one, they are executed one by one in the order that they will were listed in the application code. 

// Middleware that prints information about every request that is sent to the server 
// Middleware is a function that receives three parameters:
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
//receiving data or adding a resource -
// to access the data easily, we need the help of the Express JSON-parser that 
// we can use with the command app.use(express.json())
app.use(express.json())
app.use(requestLogger)
// event handler used to handle HTTP GET requests made to the app's root 
app.get('/', (request,response)=>{
    response.send('<h1>Hello World</h1>')
})

//The event handler function accepts two parameters. 
// The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.
app.get('/api/notes', (request,response)=>{
    response.json(notes)
})

//fetching a single resource -
app.get('/api/notes/:id', (request,response)=>{
  const id=request.params.id 
  const note =notes.find(note => note.id ===id)
  if (note){response.json(note)}
  else{response.status(404).end()}
})

//deleting a resource - 
app.delete('api/notes/:id', (request,response)=>{
  const id=request.params.id
  notes = notes.filter(note=> note.id!=id)
  response.status(204).end()
})

const generateId=()=>{
  const maxId=notes.length >0? Math.max(...notes.map(n =>Number(n.id))) : 0
  return String(maxId +1)
}
// creating a new resource -
app.post('/api/notes', (request,response)=>{
  const body=request.body
  if (!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }
  // creating the new note and its properties -
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }
  notes = notes.concat(note)
  response.json(note) 
})

const PORT=3001
app.listen(PORT)
console.log(`Server runnning on port ${PORT}`)

// AUTOMATIC CHANGE TRACKING 
// Instead of manually stopping and starting the application is cumbersome 
// so we instead make the server track changes 
// node --watch index.js - add the watch option

// REST 
// - Representational State Transfer - meant for building scalable web applications 
// resources - Every resource has an associated URL which is the resource's unique address

// URL	        verb	functionality
// notes/10   	GET	    fetches a single resource
// notes	    GET	    fetches all resources in the collection
// notes	    POST	creates a new resource based on the request data
// notes/10	    DELETE	removes the identified resource
// notes/10	    PUT	    replaces the entire identified resource with the request data
// notes/10	    PATCH	replaces a part of the identified resource with the request data

// Strong recommendation: When you are working on backend code, always keep an eye on what's going on in the terminal that is running your application.

// HTTP request Types 
// Two request types  
// -safety (request must not cause any side effects on the server
// like the state of the DB must not change as a result of the request 
// and the response must only return data that already exists on the server)
// All HTTP requests except POST should be idempotent
// -idempotency

//middleware without routes - if no routehandler needs the middleware.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// PART 3 (B)
// Deploying an app to the internet-

// 1. Same Origin policy and CORS 
// A URL's origin defined by combination of protocol  (AKA Scheme), hostname and port  
// The same-origin policy is a security mechanism implemented by browsers inorder to prevent 
// session hijacking among other security vulnerabilities.  
// Legitimize cross-origin requests (URLS that dont share the same origin) we use CORS (Cross Origin Resource Sharing )
//-CORS allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served ..
   
// BEST EXAMPLE TO UNDERSTAND CORS -
    // The problem is that, by default, the JavaScript code of an application that runs in a browser can only communicate with a server in the same origin. Because our server is in localhost port 3001, 
    // while our frontend is in localhost port 5173, they do not have the same origin.
    //We can allow requests from other origins by using NODE'S cors middleware. 

//APPLICATION TO THE INTERNET -
// FRONTEND PRODUCTION BUILD --there is development mode , when the application is deployed, we must create a production build or  
// a version of the application that is optimized for production.
// npm run build -creates production build for applications created in vite 
// - The dist folde will be created where all the code from different files will be minified into 3 files , html, css and js files,
// SERVING STATIC FILES FROM THE BACKEND 


// ADDING THE DATABASE (MONGODB) -