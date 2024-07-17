const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const JWT = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
//fetch all the notes of a user /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id })
            res.json(notes)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("some error occurred");
        }
    })


//create  notes of a user /api/notes/addnotes
router.post('/addnotes', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savednote = await note.save()
            res.json(savednote)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("some error occurred");
        }
    })

//update an existing note of a user /api/notes/updatenote
router.put('/updatenote/:id', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 5 })],
    async (req, res) => {
        const { title, description, tag } = req.body;
        //set the body of new note 
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };
        try{
            // console.log(newnote)
            //check if the note exists with the passed id 
            let note = await Notes.findById(req.params.id);
            // console.log(note)
            if (!note) { return res.status(404).send("not found") };
            const id_of_user = req.user.id
            // console.log(typeof(id_of_user))
            //check if the note exists with the passed id is owned by user
            if (note.user.toString() != id_of_user) { return res.status(401).send("not allowed") }
            // console.log("after checking")
            console.log(req.params.id)
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
            res.json(note)
        }catch(error){
            console.log(error.message);
            res.status(500).send("some error occurred");
        }
    })


//delete an existing note of a user /api/notes/deletenotes
router.delete('/deletenotes/:id', fetchuser,
    async (req, res) => {
        try{
            //check if the note exists with the passed id 
            let note = await Notes.findById(req.params.id);
            // console.log(note)
            if (!note) { return res.status(404).send("not found") };
            const id_of_user = req.user.id
            // console.log(typeof(id_of_user))
            //check if the note exists with the passed id is owned by user
            if (note.user.toString() != id_of_user) { return res.status(401).send("not allowed") }
            // console.log("after checking")
            note = await Notes.findByIdAndDelete(req.params.id);
            res.json({"success" : "note has been deleted",note : note})
        }catch(error){
            console.log(error.message);
            res.status(500).send("some error occurred");
        }
    })

module.exports = router