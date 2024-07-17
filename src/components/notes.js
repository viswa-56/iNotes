import React, { useContext, useEffect, useLayoutEffect, useRef,useState } from 'react'
import NoteItem from './noteItem';
import AddNote from './addNote';
import NoteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(NoteContext)
    const { notes, setnotes, addnote,getallnotes ,updatenote} = context;
    const [note,setNote] = useState({id:"",etitle:"",edescription :"" ,etag:""})
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('auth-token')){
            console.log(localStorage.getItem('auth-token'))
            getallnotes()
        }
        else{
            navigate('/login')
        }
    }, [])
    const ref = useRef(null);
    const refclose = useRef(null);
    const editnote = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
    }
    const onchange=(e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleclick=() =>{
        console.log("updating the note",note)
        updatenote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click();
        props.showAlert("Updated successfully","success")
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle"onChange={onchange} aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.edescription} onChange={onchange} id="edescription" name="edescription"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.etag} onChange={onchange} id="etag" name="etag"/>
                </div>
            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Your notes</h2>
            <div className='row my-3'>
                <div className='Container'>
                <h4>
                {notes.length === 0 && 'No Notes to Display...'}
                </h4>
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} showAlert={props.showAlert} editnote={editnote} />
                })}
            </div>
        </>
    )
}

export default Notes
