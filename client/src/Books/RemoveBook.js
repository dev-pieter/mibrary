import React from 'react';
import axios from 'axios';

export default function RemoveBook({login, setLogin, setViewState, bookId, at}) {
    
    async function removeBook() {
            await axios.get(`https://goodoakfurniture.co.za/${at}/${bookId}/remove`)
            .then(res => {
                console.log(res);
                const arrBooks = login.books;
                let arr = arrBooks.filter(item => item.id !== bookId)
                setLogin({...login, books : arr});
            })
    }

    return (
        <button onClick={removeBook} style={{borderRadius: '20px',background: 'white', position: 'absolute', border: 'none', boxShadow: '2px 2px 6px grey', left: '-4px', top: '-4px'}}>x</button>
    )
}
