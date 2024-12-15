import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const s1 = {
        "name":"Nandini",
        "class":"12d"
    }

    const [state,setState] = useState(s1);

    const update = () =>{
        setState({
            "name":"Kartik",
            "class":"5B"
        })
    }
    return(
        < noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;