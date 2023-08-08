import React, { useContext, useEffect, useRef , useState} from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
        getNotes()
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({etitle:currentNote.title  , edescription:currentNote.description , etag:currentNote.tag})
    }


    const handleClick = (e)=>{
        console.log("Updating the note...", note)
        e.preventDefault();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
      }

    const ref = useRef(null);
    const [note, setNote] = useState({etitle:"" , edescription:"" , etag:""})


    return (
        <>
            <AddNote />

            <button type="button" class="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">


                            <form className='my-3'>

                                <div className="mb-3">
                                    <label htmlFor="title"  className="form-label">Title</label>
                                    <input type="text" className="form-control" onChange={onChange} id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="description"  className="form-label">Note</label>
                                    <input type="text" className="form-control" onChange={onChange} id="edescription" name="edescription" value={note.edescription} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" onChange={onChange} id="etag" name="etag" value={note.etag}  />
                                </div>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" class="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h2>You Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes