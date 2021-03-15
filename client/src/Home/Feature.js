import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Books from '../Books/Books';
import '../css/Feature.css';
import fiction from '../Assets/villian.png';
import animal from '../Assets/dog-track.png';
import teen from '../Assets/star.png';
import grow from '../Assets/saving-money.png';

const baseUri = "https://api.nytimes.com/svc/books/v3/lists/current"

export default function Feature({setViewState, login, setLogin, at = 0}) {
    const [bestSellers, setBestSellers] = useState({books : [], cat : "hardcover-fiction"})

    useEffect(async () => {
        if(bestSellers.books.length === 0){
            async function getInfo() {
                let booksArr = [];
                await axios.get(`${baseUri}/${bestSellers.cat}.json?api-key=rxHByIHdBxZKoy7MWVpwTfAxRKw1wovs`)
                .then(res => {
                    console.log(res);
                    res.data.results.books.forEach(item => {
                        booksArr.push(item);
                    })
                })
                
                return booksArr;
            }

            let b = await getInfo();
            setBestSellers({books: b});
        }
    }, [bestSellers]);

    function changeCat (val) {
        setBestSellers({books: [], cat: val});
    }

    return (
        <div>
            <Container className="feature" fluid style={{height: '100vh'}}>
                <Row style={{justifyContent : 'center'}}>
                    <div style={{width: '70vw', borderBottom: '1px solid grey', marginBottom: '40px'}}></div>
                </Row>
                <Row style={{padding :'20px' ,display: "flex", justifyContent : 'center',textAlign: 'center', width: '100%'}}>
                    <h2>New York Best Sellers</h2>
                </Row>
                <Row>
                    <Col style={{display: 'flex', alignItems : 'center'}}>
                        <div>
                                <i className='fas fa-moon select' onClick={() => changeCat('hardcover-fiction')} style={{cursor: 'pointer'}}></i><h7 className='catag'>Fiction</h7><br/>
                                <i className='fas fa-star select' onClick={() => changeCat('young-adult')} style={{cursor: 'pointer'}}></i><h7 className='catag'>Young Adult</h7><br/>
                                <i className='fas fa-paw select' onClick={() => changeCat('animals')} style={{cursor: 'pointer'}}></i><h7 className='catag'>Animals & Wild</h7><br/>
                                <i className='fas fa-balance-scale select' onClick={() => changeCat('business-books')} style={{cursor: 'pointer'}}></i><h7 className='catag'>Success & Growth</h7><br/>
                        </div>
                    </Col>
                    <Col md={9} className="phone-col my-auto" style={{display : 'flex', overflowX: 'scroll', margin: '0'}}>
                            {bestSellers.books.map(item => 
                                <Books setViewState={setViewState} login={login} setLogin={setLogin} bookId={item.isbns.length !== 0 ? item.isbns[0].isbn10 : 0}></Books>
                            )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
