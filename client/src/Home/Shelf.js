import React from 'react';
import { Container, Row} from 'react-bootstrap';
import Book from '../Books/Books';

export default function Shelf({books = 0, setViewState}) {
    if(!books){
        return(
            <Container fluid>
                <div style={{height: '15vh', width:'100%', textAlign: 'center'}}>
                    <br></br>
                    <h1>Mi Books</h1>
                    <br></br>
                    <h3>No Books on this shelf Yet</h3>
                </div>
            </Container>
        )
    }else {
        return (
            <div>
                <Container fluid>
                    <div style={{height: '15vh', width:'100%', textAlign: 'center'}}>
                        <br></br>
                        <h1>Mi Books</h1>
                    </div>
                    <Row>
                        <div style={{width: '100%', overflowX: 'scroll', display: 'flex'}}>
                        {typeof books === 'object' ? books.map((item) => (<Book bookId={item.id} bookObj={item.volumeInfo} setViewState={setViewState}>{item.id}</Book>)) : 'Loading...'}  
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}
