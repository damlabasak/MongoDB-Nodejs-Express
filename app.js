const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

const app = express()

const dbURL = 'mongodb+srv://damla:123@nodedatabase.sqjwu.mongodb.net/nodejsmongodb?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(27017))
    .catch((err) => console.log(err))

app.set('view engine','ejs')

app.use(express.static('public'))

/* app.get('/add',(req,res) => { //db'e manuel veri ekleme
    const blog = new Blog({
        title: 'yeni yazı2',
        short: 'kısa açıklama2',
        long: 'uzun açıklama2'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all',(req,res) => { //eklenen tüm yazıları json formatta görmek için
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
 */
app.get('/',(req,res) => {
    Blog.find().sort({ createdAt: -1}) //son kayıt başta gösterilir
        .then((result) => {
            res.render('index',{title:'Anasayfa',blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blog/:id',(req,res) => { // :'dan sonra bir değişken belirtilir
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('blog',{blog: result, title:'Detay'})
        })
        .catch((err) => {
            res.status(404).render('404',{title:'404'})
        })
})

app.get('/about',(req,res) => {
    res.render('about',{title:'Hakkımızda'})
})

app.get('/about-us',(req,res) => {
    res.redirect('/about')
})

app.get('/login',(req,res) => {
    res.render('login',{title:'Giriş Yap'})
})

app.use((req,res) => {
    res.status(404).render('404',{title:'404'})
})