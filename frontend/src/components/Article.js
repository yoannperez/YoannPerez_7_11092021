import React, { useState } from "react";
import axios from "axios";
import DeletePost from "./DeletePost";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

// -----------------    DATE PARSER    -----------------------
const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    return newDate;
};
// END OF : ------------    DATE PARSER    --------------------

// ---------------------    MODIFY POST LOGIC   ----------------
const handleEdit = () =>{
    const data = {
        text: editedText ? editedText : article.text,
    }
    axios.put("http://localhost:3000/api/posts/" + article.id, data)
    setIsEditing(false);
    
}
// END OF : ------------    MODIFY POST LOGIC   ----------------

// ---------------------    CREATE DOM    ----------------------
return (
    <div className="article" style={{background : isEditing ? "#f3feff" : 'white'}}>
      <div className="card-header">
        <h3>{article.User.username}</h3>
        <em>Posté le {dateParser(article.createdAt)}</em>
      </div>

      {isEditing ? <textarea 
      onChange={(e) => setEditedText(e.target.value)} 
      autoFocus 
      defaultValue={editedText ? editedText : article.text}
      ></textarea> 
      : <p>{editedText ? editedText : article.text}</p>}
      
      
      <div className="btn-container">
        {isEditing ? (
            <button onClick={handleEdit}>Valider</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
                )}

        <DeletePost id={article.id}/>
      </div>
    </div>
  );
};
// END OF : ------------    CREATE DOM    --------------------

export default Article;
