import React, { useState } from "react";
import noteContext from "./noteContext";
// import { type } from "@testing-library/user-event/dist/type";

const NotesState = (props) => {
    const host = "http://localhost:5000"
    const initialnotes = [
        {
            "_id": "6694c9e5cd4b929741adea4a8d0",
            "user": "6693b0d49dae67846d1f1869",
            "title": "firstnote updated",
            "description": "this is my first note for testing updated",
            "tag": "testing",
            "date": "2024-07-15T07:04:05.841Z",
            "__v": 0
        },
        {
            "_id": "6694d2a431340716d322d50fb81",
            "user": "6693b0d49dae67846d1f1869",
            "title": "second note updated",
            "description": "this is my second note for testing updated",
            "tag": "testing",
            "date": "2024-07-15T07:41:24.592Z",
            "__v": 0
        },
        {
            "_id": "6694c9e5cd4b941234adea4a8d0",
            "user": "6693b0d49dae67846d1f1869",
            "title": "firstnote updated",
            "description": "this is my first note for testing updated",
            "tag": "testing",
            "date": "2024-07-15T07:04:05.841Z",
            "__v": 0
        },
        {
            "_id": "6694d2a43134120716dd50fb81",
            "user": "6693b0d49dae67846d1f1869",
            "title": "second note updated",
            "description": "this is my second note for testing updated",
            "tag": "testing",
            "date": "2024-07-15T07:41:24.592Z",
            "__v": 0
        },
        {
            "_id": "6694c9e5cd42234b941adea4a8d0",
            "user": "6693b0d49dae67846d1f1869",
            "title": "firstnote updated",
            "description": "this is my first note for testing updated",
            "tag": "testing",
            "date": "2024-07-15T07:04:05.841Z",
            "__v": 0
        },
        {
            "_id": "6694d2a431345240716dd50fb81",
            "user": "6693b0d49dae67846d1f1869",
            "title": "second note updated",
            "description": "this is my second note for testing updated",
            "tag": "testing",
            "date": "2024-07-15T07:41:24.592Z",
            "__v": 0
        },
        {
            "_id": "6694c9e5cd4234b941adea4a8d0",
            "user": "6693b0d49dae67846d1f1869",
            "title": "firstnote updated",
            "description": "this is my first note for testing updated",
            "tag": "testing",
            "date": "2024-07-15T07:04:05.841Z",
            "__v": 0
        },
        {
            "_id": "6694d2a4313234540716dd50fb81",
            "user": "6693b0d49dae67846d1f1869",
            "title": "second note updated",
            "description": "this is my second note for testing updated",
            "tag": "testing",
            "date": "2024-07-15T07:41:24.592Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(initialnotes);
    //get all notes
    const getallnotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`
        try {
            console.log("called")
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json)
            setnotes(json)
        } catch (error) {
            console.error(error.message);
        }
        // setnotes(notes.concat(note))
    }
    
    

    //add note
    const addnote = async (title, description, tag) => {
        const url = `${host}/api/notes/addnotes`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            const note = json
            //   console.log(note)
            setnotes(notes.concat(note))
        } catch (error) {
            console.error(error.message);
        }
    }
    //delete note
    const deletenote = async (noteId) => {
        // console.log(noteId)
        const url = `${host}/api/notes/deletenotes/${noteId}`
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                // body : JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json)
            console.log("deletin the node with id " + noteId)
            const newnotes =  notes.filter((note) => {
                // console.log(note._id)
                return note._id !== noteId
            })
            setnotes(newnotes);
        } catch (error) {
            console.error(error.message);
        }
    }
    //update note
    const updatenote = async (id, title, description, tag) => {

        const url = `${host}/api/notes/updatenote/${id}`
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json)

        } catch (error) {
            console.error(error.message);
        }
        let newnotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setnotes(newnotes)
    }
    // const update =() =>{
    //     setTimeout(() => {
    //         setState({
    //             name : "bhaskar",
    //             age : 21    
    //         })
    //     }, 1000);
    // }
    return (
        // <noteContext.Provider value = {{state:state,update:update}}>
        <noteContext.Provider value={{ notes, setnotes, addnote, deletenote, updatenote ,getallnotes}}>
            {props.children}
        </noteContext.Provider>
    )
};

export default NotesState;