const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const user = require('../models/User');

const router = express.Router();

// ROUTE 1 : fetch all the notes using : GET "/api/notes/fetchallnotes" --> authentication required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 2 : Add a new note using : POST "/api/notes/addnote" --> authentication required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Enter must be at least 1 character').isLength({ min: 1 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if there are errors, return bad request
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 3 : update an existing  note using : PUT "/api/notes/updatenote" --> authentication required


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // creating a newNote object

        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // Find the note to be updated and update it

        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id , {$set:newNote}  , {new:true})
        res.json({note});

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});



// ROUTE 4 : update an existing  note using : DELETE "/api/notes/deletenote" --> authentication required


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        
        // Find the note to be deleted and delete it

        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success" : "Note has been deleted successfully" , note:note} );

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
