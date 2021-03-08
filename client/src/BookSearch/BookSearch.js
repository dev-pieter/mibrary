import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from '../Books/Books';
import { Container, Row } from 'react-bootstrap';

export default function BookSearch({at, setLogin, login, setViewState}) {
    const [value, setValue] = useState("");
    const [books, setBooks] = useState({b: 0});

    async function eff(params) {
        async function getBooks() {
        let books1;
        await axios.get(`http://13.244.138.249:3000/books/${params}`)
          .then(res => {
            console.log(res.data.data.items);
            books1 = res.data.data.items;
          })
        return books1;
      };
  
      let booksArr = await getBooks();
      setBooks({b: booksArr});
    }
    
    function submit(e){
        setValue(e.target.value);
        eff(value);
    }

    return (
        <Container fluid>
            <Row style={{display : 'flex', justifyContent: 'center', padding: '20px', textAlign: 'center'}}>
                <div>
                <br/>
                <h2>Search Through 1000's of Books</h2>
                <br/>
                <form className="searchForm">
                    <input
                        className="search"
                        type="text" name="search"
                        autoComplete="off"
                        placeholder="search books"
                        value={value}
                        onChange={submit}
                    />
                </form>
                </div>
            </Row>
            <Row style={{width: '100%'}}>
                {typeof books.b === 'object' ? books.b.map((item) => (<Book setLogin={setLogin} login={login} bookId={item.id} bookItem={item} bookObj={item.volumeInfo} setViewState={setViewState} search={true} at={at}>{item.id}</Book>)) : null}  
            </Row>
        </Container>
    )
}
