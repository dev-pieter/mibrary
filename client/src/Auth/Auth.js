import React from 'react';
import { Container, Row } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';

export default function Auth({loginHandle}) {
    const responseGoogle = (response) => {
        loginHandle({profile: response.profileObj, token: response.tokenObj, loggedIn: true});
    };

    const responseFailure = (response) => {
        console.log(response);
    };

    return (
        <Container>
            <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                <div style={{padding: '40px'}}>
                    <h4>Please Log in to view your content</h4>
                    <GoogleLogin
                        clientId="512409493412-p8em5bgu9urlf0hg0gpn0qj7fssd9pis.apps.googleusercontent.com"
                        buttonText="Login"
                        scope="https://www.googleapis.com/auth/books"
                        onSuccess={responseGoogle}
                        onFailure={responseFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                </div>
            </Row>
        </Container>
    )
}
