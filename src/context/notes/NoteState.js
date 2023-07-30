import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesinitial=[
        {
          "_id": "64bd3326891f61e5ce2648a7",
          "user": "64ba65e1aa9f252239756e60",
          "title": "myasdfasdftitle",
          "description": "her is asdfasdfdescriptioh ",
          "tag": "asdf",
          "date": "2023-07-23T14:03:18.957Z",
          "__v": 0
        },
        {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title": "wake up ",
          "description": "ring ring...",
          "tag": "gym",
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        },
        {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title": "wake up ",
          "description": "ring ring...",
          "tag": "gym",
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        },
        {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title": "wake up ",
          "description": "ring ring...",
          "tag": "gym",
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        },
        {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title": "wake up ",
          "description": "ring ring...",
          "tag": "gym",
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        },
        {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title": "wake up ",
          "description": "ring ring...",
          "tag": "gym",
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        },
        {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title": "wake up ",
          "description": "ring ring...",
          "tag": "gym",
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        },
        {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title": "wake up ",
          "description": "ring ring...",
          "tag": "gym",
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        },
        {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title": "wake up ",
          "description": "ring ring...",
          "tag": "gym",
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesinitial)


      // Add a note

      const addNote = (title , description , tag)=>{
        const note = {
          "_id": "64c62d5b7d7267b17fde8eae",
          "user": "64ba65e1aa9f252239756e60",
          "title":title,
          "description": description,
          "tag": tag,
          "date": "2023-07-30T09:28:59.928Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
        
      }

      // delete a note

      const deleteNote = (id)=>{
        const newNotes = notes.filter(()=>{
          return note._id!==id
        })
        setNotes(newNotes)
      }

      // Edit a note

      const editNote = ()=>{
        
      }

    return (
        <NoteContext.Provider value={{notes , addNote , deleteNote , editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;