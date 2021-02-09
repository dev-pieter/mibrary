const { Router, query } = require('express')
const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Book = require('../models/book')
const uploadPath = path.join('public', Book.coverImageBasePath)
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const {google} = require('googleapis')

var searchResponse

const isLoggedIn = (req, res, next) => {
    if(req.user){
        logedIn = true
        next()
    }else {
        res.redirect('/login')
    }
}



//all books route
router.get('/', isLoggedIn , async (req, res) => {
    var books = []
    
    if(req.query.title){
        searchResponse = await google.books('v1').volumes.list({
            q: req.query.title,
            maxResults: 10,
            access_token: req.user.accessToken
        })
    
        searchResponse.data.items.forEach(book => {
            var imageLinks

            if(book.volumeInfo.imageLinks){
                imageLinks = book.volumeInfo.imageLinks.thumbnail
            }

            var newBook = new Book({
                            id: book.id,
                            title: book.volumeInfo.title,
                            author: book.volumeInfo.authors,
                            publishDate: new Date(book.volumeInfo.publishedDate),
                            pageCount: book.volumeInfo.pageCount,
                            coverImageName: imageLinks,
                            description: book.volumeInfo.description,
                            link: 'https://books.google.co.za/books?id='+ book.id +'&redir_esc=y'
                            
                        })
        
            books.push(newBook)
            
        })
    }
 

    res.render('books/index', {
        books: books,
    })
})

//new book route


//create book
router.post('/',  async (req, res) => {
    console.log(req.body.id)

    google.books('v1').mylibrary.bookshelves.addVolume({
        shelf: '1001',
        volumeId : req.body.id,
        access_token: req.user.accessToken
    })

    res.redirect("/")
})

    

module.exports = router