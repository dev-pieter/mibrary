import React from 'react';
import { Container, Row, Button, Col} from 'react-bootstrap';
import Book from '../Books/Books';
import '../css/Feature.css'

export default function Shelf({login, setLogin, books = 0, setViewState, at}) {
    if(books.length === 0){
        return(
            <Container fluid style={{height: '90vh'}}>
                <div style={{height: '15vh', width:'100%', textAlign: 'center'}}>
                    <br></br>
                    <h1>Mi Books</h1>
                    <br></br>
                    <h3>No Books on this shelf Yet</h3>
                    <br></br>
                    <h3>If you have not created a Google Books shelf yet<br/> Please click the button below.</h3>
                    <br/>
                    <Button variant='info' href='https://books.google.com/books' target='_blank'>Create a Shelf</Button>
                </div>
            </Container>
        )
    }else {
        return (
            <div>
                <Container fluid style={{height: '90vh'}}>
                    <Row className='h-100'>
                        <Col className='my-auto' style={{width:'100%', textAlign: 'center'}}>
                            <h1>Mi Books</h1>
                        </Col>
                        <Col className='phone-col' xs={12} style={{width: '100%', overflowX: 'scroll', display: 'flex', padding:'40px'}}>
                        {typeof books === 'object' ? books.map((item) => (<Book login={login} setLogin={setLogin} bookId={item.id} bookObj={item.volumeInfo} setViewState={setViewState} at={at}>{item.id}</Book>)) : 'Loading...'} 
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
