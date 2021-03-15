import React, { useState } from 'react';
import { Container, Row, Button, Col} from 'react-bootstrap';
import Book from '../Books/Books';
import '../css/Feature.css'

export default function Shelf({login, setLogin, setViewState, at}) {

    if(login.books.length === 0){
        return(
            <Container fluid style={{height: '90vh'}}>
                <div style={{height: '15vh', width:'100%', textAlign: 'center'}}>
                    <br></br>
                    <h1>Mi Books</h1>
                    <br></br>
                    <h3>No Books on this shelf Yet</h3>
                    <br></br>
                    <h3>To get Started, add some books to your shelf.</h3>
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
                        {typeof login.books === 'object' ? login.books.map((item) => (<Book login={login} setLogin={setLogin} bookId={item} setViewState={setViewState}></Book>)) : 'Loading...'} 
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
