import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import placeholder from '../images/placeholder.png';
import axios from 'axios';
import parse from 'html-react-parser';
import '../css/BookView.css'


export default function BookView({bookId, setViewState = 0}) {
    const [item, setItem] = useState({b : 0});

    useEffect(async () => {
        if(!item.b){
            async function getBook() {
                let b;
                await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookId}`)
                .then(res => {
                    b = res.data.items[0].volumeInfo;
                })

                return b;
            }

            const b = await getBook();
            setItem({b : b});
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
                        {item.b === 0 || item.b.imageLinks === undefined
                        ? <Image className='view-image' style={{width: "250px", boxShadow: "0 0 10px black"}} src={placeholder}></Image> 
                        : <Image className='view-image' style={{width: "250px", boxShadow: "0 0 10px black"}} src={item.b.imageLinks.thumbnail}></Image>}
                    </Col>
                    <Col xs={8}>
                        <h2>{item.b.title}</h2>
                        <br/>
                        {item.b.authors !== undefined
                        ? <p>By {item.b.authors[0]}.</p>
                        : null}
                        <br></br>
                        <div dangerouslySetInnerHTML={{__html: item.b.description}}></div>
                        <br></br>
                        <div style={{display: 'flex'}}>
                            <Button variant="info" href={item.b.infoLink} target="_blank">Buy Book</Button>
                            <div style={{width: "10px"}}/>
                            <Button variant="danger" onClick={setState}>Cancel</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )  
    }
}
