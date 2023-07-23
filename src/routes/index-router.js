import { ObjectId } from "mongodb"

import { Router } from 'express'
import multer from 'multer';
import searchRouter from './search-router.js';
import userRouter from './user-router.js';
import establishmentRouter from "./establishment-router.js";
import loginRegisterRouter from "./login-register-router.js";

import { getDb } from '../model/conn.js';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
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
      cb(null, Date.now() + "_" + file.originalname)
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

router.route('/review')
  .post(upload.array('mediaInput'), async function (req, res) {
    console.log(req.files);
    const {estabID, title, rate, content} = req.body;
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
    let sampleUSer = "64aed2aff586db31f5a01231"
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
        res.send("done review")
    }  else {
        res.status(400);
    }
}) 
  .patch(upload.array('mediaInput'), async function (req, res) {
  const {estabID, title, rate, content, userID} = req.body;

  let imageURls = []
  let videoUrls = []
  for (let files of req.files) {
    let type = files.mimetype;

    if (type.split('/')[0] == "image")
    imageURls.push("/static/assets/reviewPics/"  + files.filename)
    else
    videoUrls.push("/static/assets/reviewPics/"  + files.filename)
  }
  let review = await reviews_db.findOne({establishmentId: new ObjectId(estabID), userId: new ObjectId(userID)
  });

  if (review != null) {
  for (let img of review.images)
    fs.unlink(__dirname + "../../../public" + img.substring(7), (err) => {
      if (err)  console.error('Error deleting file:', err);
    })
 for (let vid of review.videos)
    fs.unlink(__dirname + "../../../public" + vid.substring(7), (err) => {
      if (err) console.error('Error deleting file:', err);
    })
  }

  reviews_db.updateOne(
      {establishmentId: new ObjectId(estabID),
        userId: new ObjectId(userID)
      },
      {$set:{
          title: title,
          rating: rate,
          content: content,
          edited: true,
          images: imageURls,
          videos: videoUrls,
      }})
      res.status(200)
      res.send('done edit')
}) 
.delete( async function (req, res) {
  let {reviewId} = req.body
  let __iod = new ObjectId(reviewId);
 let review = await reviews_db.findOne({_id: __iod});

  if (review != null) {
  for (let img of review.images)
    fs.unlink(__dirname + "../../../public" + img.substring(7), (err) => {
      if (err)  console.error('Error deleting file:', err);
    })
 for (let vid of review.videos)
    fs.unlink(__dirname + "../../../public" + vid.substring(7), (err) => {
      if (err) console.error('Error deleting file:', err);
    })
  }

  reviews_db.deleteOne( { _id: __iod } )
  res.status(200)
  res.send("review Deleted")
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
  }s
  res.status(200)
  res.send("done")
})

router.route('/comment')
  .post(async function (req, res) {
    const {revID, userID, parID, text} = req.body;

    if (revID && userID && parID && text ) {
        const newComment = {
            content: text,
            likes: [],
            dislikes: [],
            comments: [],
            datePosted: new Date (),
            userId: revID,
            parent: parID,
            reviewId: revID,
            edited: false,
        };
        comments_db.insertOne(newComment);
        // res.sendStatus(200);
        res.status(200);
        res.send("done comment")
    }  else {
        res.status(400);
    }
  })
  .patch(async function (req, res) {
    const {commID, text} = req.body;
    comments_db.updateOne(
      {_id: new ObjectId(commID)}, 
      {$set: { 
        content: text, 
        edited: true }
  })
    res.status(200);
        res.send("esited comment")
})
.delete(async function (req, res) {
  const {commID, text} = req.body;
    comments_db.deleteOne( {_id: new ObjectId(commID)} )
    res.status(200);
    res.send("deleted comment")
})

router.route('/estabRespo')
  .post(async function (req, res) {
    const {revID, text} = req.body;

    if (revID && text ) {
        const newEstabRespo = {
            content: text,
            likes: [],
            dislikes: [],
            comments: [],
            edited: false,
            datePosted: new Date ()
        };
        reviews_db.updateOne(
          {_id: new ObjectId(revID)}, 
          {$push:{estabResponse: newEstabRespo},
        });
        // res.sendStatus(200);
        res.status(200);
        res.send("done estab respo")
    }  else {
        res.status(400);
    }
  })
  .patch(async function (req, res) {
    const {revID, text} = req.body;
    reviews_db.updateOne(
      {_id: new ObjectId(revID)}, 
      {$set: { "estabResponse.$.content": text, "estabResponse.$.edited": true }
  })
    res.status(200);
        res.send("esited estab respo")
})
.delete(async function (req, res) {
  const {revID, text} = req.body;
    reviews_db.updateOne(
      {_id: new ObjectId(revID)}, 
      {$set: { "estabResponse": [] }
  })
    res.status(200);
        res.send("deleted estab respo")
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