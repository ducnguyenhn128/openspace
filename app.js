require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
// const authentication = require('./src/controllers/middleware')

// For handlebars
const path = require('path');
const {engine} = require('express-handlebars');

// Routers
const userRouter = require('./src/controllers/userRouter')
const profileRouter = require('./src/controllers/profileRouter');
const postRouter = require('./src/controllers/postRouter');
const tagRouter = require('./src/controllers/tagRouter');

// CORS
app.use(cors({
    origin: ['http://localhost:3000' ,'/\.netlify\.app$/}' ] ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (e.g., cookies)
  }));
  
// Body parser
app.use(bodyParser.json())


// HandleBars Template Engine
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/src/views'))

// API End Point
app.use('/api', userRouter)
app.use('/user', profileRouter)
app.use('/post', postRouter)
app.use('/tag', tagRouter)
app.get('/', (req, res) => {
    res.status(200).send('App is running')
})

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})