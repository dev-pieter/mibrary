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
            <Button style={{background: "black", borderColor: "black", margin: "25px", boxShadow: "3px 3px grey"}} onClick={setState}>{"<"}</Button>
            <Row style={{padding : "40px"}}>
                <Col style={{textAlign: "center"}}>
                    <br/>
                    {item === 0 || item.imageLinks === undefined
                    ? <Image style={{width: "250px", boxShadow: "10px 10px 6px grey"}} src={placeholder}></Image> 
                    : <Image style={{width: "250px", boxShadow: "10px 10px 6px grey"}} src={item.imageLinks.thumbnail}></Image>}
                </Col>
                <Col xs={8}>
                    <h1>{item.title}</h1>
                    <br></br>
                    <div dangerouslySetInnerHTML={{__html: item.description}}></div>
                    <br></br>
                    <div style={{display: 'flex'}}>
                        <Button variant="info" href={item.infoLink} target="_blank">Buy Book</Button>
                        <div style={{width: "10px"}}/>
                        <Button variant="danger" onClick={setState}>Cancel</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
