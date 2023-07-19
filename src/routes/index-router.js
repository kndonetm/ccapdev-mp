import { ObjectId } from "mongodb"

import { Router } from 'express'
import searchRouter from './search-router.js';
import userRouter from './user-router.js';

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
        establishments: establishments
    });
})

router.use(userRouter);
router.use(searchRouter);

router.get("/:establishmentid", async function (req, res) {
    const oid = new ObjectId(req.params.establishmentid);

    const establishments = await establishments_db.find({}).toArray();
    const selectedEstab = await establishments_db.find({ _id: oid }).toArray();
    const reviews = await reviews_db.aggregate([
        { $match: { establishmentId: oid } },
        {
            '$lookup': {
                'from': 'establishments',
                'localField': 'establishmentId',
                'foreignField': '_id',
                'as': 'establishment'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'user'
            }
        }
    ]).toArray();

    for (let review of reviews) {
        // prioritize showing videos over images
        const nTopVideos = Math.min(review.videos.length, 3);
        review.topVideos = review.videos.slice(0, nTopVideos);
        review.truncatedVideos = review.videos.slice(nTopVideos);
        const nTopImages = Math.min(review.images.length, 3 - nTopVideos);
        review.topImages = review.images.slice(0, nTopImages);
        review.truncatedImages = review.images.slice(nTopImages);
        review.nTruncatedMedia = review.truncatedVideos.length + review.truncatedImages.length;
        review.nMedia = review.videos.length + review.images.length;
    }

    const topReviews = reviews.slice(0, 2);
    const truncatedReviews = reviews.slice(2);

    console.log(reviews)

    res.render("establishment-view", {
        title: `${selectedEstab[0].displayedName}`,
        establishments: establishments,
        selectedEstab: selectedEstab[0],
        topReviews: topReviews,
        truncatedReviews: truncatedReviews,
        css: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">'
    })
})

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