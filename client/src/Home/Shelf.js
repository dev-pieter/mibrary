import React, { useState } from 'react';
import { Container, Row, Button, Col} from 'react-bootstrap';
import Book from '../Books/Books';
import '../css/Feature.css'

export default function Shelf({shelfIndex, login, shelf, setLogin, setViewState, at}) {

        return (
            <div>
                <Container fluid style={{height: '90vh'}}>
                    <Row className='h-100'>
                        {/* <Col className='my-auto' style={{width:'100%', textAlign: 'center'}}>
                            <h1>{shelf.name}</h1>
                        </Col> */}
                        <Col className='phone-col' xs={12} style={{width: '100%', overflowX: 'scroll', display: 'flex', padding:'40px'}}>
                        {typeof shelf.books === 'object' ? shelf.books.map((item) => (<Book shelfIndex={shelfIndex} login={login} setLogin={setLogin} bookId={item} setViewState={setViewState}></Book>)) : 'Loading...'} 
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    
}
