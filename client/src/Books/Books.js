import React, {useEffect, useState} from 'react';
import axios from 'axios';
import placeholder from '../images/placeholder.png'
import { Card, Button } from 'react-bootstrap';
import RemoveBook from './RemoveBook';
import '../css/Books.css'
 
export default function Books({login = 0, setLogin=0, isbn = 0, bookId = 0, search = false, at = 0, setViewState = 0}) {
    var colors = ['primary', 'success', 'info', 'warning', 'danger'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    const [book, setBook] = useState(0);

    async function addBook(id = 0, push = 0) {
            const arrBooks = login.books;

            push === 1 
            ? arrBooks.unshift(id)
            : arrBooks.unshift(id);

            setBook({...book});

            await axios.get(`http://localhost:3000/${login.profile._id}/${bookId}/add-book`)
            .then(res => {
                console.log(res);
                setLogin({...login, books : arrBooks});
            })
    }

    useEffect(async () => {
            async function getBook() {
                await axios.get(`https://openlibrary.org/api/books.json?bibkeys=ISBN:${bookId}&jscmd=data`)
                .then(res => {
                    console.log(res.data[`ISBN:${bookId}`]);
                    setBook(res.data[`ISBN:${bookId}`]);
                })
            }

            await getBook();
    }, [login])

    function setView(){
        setViewState({view : "book", bookId : bookId});
    }

    function checkBook(id = 0){
        if(!id){
            let bool = false
            login.books.forEach(item => {
                if (item === book) {
                    bool = true;
                }
            })

            return bool;
        }else{
            let bool = false
            login.books.forEach(item => {
                if (item === bookId) {
                    bool = true;
                }
            })

            return bool;
        }
    }

        if(book !== undefined && book !== 0){
            return (
                <div style={{margin: "20px", }}>
                    <Card className='phone-card' style={{background: 'none', color: 'white', boxShadow: '0 0 10px black'}}>
                    {!search 
                    ? <RemoveBook login={login} setLogin={setLogin} setViewState={setViewState} bookId={bookId} at={at}></RemoveBook>
                    : null}
                    {book.cover !== undefined 
                    ? <Card.Img className='c-image' variant="top" src={book.cover["medium"]}/> 
                    : <Card.Img className='c-image' variant="top" src={placeholder}/> }
                    <Card.Body>
                        {/* <Card.Title>{bookObj.title}</Card.Title> */}
                        <Card.Text className='c-text'>
                        {book.title.length >= 25
                        ? book.title.substring(0,25) + '...'
                        : book.title}
                        </Card.Text>
                        {!checkBook(1) 
                        ? (<div style={{display : 'flex'}}>
                            <Button variant={random_color}><a onClick={() => addBook(bookId, 1)} target='_blank' style={{textDecoration: 'none', color: 'white'}}>Add</a></Button>
                            <div style={{minWidth: '5px'}}></div>
                            <Button variant={random_color}><a onClick={setView} style={{textDecoration: 'none', color: 'white'}}>view</a></Button>
                        </div>)
                        : <Button variant={random_color}><a onClick={setView} style={{textDecoration: 'none', color: 'white'}}>view</a></Button>
                        }   
                    </Card.Body>
                    </Card>
                </div>
            );
        }else{
            console.log('no Book');
            return null;
        }
}
