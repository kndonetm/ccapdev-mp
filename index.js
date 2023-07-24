import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';

import express from 'express';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser'

import router from './src/routes/index-router.js';

import { connectToMongo } from './src/model/conn.js';

import hbsHelpers from './src/modules/handlebars-helpers/helpers.js'

import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'

const app = express();
app.use(cookieParser())

const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL

app.use("/static", express.static(__dirname + "/public"));

var hbs = exphbs.create({
    helpers: hbsHelpers,
    defaultLayout: 'main',
    partialsDir: __dirname + "/src/views/partials",
    extname: 'hbs'
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.set("view cache", false);
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());

app.get('*', async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
         jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                let user = await User.findById(decodedToken._id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
})

app.use(router);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Express app now listening...");
    connectToMongo();
});