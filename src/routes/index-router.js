import { ObjectId } from "mongodb"

import { Router } from 'express'
import searchRouter from './search-router.js';
import userRouter from './user-router.js';
import establishmentRouter from "./establishment-router.js";

import { getDb } from '../model/conn.js';

const router = Router();
const db = getDb();
const establishments_db = db.collection("establishments");
const users_db = db.collection("users");
const reviews_db = db.collection("reviews");

router.get("/", async function (req, res) {
    const establishments = await establishments_db.find({}).toArray();

    res.render("index", {
        title: "Home",
        establishments: establishments,
        css: `<link rel="stylesheet" href="/static/css/style.css">
        <link rel="stylesheet" href="/static/css/index.css">`
    });
})

router.use(userRouter);
router.use(searchRouter);
router.use(establishmentRouter);

router.post('/login', function (req, res) {
    res.redirect("/");
})

router.post('/register', function (req, res) {
    res.redirect("/");
})

router.post('/comment', function (req, res) {
    res.redirect("/");
})

router.post('/:establishmentid', function (req, res) {
    console.log(req.params.establishmentid);
    res.redirect("/");
})

router.patch('/',async (req,res) => {
  let {reviewId, userID, updateH } = req.body;
  let __iod = new ObjectId(reviewId);
  
  switch (updateH) {
    case "up":
      reviews_db.updateOne(
        {_id: __iod}, 
        {$push:{likes: userID},
        $pull:{dislikes: userID},
      }); break;
    case "up_":
      reviews_db.updateOne(
        {_id: __iod}, 
        {$pull:{likes: userID},
      }); break;
    case "down":
      reviews_db.updateOne(
        {_id: __iod}, 
        {$pull:{likes: userID},
        $push:{dislikes: userID},
      }); break;
    case "down_":
      reviews_db.updateOne(
        {_id: __iod}, 
        {$pull:{dislikes: userID},
      }); break;
  }
})


router.use((req,res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title> 404 | ArcherEats</title>
  </head>
  <body>
    <h1>for oh for | resource aint found! </h1>
  </body>
  </html>
  `)
})

export default router;

/*
index
css:'<link rel="stylesheet" href="/static/css/index.css">',
js: '<script src="static/js/card-view.js" defer></script>'

estab
css:'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">',
js: '<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>'

user
css:'<link href="/static/css/user-profile.css" rel="stylesheet">',
js: '<script defer src="/static/js/user-profile.js"></script>

search
css:'<link href="/static/css/search-result.css" rel="stylesheet">',
js :'<script defer src="/static/js/search-result.js"></script>'
*/