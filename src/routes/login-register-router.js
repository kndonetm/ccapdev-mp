
import express from 'express';
import jwt from 'jsonwebtoken'
import User from '../model/User.js' 

// import { ObjectId } from "mongodb"
// import { getDb } from '../model/conn.js'
// const db = getDb();;
// const users_db = db.collection("users");

const loginRegisterRouter = express.Router()
const handleErrors = (err) => {
    let errors = { username: '', password: '' }
    
    if (err.message.includes('username')) {
        errors.username = err.message
    } else {
        errors.password = err.message
    }

    return errors;
  }

//ayusin ung logic later
const maxAge = 3 * 24 * 60 * 60
const createToken = (_id) => {
    return jwt.sign({_id}, "secret", { expiresIn: maxAge}) 
}

const login = async (req, res) => {
    // const currUser = req.body
    const {username , password} = req.body

    console.log(req.body)

    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
        res.status(200).json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    } 
} 

// async function findUserByUsername(username) {
//     try {
//       const user = await users_db.findOne({ username });
//       return user;
//     } catch (error) {
//       console.error('Error finding user:', error);
//       throw error;
//     } 
//   }

const signup = async (req, res) => {
    const {username , password, description, pfp} = req.body
    console.log(req.body)
    
    try{
        const user = await User.signup(username , password, description, pfp)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})

        res.status(200).json({ user: user._id })
    } catch (error) {    
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    }
}

const getUser = (req, res) => {
    res.render('user')
}

const showLogin = (req, res) => {
    const data = {
        css: `
            <link rel="stylesheet" href="/static/css/auth.css">
        `,
        js: `
            <script src="/static/js/login.js" defer></script>
        `,
    };
    res.render('login', data)
}

const showSignup = (req, res) => {
    const data = {
        css: `
            <link rel="stylesheet" href="/static/css/auth.css">
        `,
        js: `
            <script src="/static/js/signup.js" defer></script>
        `,
    };
    res.render('signup', data)
}

const logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}

loginRegisterRouter.get('/login', showLogin)
loginRegisterRouter.post('/login', login)
loginRegisterRouter.get('/signup', showSignup)
loginRegisterRouter.post('/signup', signup)
loginRegisterRouter.get('/logout', logout)
loginRegisterRouter.get('/:username', getUser)

export default loginRegisterRouter;
