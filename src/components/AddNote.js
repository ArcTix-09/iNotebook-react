import React, { useState , useContext } from 'react'
import notesContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(notesContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"" , description:"" , tag:""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"" , description:"" , tag:""})
        props.showAlert("Note Added successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
      }
      

  return (
    <div>
            <h1 style={{ marginTop: '18px' }}>Add Your Notes</h1>
      <form className='my-3'>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" onChange={onChange} id="title" name="title" aria-describedby="emailHelp" minLength={5} required value={note.title}/>
        </div>


        <div className="mb-3">
          <label htmlFor="description" className="form-label">Note</label>
          <input type="text" className="form-control" onChange={onChange} id="description" name="description" minLength={5} required value={note.description}/>
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" onChange={onChange} id="tag" name="tag" value={note.tag}/>
        </div>


        <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
