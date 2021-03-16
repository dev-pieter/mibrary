import React from 'react';
import axios from 'axios';
import '../css/AddBook.css';
// bookId, login, setLogin, book, setBook, shelves
export default function AddBook(props) {
    async function addBook(id = 0, index, push = 0) {
            const arrShelves = props.login.shelves;


            push === 1 
            ? arrShelves[index].books.unshift(id)
            : arrShelves[index].books.unshift(id);

            props.setBook({...props.book});

            await axios.get(`http://localhost:3000/${props.login.profile._id}/${props.bookId}/${index}/add-book`)
            .then(res => {
                console.log(res);
                props.setLogin({...props.login, shelves : arrShelves});
            })
    }

    return (
        <div style={{display : 'flex'}}>
            <div className="dropdown">
                <button className="btn">
                    <i className="fa fa-plus-circle"></i>
                </button>
                <div className="dropdown-content">
                    {props.shelves !== undefined ? props.shelves.map((shelf, index) => 
                      <a style={{color: 'black', cursor: 'pointer'}} onClick={() => addBook(props.bookId, index, 1)}>{shelf.name}</a>
                     ) : null}
                </div>
            </div>
            {/* <Button variant={random_color}><a onClick={() => addBook(bookId, 1)} target='_blank' style={{textDecoration: 'none', color: 'white'}}>Add</a></Button> */}
            <div style={{minWidth: '5px'}}></div>
        </div>
    )
}
