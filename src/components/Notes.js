import React,{Component,useContext} from 'react'
import contextValue from '../context/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote.js'

const Notes = () => {
  const context = useContext(contextValue);
  const {notes,addNote} = context;
  return (
    <>
      <AddNote/>
    <div className='row my-3'>
       <h2>Your Notes</h2>
        <p>{notes.map((note)=>{
          return <NoteItem note={note}/>
        })}</p>
    </div>
    </>
  )
}

export default Notes