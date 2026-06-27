import axios from "axios";

// this address contains all the notes data or object or resources 
const baseUrl='http://localhost:3000/notes'

const getAll =()=>{
    const request= axios.get(baseUrl)
    return request.then(response=>response.data)
}

// create a new object and add it or store it in the server
const create=newObject=>{
    const request= axios.post(baseUrl,newObject)
    return request.then(response=>response.data)
}

//update an object thats already on the server
const update =(id,newObject)=>{
    const request= axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response=>response.data)
}

export default{getAll,create,update}