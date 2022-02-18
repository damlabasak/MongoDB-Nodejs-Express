const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const {requireAuth, checkUser} = require('./middlewares/authMiddleware')

const app = express()

const dbURL = 'mongodb+srv://damla:123@nodedatabase.sqjwu.mongodb.net/nodejsmongodb?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(27017))
    .catch((err) => console.log(err))

app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true})) //içiçe nesne gönderebilmek için, true
app.use(cookieParser())

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
app.get('*',checkUser) // checkUser tüm istekler üzerinde çalışsın
app.get('/',(req,res) => { //anasayfayı blog sayfasına yönlendirme
    res.redirect('/blog')
})

app.use('/',authRoutes)
app.use('/admin',requireAuth,adminRoutes)
app.use('/blog',blogRoutes)

app.get('/about',(req,res) => {
    res.render('about',{title:'Hakkımızda'})
})

app.get('/about-us',(req,res) => {
    res.redirect('/about')
})

app.use((req,res) => {
    res.status(404).render('404',{title:'404'})
})