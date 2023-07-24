
import express from 'express';
import jwt from 'jsonwebtoken'
import model from '../model/User.js' 


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
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: maxAge}) 
}

const login = async (req, res) => {
    const {username , password} = req.body
    console.log('trigger')
    try {
        const user = await model.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
        res.status(200).json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    } 
} 

const signup = async (req, res) => {
    const {username , password, description, pfp} = req.body
    
    try{
        const user = await model.signup(username , password, description, pfp)
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
    res.render('layouts/login')
}

const showSignup = (req, res) => {
    res.render('layouts/signup', {error: null})
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
