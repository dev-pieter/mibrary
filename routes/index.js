const { Router, response } = require('express')
const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const { json } = require('body-parser')
const axios = require('axios')
const http = require('http')
const opn = require('open')
const destroyer = require('server-destroy');
const path = require('path')
const {google} = require('googleapis')
const getAuthenticatedClient = require('./OAuth2.js')
const { authenticate } = require('@google-cloud/local-auth')

const CLIENT_ID = '512409493412-p8em5bgu9urlf0hg0gpn0qj7fssd9pis.apps.googleusercontent.com'
const CLIENT_SECRET = 'ycFHTbcuhkK_Qg9AMjePZmwt'
const REDIRECT_URL = 'http://localhost:3001/oauth2callback'

var API_BASE_URL = 'https://www.googleapis.com/books/v1/users/';

// const authClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)


var logedIn = false
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

var defaultOptions = {
    // Google API key
    key: 'AIzaSyBUtmkaC7BEr4t4svqWEc6DzleBhmnxQCc',
    // Search in a specified field
    field: null,

    uid:  '118400095960063668699',
    // The position in the collection at which to start the list of results (startIndex)
    offset: 0,
    // The maximum number of elements to return with this request (Max 40) (maxResults)
    limit: 10,
    // Restrict results to books or magazines (or both) (printType)
    type: 'all',
    // Order results by relevance or newest (orderBy)
    order: 'relevance',
    // Restrict results to a specified language (two-letter ISO-639-1 code) (langRestrict)
    lang: 'en'
};

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
                
                console.log(responseShelf.data)
            }else{
                console.log('Not personal Shelf')
            }
            
        }

            
        // var newURL = url + '/' + toString(shelf.id) + '/volumes'
        // responseShelf = oAuth2Client.request({newURL})
        responseShelf.data.items.forEach(book => {
    
        var newBook = new Book({
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            publishDate: new Date(book.volumeInfo.publishedDate),
            pageCount: book.volumeInfo.pageCount,
            coverImageName: book.volumeInfo.imageLinks.smallThumbnail,
            description: book.volumeInfo.description
        })

        console.log(newBook)

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
    
    // Make a simple request to the People API using our pre-authenticated client. The `request()` method
    // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios
    

    
    

    // var url = API_BASE_URL + defaultOptions.uid +'/bookshelves/1001/volumes?key=' +defaultOptions.key
    

    // parsed["items"].forEach(book => {
    
    //     var newBook = new Book({
    //         title: book.volumeInfo.title,
    //         author: book.volumeInfo.authors,
    //         publishDate: new Date(book.volumeInfo.publishedDate),
    //         pageCount: book.volumeInfo.pageCount,
    //         coverImageName: book.volumeInfo.imageLinks.smallThumbnail,
    //         description: book.volumeInfo.description
    //     })

    //     console.log(newBook)

    //     books.push(newBook)
    // });

    res.redirect('/')

})

module.exports = router