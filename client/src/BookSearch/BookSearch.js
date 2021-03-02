import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from '../Books/Books';
import { Container, Row } from 'react-bootstrap';

export default function BookSearch({at}) {
    const [value, setValue] = useState("");
    const [books, setBooks] = useState([]);

    async function eff(params) {
        async function getBooks() {
        let books;
        await axios.get(`http://13.244.138.249:3000/books/${params}`)
          .then(res => {
            console.log(res.data.data.items);
            books = res.data.data.items;
          })
        return books;
      };
  
      let booksArr = await getBooks();
      setBooks(booksArr);
    }
    
    function submit(e){
        setValue(e.target.value);
        eff(value);
    }

    return (
        <Container fluid>
            <Row style={{display : 'flex', justifyContent: 'center', padding: '20px'}}>
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
            </Row>
            <Row style={{width: '100%'}}>
                {typeof books === 'object' ? books.map((item) => (<Book key={item.id} bookId={item.id} bookObj={item.volumeInfo} search={true} at={at}>{item.id}</Book>)) : 'Loading...'}  
            </Row>
        </Container>
    )
}
