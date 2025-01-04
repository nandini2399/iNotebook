import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const notesDoc = [{
        "title" : "The book i read today",
        "description" : "Fool me Twice by Nona Uppal"
    },
    {
        "title" : "Ms Ice Sandwich",
        "description" : "Ms Ice Sandwich is the girl with huge pretty eyes and she sells sandwiches across the street."
    },
    {
        "title" : "Ms Ice Sandwich",
        "description" : "Ms Ice Sandwich is the girl with huge pretty eyes and she sells sandwiches across the street."
    },
    {
        "title" : "Ms Ice Sandwich",
        "description" : "Ms Ice Sandwich is the girl with huge pretty eyes and she sells sandwiches across the street."
    },
    {
        "title" : "Ms Ice Sandwich",
        "description" : "Ms Ice Sandwich is the girl with huge pretty eyes and she sells sandwiches across the street."
    }];

    const [notes,setNotes] = useState(notesDoc)

    //Add a Note
    const addNote = (title,description,tag) =>{
        console.log("Inside addnote")
        const note = {
            "title" : title,
            "description" : description
        };
        setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = () =>{
        
    }

    //Edit a Note
    const editNote = () =>{
        
    }
    return(
        < noteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;