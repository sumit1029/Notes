import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/ntoes/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  // console.log(context);
  const { notes, getAllNotes, updateNote } = context;
  const [note, setNote] = useState({id:"", title:"", description:"", tag:""});
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }else{
      navigate('/login');
    }
  }, []);

  const elementref = useRef(null);
  const refClose = useRef(null);
  const updateNotes = (currentnote) => {
    // console.log("Update called");
    elementref.current.click();
    setNote(currentnote);
  }

  const handleClick = (e) =>{
    // console.log(note);
    // e.preventDefault();
    refClose.current.click();
    updateNote(note._id, note.title, note.description, note.tag);
    props.showAlert("Your Note updated successfully", "success");
 }
  
  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
 }
  return (
    <div>
      <AddNotes showAlert={props.showAlert}/>




      <button type="button" ref={elementref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>

                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input type="text" className="form-control" id="tag" name='tag' value={note.tag} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea type="text" rows={2} className="form-control" id="description" value={note.description} name='description' onChange={onChange} minLength={5} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length<5 || note.description.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-4'>
        <h2>Your Notes</h2>
        <div className='container mx-1'>
          {notes.length===0 && 'No Notes to display here'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note.id} updateNotes={updateNotes} showAlert={props.showAlert} note={note} />;
        })}

      </div>
    </div>
  );
}

export default Notes;
