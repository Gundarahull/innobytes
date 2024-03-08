const server = require('express')
const app = server()


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const cookieParser =require('cookie-parser');
app.use(cookieParser()); 

const dotenv=require('dotenv')
require('dotenv').config()

const db = require('./util/db')


app.set('view engine','ejs')
app.set('views')

const SignupRoutes=require('./routes/SignupRoutes')
app.use(SignupRoutes)

app.listen(8000, () => {
    console.log("server STRT");
})