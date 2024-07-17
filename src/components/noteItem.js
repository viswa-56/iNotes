import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext'
const NoteItem = (props) => {
    const { note,editnote } = props;
    const context = useContext(NoteContext)
    const { deletenote } = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id);
                        props.showAlert("Deleted successfully","success");
                    }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editnote(note);
                    }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
