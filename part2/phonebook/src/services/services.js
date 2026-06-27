import axios from "axios";

const baseUrl="http://localhost:3001/persons"
const getAll=()=>{
    const request= axios.get(baseUrl)
    return request.then(response=>response.data)
}
const create=createdItem=>{
    const request= axios.post(baseUrl,createdItem)
    return request.then(response=>response.data)
}

const deleteResource =(id)=>{
    const request= axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}
const updateResource=(id, newObj)=>{
    const request= axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response=>response.data)
}

export default  {
    getAll:getAll,
    create:create,
    deleteResource:deleteResource,
    updateResource:updateResource
}