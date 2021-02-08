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
        console.log(req.user)
        next()
    }else {
        res.redirect('/login')
    }
}

//file upload
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) =>{
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})




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
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})

//create book
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null 
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    })

    console.log(book)

    try {
        const newBook = await book.save() 
        res.redirect(`books`)
    } catch (error) {
        if (book.coverImageName != null) {
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book, true)
    }
})

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book 
        }

        if (hasError) params.errorMessage = 'Error Creating Book '

        res.render('books/new', params)
    } catch (error) {
        res.redirect('/books')
    }
}

function removeBookCover(fileName){
    fs.unlink(path.join(uploadPath, fileName), err =>{
        if (err) console.error(err)
    })
}
    

module.exports = router