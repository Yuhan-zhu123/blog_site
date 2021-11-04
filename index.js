const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
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

app.get('/', (req, res) => {
    const articles = [{ // some test data
        title: 'Title 1',
        createdAt: new Date(),
        description: 'Test description1'
    },
    {
        title: 'Title 2',
        createdAt: new Date(),
        description: 'Test description2'
    },
    {
        title: 'Title 3',
        createdAt: new Date(),
        description: 'Test description3'
    }
    ]
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log(`Example app listening at port: ${port}`)
})