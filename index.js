const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const port = 3000

// connect to MongoDB
mongoose.connect(
    'mongodb+srv://yuhan123:123456qwe@cluster0.miawq.mongodb.net/myFirstDatabas', {
    useUnifiedTopology: true,
    useNewUrlParser: true
},
    () => console.log('Mongo connected')
);

// test connection
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
})

// use EJS as template engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))// override the method

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: -1}) //sort articles in descending order by created time
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log(`Example app listening at port: ${port}`)
})