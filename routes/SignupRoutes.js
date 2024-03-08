const express=require('express')
const { getsignuppage, postsignuppage, getlogin, postlogin, getprofile } = require('../controllers/SignupController')
const { authenticate } = require('../middleware/middleware')
const router=express.Router()

router.get('/',getsignuppage)
router.post('/postsignup',postsignuppage)

router.get('/login',getlogin)
router.post('/postlogin',authenticate,postlogin)

router.get('/profile',authenticate,getprofile)

module.exports=router