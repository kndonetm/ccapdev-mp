import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';

import express from 'express';
import exphbs from 'express-handlebars';

import router from './src/routes/index-router.js';

import { connectToMongo } from './src/model/conn.js';

import hbsHelpers from './src/modules/handlebars-helpers/helpers.js'

import bodyParser from 'body-parser';

const app = express();

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

app.use(router);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Express app now listening...");
    connectToMongo();
});