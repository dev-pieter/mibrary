const { Router } = require('express')
const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Book = require('../models/book')
const uploadPath = path.join('public', Book.coverImageBasePath)
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//file upload
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) =>{
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})




//all books route
router.get('/', async (req, res) => {
    let query = Book.find()

    if(req.query.title != null && req.query.title !== '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }

    try {
        const books = await query.exec()
        res.render('books/index', {
            books: books, 
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
    
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