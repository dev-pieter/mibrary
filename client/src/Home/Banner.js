import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

export default function Banner() {
    return (
        <Container fluid>
            <Row style={{height: '45vh', alignItems : 'center', display: 'flex', justifyContent : 'center'}}>
                <Col xs={6} style={{textAlign: 'right'}}>
                    <p style={{paddingTop: '10px'}}>Mibrary. A cosy place for  <br/> book-lovers to nerd out. <br/>Start filling up your library.</p>
                </Col>
                <Col xs={6} style={{textAlign: 'left'}}>
                    <h1>Every Book<br/> personally chosen</h1>
                </Col>
            </Row>
            <Row style={{justifyContent : 'center'}}>
                <div style={{width: '70vw', borderBottom: '1px solid grey', marginBottom: '100px'}}></div>
            </Row>
        </Container>
    )
}
