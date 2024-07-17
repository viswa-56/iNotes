import React,{ useContext, useState }  from 'react'
import NoteContext from '../context/notes/noteContext'
const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addnote } = context;
    const [note,setNote] = useState({title:"",description :"" ,tag:"default"})

    const onchange=(e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleclick=(e) =>{
        e.preventDefault()
        addnote(note.title,note.description,note.tag)
        setNote({title:"",description :"" ,tag:""})
        props.showAlert("Added successfully","success")

    }
    return (
        <div className='container my-3'>
            <h2>Add a new Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control"  value={note.description} onChange={onchange} id="description" name="description"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control"  value={note.tag} onChange={onchange} id="tag" name="tag"/>
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleclick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
