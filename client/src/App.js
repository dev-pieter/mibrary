import { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from './Auth/Auth';
import LogoutButton from './Auth/LogoutButton';
import Book from './Books/Books';
import BookSearch from './BookSearch/BookSearch';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const auth = {
  isLoggedIn : false,
  onAuth () {
    this.isLoggedIn = true;
  },
  onLogout () { 
    this.isLoggedIn = false;
  },
  getStatus ()  { return this.isLoggedIn;}
}

function SecureRoute({children, ...rest}) {
  return(
    <Route {...rest} render={() => rest.login.loggedIn ? (
      children)
      : (<Redirect to={{pathname : '/'}}></Redirect>)
    }></Route>
  )
}


function App() {
  const [login, setLogin] = useState({profile: 0, token: 0, books: 0, loggedIn: false});

  useEffect(async () => {
    let booksArr;
    if(!login.books){
      async function getBooks() {
        let books;
        await axios.get(`http://13.244.138.249:3000/${login.token.access_token}/books`)
          .then(res => {
            console.log(res.data.data.items);
            books = res.data.data.items;
          })
        return books;
      };
  
      booksArr = await getBooks();
      setLogin({...login,
                   books: booksArr,
      });
    }
  }, [login]);

    return (
      <Router>
      <div className="App">
        {/* Navigation */}
        <header className="App-header">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/" style={{display: 'flex'}}><h3 style={{color: 'white', background:'black', borderRadius: '5px', padding: '8px'}}>Mi</h3></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link><NavLink to='/home' style={{textDecoration: 'none', color: 'black'}}>Home</NavLink></Nav.Link>
              <Nav.Link><NavLink to='/books' style={{textDecoration: 'none', color: 'black'}}>Books</NavLink></Nav.Link>
            </Nav>
            {login.loggedIn ? <LogoutButton auth={setLogin}>Logout</LogoutButton> : null}
          </Navbar.Collapse>
        </Navbar>
        </header>

        {/* body */}
          <Route exact path='/'>
            {login.loggedIn ? <Redirect to={{pathname: '/home'}}></Redirect> : null}
            <Auth loginHandle={setLogin}></Auth>
          </Route>
          <SecureRoute path='/home' login={login}>
            <Container fluid>
            <div style={{height: '15vh', width:'100%', textAlign: 'center'}}>
              <br></br>
              <h1>Mi Books</h1>
            </div>
              <Row>
                <div style={{width: '100%', overflowX: 'scroll', display: 'flex'}}>
                {typeof login.books === 'object' ? login.books.map((item) => (<Book key={item.id} bookObj={item.volumeInfo}>{item.id}</Book>)) : 'Loading...'}  
                </div>
              </Row>
            </Container>
          </SecureRoute>
          <SecureRoute path='/books' login={login}>
              <BookSearch at={login.token.access_token}></BookSearch>
          </SecureRoute>
      </div>
      </Router>
    );
}

export default App;
