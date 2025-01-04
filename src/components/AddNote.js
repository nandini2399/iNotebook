import React,{Component,useContext,useState} from 'react'
import contextValue from '../context/noteContext'

export const AddNote = () => {
    const context = useContext(contextValue);
    const {addNote} = context;

    const [note,setNote] = useState({title:"",description:""})
    
    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title,note.description,"")
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"name='title' className="form-control" id="title" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
  )
}

export default AddNote;
