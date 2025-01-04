import React from 'react'


const NoteItem = (props) => {
  const {note} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
           <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <i class="fa-solid fa-pen-to-square mx-2"></i>
          <i class="fa-solid fa-trash mx-2"></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem