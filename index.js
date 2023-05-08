const express = require('express')
const app = express()
const port = 3000
const pool = require('./db/conn')
const exphbs = require('express-handlebars')


app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))


app.get('/books', (req, res) => {

    const sql = "SELECT * FROM books"

    pool.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }

        const books = data
        console.log(books)
        res.render('books', {books})
    })
})

app.get('/books/:id', (req, res) =>{

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, (err, data) =>{
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        console.log(book)
        res.render('book', {book})
    })
})

app.get('/books/edit/:id', (req, res) =>{

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data,  (err, data) =>{
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        console.log(book)
        res.render('editbook', {book})
    })
})

app.post('/books/insertbook', (req, res)=>{
    const title = req.body.title
    const pagety = req.body.pagety

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pagety', title, pagety]
    pool.query(sql, data, (err)=>{

        if(err){
            console.log(err)
        }

        res.redirect('/')
    })

})

app.post('/books/updatebook/', (req, res)=>{
    const id = req.body.id
    const title = req.body.title
    const pagety = req.body.pagety

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title, 'pagety', pagety, 'id', id]

    pool.query(sql, data, (err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.post('/books/remove/:id', (req, res)=>{
    const id = req.params.id

    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, (err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })

})

app.get('/', function (req, res) {
  res.render('home')
})

app.listen(port, ()=>{
    console.log('Aplicação funcionando na porta 3000')
})