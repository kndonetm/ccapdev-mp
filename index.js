import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';

import express from 'express';
import exphbs from 'express-handlebars';

import router from './src/routes/index-router.js';

import { connectToMongo } from './src/model/conn.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
app.use("/static", express.static(__dirname + "/public"));

app.engine("hbs", exphbs.engine({ 
    extname: "hbs",
}));
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.set("view cache", false);

app.use(router);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Express app now listening...");
    connectToMongo((err) => {
        if (err) {
            console.error("An error has occurred:");
            console.error(err);
            return;
        }
        console.log("Connected to Mongodb");
    });
});