import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import placeholder from '../images/placeholder.png';
import axios from 'axios';
import parse from 'html-react-parser';
import '../css/BookView.css'

const baseUri = "https://www.googleapis.com/books/v1/"

export default function BookView({bookId, setViewState = 0}) {
    const [item, setItem] = useState({b : 0});

    useEffect(async () => {
        if(!item.b){
            async function getBook() {
                let b;
                await axios.get(`https://openlibrary.org/api/books.json?bibkeys=ISBN:${bookId}&jscmd=data`)
                .then(res => {
                    console.log(res.data);
                    b = res.data[`ISBN:${bookId}`];
                })

                return b;
            }

            const b = await getBook();
            setItem({b : b});
            console.log(item)
        }
    }, [item]);

    function setState() {
        setViewState({view : "shelf", bookId : 0})
    }

    if(item.b !== undefined){
        return (
            <Container fluid>
                <br/>
                <Button style={{background: "black", borderColor: "black", margin: "25px", boxShadow: "3px 3px 10px black"}} onClick={setState}>{"<"}</Button>
                <Row style={{padding : "40px"}}>
                    <Col style={{textAlign: "center"}}>
                        <br/>
                        {item.b === 0 || item.b.cover === undefined
                        ? <Image className='view-image' style={{width: "250px", boxShadow: "0 0 10px black"}} src={placeholder}></Image> 
                        : <Image className='view-image' style={{width: "250px", boxShadow: "0 0 10px black"}} src={item.b.cover.medium}></Image>}
                    </Col>
                    <Col xs={8}>
                        <h2>{item.title}</h2>
                        <br/>
                        {item.b.authors !== undefined
                        ? <p>By {item.b.authors[0].name}.</p>
                        : null}
                        <br></br>
                        <div dangerouslySetInnerHTML={{__html: item.b.subtitle}}></div>
                        <br></br>
                        <div style={{display: 'flex'}}>
                            <Button variant="info" href={item.b.url} target="_blank">Buy Book</Button>
                            <div style={{width: "10px"}}/>
                            <Button variant="danger" onClick={setState}>Cancel</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )  
    }
}
