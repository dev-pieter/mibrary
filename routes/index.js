const { Router, response } = require('express')
const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const axios = require('axios')
const http = require('http')
const opn = require('open')
const destroyer = require('server-destroy');
const path = require('path')
const {google} = require('googleapis')
const getAuthenticatedClient = require('./OAuth2.js')
const passport = require('passport')
const cookieSession = require('cookie-session')
const User = require('../models/user')
require('./passport-setup')
// const authClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)


logedIn = false
var oAuth2Client
var response1 
var responseShelf
const url = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves';

const keys = require('../oauth2.keys.json')
const { error } = require('console')
const scopes = 'https://www.googleapis.com/auth/books' 

const oauthClient = new google.auth.OAuth2({
    clientID: '512409493412-p8em5bgu9urlf0hg0gpn0qj7fssd9pis.apps.googleusercontent.com',
    clientSecret: 'ycFHTbcuhkK_Qg9AMjePZmwt',
    callbackURL: 'http://localhost:3000/google/callback',
})


const isLoggedIn = (req, res, next) => {
    if(req.user){
        logedIn = true
        next()
    }else {
        res.redirect('/login')
    }
}

// google.options({auth: authClient})

// async function authenticate(scopes) {
//     return new Promise((resolve, reject) => {
//       // grab the url that will be used for authorization
//       const authorizeUrl = authClient.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes.join(' '),
//       });
//       const server = http
//         .createServer(async (req, res) => {
//           try {
//             if (req.url.indexOf('/oauth2callback') > -1) {
//               const qs = new url.URL(req.url, 'http://localhost:3001')
//                 .searchParams;
//               res.end('Authentication successful! Please return to the console.');
//               server.destroy();
//               const {tokens} = await authClient.getToken(qs.get('code'));
//               authClient.credentials = tokens; // eslint-disable-line require-atomic-updates
//               resolve(authClient);
//             }
//           } catch (e) {
//             reject(e);
//           }
//         })
//         .listen(3001, () => {
//           // open the browser to the authorize url to start the workflow
//           opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
//         });
//       destroyer(server);
//     });
//   }



router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile', 'https://www.googleapis.com/auth/books' ] }
));

router.get('/google/success', isLoggedIn, (req, res) => {
    res.redirect('/')
})

router.get('/google/failure', (req, res) => {
    res.send(`Login Failed!`)
})

router.get('/logout', (req, res) =>{
    req.session = null
    req.logout()
    logedIn = false
    res.redirect('/login')
})

router.get('/empty-bookshelf', (req, res) => {
    res.render('emptyBookshelf')
})


router.get( '/google/callback',
    passport.authenticate( 'google', {failureRedirect: '/google/failure'}), 
    function(req, res){
        res.redirect('/google/success')
    });

router.get('/', isLoggedIn, async (req, res) => {
    var books = []
    var shelf
    var noShelf = false
    var empty = false

    // oauthClient.credentials = {
    //     access_token: req.user.accessToken
    // }
        try {
            responseShelf = await google.books('v1').mylibrary.bookshelves.get({
                shelf: '1001',
                access_token: req.user.accessToken
            })
            shelf = responseShelf.data.title
        } catch (error) {
            console.log(error)
            noShelf = true
            res.redirect('/empty-bookshelf')
        }

        try {
            response1 = await google.books('v1').mylibrary.bookshelves.volumes.list({
                shelf: '1001',
                access_token: req.user.accessToken
            })
        } catch (error) {
            console.log(error)
            noShelf = true
            res.redirect('/books')
        }

        console.log(response1.data.totalItems)
        
    
        if(response1.data.totalItems == 0){
            noShelf = true
            empty = true
            console.log('no Books')
        }

        
        
        if(!noShelf && !empty){
            console.log('yes')
            response1.data.items.forEach(book => {
                var newBook = new Book({
                                id: book.id,
                                title: book.volumeInfo.title,
                                author: book.volumeInfo.authors,
                                publishDate: new Date(book.volumeInfo.publishedDate),
                                pageCount: book.volumeInfo.pageCount,
                                coverImageName: book.volumeInfo.imageLinks.smallThumbnail,
                                description: book.volumeInfo.description,
                                link: 'https://books.google.co.za/books?id='+ book.id +'&redir_esc=y'
                                
                            })
            
                books.push(newBook)
                
            })

            console.log(books)
        }else{
            
        }
        

    
    

    // const shelves = []
    // console.log(response1)

    // if(logedIn){
    //     const data = response1.data
    //     console.log(data.items)
    //     data.items.forEach(shelf => {
    //         shelves.push(shelf.id)
    //     })

    //     console.log(shelves)

    //     for(var i = 0; i < shelves.length; ++i){
    //         if(shelves[i] >= 1000){
    //             var newURL = url + '/' + shelves[i] + '/volumes'
    //             responseShelf = await oAuth2Client.request({
    //                 url: newURL
    //             })
                
    //             // console.log(responseShelf.data)
    //         }else{
    //             console.log('Not personal Shelf')
    //         }
            
    //     }

            
    //     // var newURL = url + '/' + toString(shelf.id) + '/volumes'
    //     // responseShelf = oAuth2Client.request({newURL})
    //     responseShelf.data.items.forEach(book => {
    
    //         

    //         // console.log(newBook)

    //         books.push(newBook)
    //     });
    // }

    res.render('index', {
        books: books, 
        shelf: shelf ?  shelf : null,
        empty: empty
    })


})

router.get('/login', async (req, res) => {
    res.render('login')
})

module.exports = router