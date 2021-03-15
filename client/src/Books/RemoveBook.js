import React from 'react';
import axios from 'axios';

export default function RemoveBook({login, setLogin, setViewState, bookId, at}) {
    async function removeBook() {
        const arrBooks = login.books;
        console.log(arrBooks);
        await setLogin({...login, books : arrBooks.filter(item => item !== bookId)});


            await axios.get(`http://localhost:3000/${login.profile._id}/${bookId}/remove`)
            .then(res => {
                console.log(res);
            })
    }

    return (
        <button onClick={removeBook} style={{borderRadius: '20px',background: 'white', position: 'absolute', border: 'none', boxShadow: '2px 2px 6px grey', left: '-4px', top: '-4px'}}>x</button>
    )
}
