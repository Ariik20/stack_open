import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from "./services/notes"
import Notification from './components/Notification'
const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg,setErrorMsg]=useState('some error happened....')

  //fetching the data using the Effect Hook
  useEffect(()=>{
console.log("Effect")
noteService.getAll()
      .then(fetchedNotes=>
        setNotes(fetchedNotes)
    )
  },[])
console.log('render', notes.length, 'notes')

// function that handles the creation of a new note
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    //adding the new created note object to the server, sending the object to a server 
    noteService.create(noteObject)
    .then(createdNote=>{
      setNotes(notes.concat(createdNote))
      setNewNote('')
    })
  }

  // event handler for toggling of a note
  const toggleImportanceOf=(id)=>{
    console.log(`Importance of + ${id} + neeeds to be toggle` )
    // lets find it if it exists in the notes
    const note=notes.find(n=>n.id == id)
    console.log(note)
    // now since it was found, you can change it 
    const changedNote={...note, important:!note.important}

    // now change it too on the server 
    noteService.update(id,changedNote).then(updateNote=>{
      setNotes(notes.map(note=>note.id === id? updateNote:note))
    })
     .catch(error =>{
      setErrorMsg(`Note ${note.content} was already removed from the server`)
      setTimeout(()=>{
        setErrorMsg(null)
      },5000)
      setNotes(notes.filter(n=>n.id!==id))
     })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }


  // Filtering the notes based on important and unimportant ones
const notesToShow = showAll 
  ? notes 
  : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App