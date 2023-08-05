import React, {useContext} from 'react';
import noteContext from '../context/ntoes/noteContext';
const NoteItem = (props) => {
    const {note, updateNotes, showAlert} = props;
    const context = useContext(noteContext);
  const {deleteNote} = context;

  return (
    <div className='col-md-3 my-2'>
      <div className="card">
  <div className="card-body">
    <div className='d-flex align-items-center'>
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash mx-2" onClick={()=>deleteNote(note._id)&&showAlert("Your Note deleted Successfully", "success")}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNotes(note)}></i>
    </div>
    <p className="card-text">{note.description}</p>
    
  </div>
</div>
    </div>
  );
}

export default NoteItem;
