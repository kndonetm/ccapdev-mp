import { ObjectId } from "mongodb"
import { Router } from 'express'
import { getDb } from '../model/conn.js';

const loginRegisterRouter = Router();
const db = getDb();
const establishments_db = db.collection("establishments");
const reviews_db = db.collection("reviews");
const users_db = db.collection("users");

function saveLoginInfo(username, desc, image) {
    localStorage.setItem('currentLogin', 'true');
    localStorage.setItem('savedUsername', username);
    localStorage.setItem('descProf', desc);

    image ? localStorage.setItem('pfp', image) : localStorage.setItem('pfp', '/static/assets/unknown.jpg');
}

loginRegisterRouter.post('/register', async function (req, res) {
    try {
        const result = await users_db.insertOne({
            username: req.body.username,
            password: req.body.password,
            description: req.body.about,
            profilePicture: req.body.profilePicture,
        })

        console.log(result);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
})

loginRegisterRouter.post('/login', async function (req, res) {
    try {
        const result = await users_db.findOne({
            username: req.body.username,
            password: req.body.password,
        })

        console.log(result);
        if (result) {
            res.json(result);
            res.status(200);
            res.send();
        } else {
            res.status(403).json({err: "Invalid username or password"}).send();
        }
    } catch (err) {
        console.error(e);
        
        res.status(500).send();
    }
})

export default loginRegisterRouter;