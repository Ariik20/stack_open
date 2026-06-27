import { useEffect, useState } from "react";
import dataServices from "./services/services"
import Notification from "./components/Notification";
import "./index.css"
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterLetter, setFilterLetter] = useState("")
  const [notif,setNotif]=useState(null)
  const [error,setError] = useState(null)
  // fetching data from the server 
  useEffect (()=>{
    dataServices.getAll()
    .then(fetchedPersons=>
      setPersons(fetchedPersons))
    },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter=(event)=>{
    setFilterLetter(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault();
    // // checking if name exists before  adding it into list
    const nameExists = persons.some(
      (person) =>newName.toLowerCase() == person.name.toLowerCase()
    );

    // Gotten the person to update
    const personToUpdate=persons.find(person=>newName.toLowerCase()==person.name.toLowerCase())
    console.log(personToUpdate)

    if (nameExists) {
      alert(`${newName} is already added to the phonebook,replace the old number with a new one`);
       
      // change the object into How YOU WANT IT
      const changedObjWithNewNo= {...personToUpdate,number:newNumber}
      // update the resource 
      dataServices.updateResource(personToUpdate.id,changedObjWithNewNo).then(
        updateobj=>setPersons(persons.map(person=>person.id==personToUpdate.id?updateobj:person))
      )
      setNewName("");
      setNewNumber("");
      return;
    }
    // new person object - it doesnt already exist in the array
    const personObj = {
      name: newName,
      number: newNumber,
      id: Date.now()
    };
      // post data to the server 
    dataServices.create(personObj)
         .then(created=>{
    setPersons(persons.concat(created));
    setNotif(`Added ${created.name}`)
    setTimeout(()=>{
        setNotif(null)
      },3000)
    setNewName("");
    setNewNumber("");
         })
  
  };
// Deletion of an item from an array- Event handler
 const handleDelete=(id)=>{
  const personToDelete=persons.find(person=>person.id==id)
  console.log(personToDelete)
  // first ask for a confirmation deletion
  const confirms=window.confirm(`Do you want to Delete\n ${personToDelete.name}?`)
  // this notification only appears on the backend 🔥
  if (confirms){
  // first lets find the item that we need to update
  dataServices.deleteResource(id).then(()=>{
    setPersons(persons.filter(person=>person.id!==id))
    setNotif("Resource sucessfully deleted")
    setTimeout(()=> {
        setNotif(null)
      },3000)
  })
  .catch( ()=>{
    setError("Resource doesnt exist anymore")
     setTimeout(()=> {
        setError(null)
      },3000)
setPersons(persons.filter(person=>person.id!==id))
  })
  } return;
 
 }
  // filtering the array
  const personsFiltered= persons.filter(person=>person.name.toLowerCase().includes(filterLetter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <Notification message={notif} className="great" />
      <Notification message={error} className="error" />
      </div>

        <div>
        filter shown with: <input value={filterLetter} onChange={handleFilter}/>
        </div>
      <h2>Add a new </h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsFiltered.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={()=>handleDelete(person.id)}>delete</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
