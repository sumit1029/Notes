import React, { useState, useContext } from 'react';
import noteContext from '../context/ntoes/noteContext';
import App from '../App';

const AddNotes = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

  const [note, setNote] = useState({title:"", description:"", tag:""});
  const handleClick = (e) =>{
     e.preventDefault();
     addNote(note.title, note.description, note.tag);
     props.showAlert("Note added successfully", 'success')
     setNote({title:"", description:"", tag:""});
  }

  const onChange = (e) =>{
     setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <div className='container my-4'>
      <h2>Add a Note</h2>
      <form>
    <div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>

      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name='tag' aria-describedby="emailHelp"value={note.tag} onChange={onChange}/>
      </div>
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <textarea type="text" rows={2} className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
  </div>
  
  
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
    </div>
  );
}

export default AddNotes;
