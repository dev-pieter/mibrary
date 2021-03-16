import React from 'react';
import axios from 'axios';

export default function RemoveBook({shelfIndex ,login, setLogin, setViewState, bookId, at}) {
    async function removeBook() {
        console.log(console.log(shelfIndex));
        const arrShelf = login.shelves;
        
        const newArray = arrShelf[shelfIndex].books.filter(item => item !== bookId);
        
        arrShelf[shelfIndex].books = newArray;

        await setLogin({...login, shelves : arrShelf});


            // await axios.get(`http://localhost:3000/${login.profile._id}/${bookId}/remove`)
            // .then(res => {
            //     console.log(res);
            // })
    }

    return (
        <button onClick={removeBook} style={{borderRadius: '20px',background: 'white', position: 'absolute', border: 'none', boxShadow: '2px 2px 6px grey', left: '-4px', top: '-4px'}}>x</button>
    )
}
