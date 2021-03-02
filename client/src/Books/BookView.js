import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import placeholder from '../images/placeholder.png';
import axios from 'axios';
import parse from 'html-react-parser';

const baseUri = "https://www.googleapis.com/books/v1/"

export default function BookView({bookId, setViewState = 0}) {
    const [item, setItem] = useState(0);

    useEffect(async () => {
        if(!item){
            async function getInfo() {
                let book;
                await axios.get(`${baseUri}volumes/${bookId}`)
                .then(res => {
                    console.log(res.data);
                    book = res.data.volumeInfo;
                })
                
                return book;
            }

            const b = await getInfo();
            setItem(b);
            console.log(item)
        }
    }, [item]);

    function setState() {
        setViewState({view : "shelf", bookId : 0})
    }

    return (
        <Container fluid>
            <br/>
            <Button onClick={setState}>{"<"}</Button>
            <Row style={{padding : "40px"}}>
                <Col style={{textAlign: "center"}}>
                    {item === 0 || item.imageLinks === undefined
                    ? <Image style={{width: "250px", boxShadow: "10px 10px grey"}} src={placeholder}></Image> 
                    : <Image style={{width: "250px", boxShadow: "10px 10px grey"}} src={item.imageLinks.thumbnail}></Image>}
                </Col>
                <Col xs={8}>
                    <h1>{item.title}</h1>
                    <br></br>
                    <div dangerouslySetInnerHTML={{__html: item.description}}></div>
                    <br></br>
                    <div style={{display: 'flex'}}>
                        <Button onClick={setState}>Buy Book</Button>
                        <Button onClick={setState}>Cancel</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
