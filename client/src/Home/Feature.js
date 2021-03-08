import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Books from '../Books/Books';

const baseUri = "https://api.nytimes.com/svc/books/v3/lists/current"

export default function Feature({login, setLogin, at = 0}) {
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
            <Container fluid style={{height: '100vh'}}>
                <Row style={{justifyContent : 'center'}}>
                    <div style={{width: '70vw', borderBottom: '1px solid grey', marginBottom: '40px'}}></div>
                </Row>
                <Row style={{padding :'20px' ,display: "flex", justifyContent : 'center',textAlign: 'center', width: '100%'}}>
                    <h1>New York Best Sellers</h1>
                </Row>
                <Row style={{padding :'20px'}}>
                    <Col style={{display: 'flex', alignItems : 'center'}}>
                        <div>
                                <h5 onClick={() => changeCat('hardcover-fiction')} style={{cursor: 'pointer'}}>Hardcover Fiction</h5><br/>
                                <h5 onClick={() => changeCat('young-adult')} style={{cursor: 'pointer'}}>Young adult</h5><br/>
                                <h5 onClick={() => changeCat('animals')} style={{cursor: 'pointer'}}>Animals & Wild</h5><br/>
                                <h5 onClick={() => changeCat('business-books')} style={{cursor: 'pointer'}}>Business & Success</h5><br/>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <div style={{display : 'flex', overflowX: 'scroll'}}>
                            {bestSellers.books.map(item => 
                                <Books login={login} setLogin={setLogin} isbn={item.isbns.length !== 0 ? item.isbns[0].isbn10 : 0} search={true} at={at}></Books>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
