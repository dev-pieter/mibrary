import { useState } from 'react';
import Auth from './Auth/Auth';
import LogoutButton from './Auth/LogoutButton';
import BookSearch from './BookSearch/BookSearch';
import Shelf from './Home/Shelf'
import SecureRoute from './Auth/SecureRoute';
import BookView from './Books/BookView';
import Feature from './Home/Feature';
import ShelfOptions from './Shelves/ShelfOptions';
import Banner from './Home/Banner';
import { Navbar, Nav} from 'react-bootstrap';
import Footer from './Home/Footer';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';


function App() {
  const [login, setLogin] = useState({profile: 0, shelves: [], loggedIn: false});
  const [viewState, setViewState] = useState({view : "shelf", bookId : 0});
  const [books, setBooks] = useState({b: 0});
  const [shelfView, setShelfView] = useState(0);

    return (
      <Router>
      <div className="App">
        {/* Navigation */}
        <Navbar expand="lg" sticky="top" >
          <Navbar.Brand style={{display: 'flex'}}><Nav.Link><NavLink className='nv-icon' to='/home'><h3 style={{color: 'black', background:'white', borderRadius: '5px', padding: '8px'}}>Mi</h3></NavLink></Nav.Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link><NavLink className='nv-icon' to='/home'><i className="fa fa-book-reader" style={{fontSize : '1rem', margin : '6px'}}></i>Library</NavLink></Nav.Link>
              <Nav.Link><NavLink className='nv-icon' to='/books'><i className="fa fa-search" style={{fontSize : '1rem', margin : '6px'}}></i>Book Search</NavLink></Nav.Link>
              <Nav.Link><NavLink className='nv-icon' to='/shelves'><i className="fa fa-bars" style={{fontSize : '1rem', margin : '6px'}}></i>Shelf Options</NavLink></Nav.Link>
            </Nav>
            {login.loggedIn ? <LogoutButton auth={setLogin}>Logout</LogoutButton> : null}
          </Navbar.Collapse>
        </Navbar>

        {/* body */}
          <Route exact path='/'>
            {login.loggedIn ? <Redirect to={{pathname: '/home'}}></Redirect> : null}
            <Auth loginHandle={setLogin}></Auth>
          </Route>
          <SecureRoute path='/home' login={login}>
            {viewState.view === "shelf" && login.shelves.length !== 0 && login.shelves[shelfView] !== undefined
            ? (<>
                <Banner></Banner>
                <div style={{display: 'flex', textAlign: 'center', width: '100%', justifyContent: 'center', padding: '10px'}}>
                  <h2>{login.shelves[shelfView].name}</h2>
                  <div className="dropdown">
                      <button className="btn">
                          <i className="fa fa-caret-down"></i>
                      </button>
                      <div className="dropdown-content">
                          {login.shelves.map((shelf, index) => 
                              <a style={{color: 'black', cursor: 'pointer'}} onClick={() => setShelfView(index)}>{shelf.name}</a>
                          )}
                      </div>
                  </div>
                </div>
                <Shelf shelfIndex={shelfView} login={login} shelf={login.shelves[shelfView]} setLogin={setLogin} setViewState={setViewState}></Shelf>
                <Feature login={login} setLogin={setLogin} setViewState={setViewState}></Feature> 
              </>)
            : shelfView !== 0 ? setShelfView(0) : null}
            {viewState.view === "book" 
            ? <BookView bookId={viewState.bookId} setViewState={setViewState}></BookView>
            : null}
            {/* Reading List (like Todo) */}
            {/* NY Times Recomendations */}
          </SecureRoute>
          <SecureRoute path='/books' login={login}>
            {viewState.view === "shelf" 
            ? <BookSearch books={books} setBooks={setBooks} setLogin={setLogin} setViewState={setViewState} login={login}></BookSearch>
            : null}
            {viewState.view === "book" 
            ? <BookView bookId={viewState.bookId} setViewState={setViewState}></BookView>
            : null}

          </SecureRoute>
          <SecureRoute path='/shelves' login={login}>
              <ShelfOptions login={login} setLogin={setLogin}></ShelfOptions>
          </SecureRoute>
          <Footer/>
      </div>
      </Router>
    );
}

export default App;
