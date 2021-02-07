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

// const authClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)


logedIn = false
var oAuth2Client
var response1 
var responseShelf
const url = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves';

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


router.get('/', async (req, res) => {
    const books = []
    const shelves = []
    console.log(response1)

    if(logedIn){
        const data = response1.data
        console.log(data.items)
        data.items.forEach(shelf => {
            shelves.push(shelf.id)
        })

        console.log(shelves)

        for(var i = 0; i < shelves.length; ++i){
            if(shelves[i] >= 1000){
                var newURL = url + '/' + shelves[i] + '/volumes'
                responseShelf = await oAuth2Client.request({
                    url: newURL
                })
                
                // console.log(responseShelf.data)
            }else{
                console.log('Not personal Shelf')
            }
            
        }

            
        // var newURL = url + '/' + toString(shelf.id) + '/volumes'
        // responseShelf = oAuth2Client.request({newURL})
        responseShelf.data.items.forEach(book => {
    
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

            // console.log(newBook)

            books.push(newBook)
        });
    }

    res.render('index', {
        books: books, 
        logedIn: logedIn
    })


})

router.get('/login', async (req, res) => {

    if(!logedIn){
        console.log('YES')
        oAuth2Client = await getAuthenticatedClient();

        
        response1 = await oAuth2Client.request({
            url: url,
        });
        console.log(response1.data);

        // After acquiring an access_token, you may want to check on the audience, expiration,
        // or original scopes requested.  You can do that with the `getTokenInfo` method.
        const tokenInfo = await oAuth2Client.getTokenInfo(
            oAuth2Client.credentials.access_token
        );
        console.log(tokenInfo);

    }

    logedIn = true

    res.redirect('/')

})

module.exports = router