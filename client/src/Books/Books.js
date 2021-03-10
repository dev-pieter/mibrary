import React, {useEffect, useState} from 'react';
import axios from 'axios';
import placeholder from '../images/placeholder.png'
import { Card, Button } from 'react-bootstrap';
import RemoveBook from './RemoveBook';
import '../css/Books.css'
 
export default function Books({login = 0, setLogin=0, isbn = 0, bookId = 0, bookObj = 0, bookItem = 0 , search = false, at = 0, setViewState = 0}) {
    var colors = ['primary', 'success', 'info', 'warning', 'danger'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    const [book, setBook] = useState(0);

    async function addBook(id = 0, push = 0) {
            await axios.get(`https://goodoakfurniture.co.za/${at}/${id}/add`)
            .then(res => {
                console.log(res);
                const arrBooks = login.books;

                push === 1 
                ? arrBooks.unshift(bookItem)
                : arrBooks.unshift(book);

                console.log(bookObj);

                setBook({...book});
                setLogin({...login, arrBooks});
            })
    }

    useEffect(async () => {
        if(!book && isbn !== 0){
            async function getBook() {
                await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
                .then(res => {
                    console.log(res);
                    if(res.data.totalItems){
                        setBook(res.data.items[0]);
                    }
                })
            }

            await getBook();
        }
    }, [book])

    function setView(){
        setViewState({view : "book", bookId : bookId});
    }

    function checkBook(id = 0){
        if(!id){
            let bool = false
            login.books.forEach(item => {
                if (item.id == book.id) {
                    bool = true;
                }
            })

            return bool;
        }else{
            let bool = false
            login.books.forEach(item => {
                if (item.id == bookId) {
                    bool = true;
                }
            })

            return bool;
        }
    }

    if(isbn !== 0){
        if(book.volumeInfo !== undefined){
            return(
                <div style={{margin: "20px"}}>
                    <Card className='phone-card' style={{background: 'none', color: 'white', boxShadow: '0 0 10px black'}}>
                    {book.volumeInfo.imageLinks !== undefined 
                    ? <Card.Img className='c-image' variant="top" src={book.volumeInfo.imageLinks.thumbnail}/> 
                    : <Card.Img className='c-image' variant="top" src={placeholder}/> }
                    <Card.Body>
                        {/* <Card.Title>{book.volumeInfo.title}</Card.Title> */}
                        
                        <Card.Text className='c-text'>
                        {book.volumeInfo.title.length >= 25
                        ? book.volumeInfo.title.substring(0,25) + '...'
                        : book.volumeInfo.title}
                        </Card.Text>
                        {!checkBook()
                        ? <Button variant={random_color}><a onClick={() => addBook(book.id)} target='_blank' style={{textDecoration: 'none', color: 'white'}}>Add</a></Button>
                        : null
                        }   
                    </Card.Body>
                    </Card>
                </div>
            )
        }else{
            return null;
        }
    }else{
        if(bookObj){
            return (
                <div style={{margin: "20px", }}>
                    <Card className='phone-card' style={{background: 'none', color: 'white', boxShadow: '0 0 10px black'}}>
                    {!search 
                    ? <RemoveBook login={login} setLogin={setLogin} setViewState={setViewState} bookId={bookId} at={at}></RemoveBook>
                    : null}
                    {bookObj.imageLinks !== undefined 
                    ? <Card.Img className='c-image' variant="top" src={bookObj.imageLinks.thumbnail}/> 
                    : <Card.Img className='c-image' variant="top" src={placeholder}/> }
                    <Card.Body>
                        {/* <Card.Title>{bookObj.title}</Card.Title> */}
                        <Card.Text className='c-text'>
                        {bookObj.title.length >= 25
                        ? bookObj.title.substring(0,25) + '...'
                        : bookObj.title}
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
            return null;
        }
    }
}
