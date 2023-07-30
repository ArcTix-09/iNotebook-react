import React, { useContext } from 'react'
import notesContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(notesContext);
    const {notes , setNotes} = context;
  return (
    <div className='row my-3'>
      <h1>Your Notes</h1>
      {notes.map((note)=>{
          return <Noteitem note={note}/>
      })}
    </div>
  )
}

export default Notes
