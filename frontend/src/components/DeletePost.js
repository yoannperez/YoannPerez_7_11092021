import axios from 'axios';
import React from 'react';

const DeletePost = ({id}) => {

    const handleDelete = () =>{
        axios.delete("http://localhost:3000/api/posts/" + id);
        window.location.reload();
    }


    return (
        <div>
            <button onClick={()=>{
                if(window.confirm('Voulez-vous supperimer ce post ?')){
                    handleDelete()
                }
            }}>Supprimer</button>
        </div>
    );
};

export default DeletePost;