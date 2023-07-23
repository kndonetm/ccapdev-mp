import { ObjectId } from "mongodb"

import { Router } from 'express'
import multer from 'multer';
import searchRouter from './search-router.js';
import userRouter from './user-router.js';
import establishmentRouter from "./establishment-router.js";
import loginRegisterRouter from "./login-register-router.js";

import { getDb } from '../model/conn.js';

const router = Router();
const db = getDb();
const establishments_db = db.collection("establishments");
const users_db = db.collection("users");
const reviews_db = db.collection("reviews");
const comments_db = db.collection("comments");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets/reviewPics/')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname)
    },
  })
const upload = multer({ storage: storage })

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
router.use(loginRegisterRouter);

router.post('/', upload.array('mediaInput'), async function (req, res) {
    console.log(req.files);
    const {estabID, title, rate, content, revID, parent} = req.body;
    let imageURls = []
    let videoUrls = []
    for (let files of req.files) {
      let type = files.mimetype;
      console.log(type)
      if (type.split('/')[0] == "image")
      imageURls.push("/static/assets/reviewPics/"  + files.filename)
      else
      videoUrls.push("/static/assets/reviewPics/"  + files.filename)
  }
    let sampleUSer = "64aed2a8f586db31f5a01230"
    if (title && rate && content) {
        const newReview = {
            title: title,
            rating: rate,
            content: content,
            likes: [],
            dislikes: [],
            edited: false,
            images: imageURls,
            videos: videoUrls,
            datePosted: new Date (),
            estabResponse: [],
            establishmentId: new ObjectId(estabID),
            userId: new ObjectId(sampleUSer),
        };
        reviews_db.insertOne(newReview);
        // res.sendStatus(200);
        res.status(200);
    } else if ( revID && parent && content){
      const newReply = {
        content: content,
        likes: 0,
        dislikes: 0,
        datePosted: new Date (),
        userId: new ObjectId(sampleUSer),
        parent: new ObjectId(parent),
        reviewId: new ObjectId(revID),
        edited: false,
    };
    comments_db.push(newReply);
    // res.sendStatus(200);
    res.status(200);
    } else {
        // res.sendStatus(400);
        res.status(400);

    }
})


router.post('/comment', function (req, res) {
  res.redirect("/");
})


router.patch('/', async (req,res) => {
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