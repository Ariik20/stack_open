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

// event handler used to handle HTTP GET requests made to the app's root 
app.get('/', (request,response)=>{
    response.send('<h1>Hello World</h1>')
})

//The event handler function accepts two parameters. 
// The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.
app.get('/api/notes', (request,response)=>{
    response.json(notes)
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