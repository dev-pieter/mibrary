import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';

export default function Auth({loginHandle}) {
    const [view, setView] = useState('login');
    const [info, setInfo] = useState({username : '', password : ''});

    // const responseGoogle = (response) => {
    //     loginHandle({profile: response.profileObj, loggedIn: true});
    // };

    // const responseFailure = (response) => {
    //     console.log(response);
    // };

    async function request(obj){
        let object;
        object = await axios.post(`http://localhost:3000/login`, obj);
        return object;
    }

    async function requestRegister(obj){
        let object;
        object = await axios.post(`http://localhost:3000/register`, obj);
        return object;
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const body = {};

        if(info.username === '' || info.password === ''){
            alert('Username or Password cannot be blank.')
        }else{
            formData.forEach((value, property) => body[property] = value);

            if(view=== 'login'){
                const object = await request(body);
                console.log(object.status);

                if(!object.data.found){
                    alert('Incorrect username or password. Please try again.');
                }else{
                    loginHandle({profile: object.data, shelves: object.data.shelves, loggedIn: true}); 
                }
            }else if(view === 'register'){
                const object = await requestRegister(body);
                if(!object.data.found){
                    alert('Unsuccessful register');
                }else{
                    alert('Welcome ' + info.username + '. Please log in to continue');
                    setView('login');
                }
            }
        }
    }

    function handleUsername(val){
        setInfo({...info, username : val.target.value});
    }

    function handlePassword(val){
        setInfo({...info, password : val.target.value});
    }

    if(view === 'login'){
        return (
            <Container>
                <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                    <div style={{padding: '40px'}}>
                        <h4>Please Log in to view your content</h4>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <label>
                            User Name:<br/>
                            <input name="username" type="text" value={info.username} onChange={handleUsername} />
                            </label><br/>
                            <label>
                            Password:<br/>
                            <input name="password" type="password" value={info.password} onChange={handlePassword} />
                            </label><br/>
                            <input type="submit" value="Login"/>
                        </form>
                        <br/>
                        <p>Not registered?</p>
                        <button onClick={() => setView('register')}>Register</button>
                    </div>
                </Row>
            </Container>
        )
    }else if(view === 'register'){
        return(
            <Container>
                <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                    <div style={{padding: '40px'}}>
                        <h4>Please enter a username and password</h4>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <label>
                            User Name:<br/>
                            <input name="username" type="text" value={info.username} onChange={handleUsername} />
                            </label><br/>
                            <label>
                            Password:<br/>
                            <input name="password" type="password" value={info.password} onChange={handlePassword} />
                            </label><br/>
                            <input type="submit" value="Register"/>
                        </form>
                    </div>
                </Row>
            </Container>
        )
    }
    
}
