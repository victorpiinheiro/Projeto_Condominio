require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const {middlewareGlobal} = require('./src/middleware/middlewares');




const mongoose = require('mongoose');
mongoose.connect(process.env.CONECTIONSTRING)
.then(() => {
    console.log('conectei a base de dados');
    app.emit('pronto');
})
.catch(e => console.log(e));




app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '../frontend/assets')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


const sessionOptions = session({
    secret: 'sdgergereretg',
    store: MongoStore.create({mongoUrl: process.env.CONECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
});

app.use(sessionOptions);
app.use(flash());
app.use(middlewareGlobal);

app.use(routes);
app.on('pronto', () =>{
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
})
