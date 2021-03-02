import React from 'react';
import axios from 'axios';
import placeholder from '../images/placeholder.png'
import { Card, Button } from 'react-bootstrap';
 
export default function Books({bookId, bookObj , search = false, at = 0}) {
    var colors = ['primary', 'success', 'info', 'warning', 'danger'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];

    async function addBook() {
        await axios.get(`http://localhost:9000/${at}/${bookId}/add`)
          .then(res => {
            console.log(res);
            search = false;
            alert('Book Added Successfully');
          })
    }

        return (
            <div style={{margin: '20px'}}>
                <Card style={{ width: '13rem', borderRadius: '20px', background: '#F8F9FA'}}>
                {bookObj.imageLinks !== undefined 
                ? <Card.Img style={{borderRadius: '20px'}} variant="top" src={bookObj.imageLinks.thumbnail}/> 
                : <Card.Img style={{borderRadius: '20px'}} variant="top" src={placeholder}/> }
                <Card.Body>
                    <Card.Title>{bookObj.title}</Card.Title>
                    <Card.Text>
                    {bookObj.subtitle}
                    </Card.Text>
                    {search 
                    ? <Button variant={random_color}><a onClick={addBook} target='_blank' style={{textDecoration: 'none', color: 'white'}}>Add to Mibrary</a></Button>
                    : <Button variant={random_color}><a href={bookObj.previewLink} target='_blank' style={{textDecoration: 'none', color: 'white'}}>view</a></Button>
                    }   
                </Card.Body>
                </Card>
            </div>
        )
}
