import { ObjectId } from 'mongodb';
import { Router } from 'express';
import { getDb } from '../model/conn.js';

const userRouter = Router();
const db = getDb();
const users = db.collection("users");
const reviews = db.collection("reviews");

userRouter.get("/users/:userid", async (req, res) => {
    // get user from users collection
    let id = new ObjectId(req.params.userid);

    const user = await users.findOne({
        _id: id,
    });

    // get reviews by user from reviews collection
    const reviewsArray = await reviews.find({
        userId: id,
    }).toArray();

    // add values needed in view to review object
    reviewsArray.forEach((review) => {
        // get post age
        let currentDate = new Date();
        review.age = Math.ceil(Math.abs(currentDate - review.datePosted) / (1000 * 60 * 60 * 24));

        if(review.edited) review.editedTag = "edited";

        review.commentNum = review.comments.length;
        review.likesNum = review.likes.length;
        review.dislikesNum = review.dislikes.length;
    });

    res.render("user", {
        title: user.username + " - Profile",
        css:'<link href="/static/css/user-profile.css" rel="stylesheet">',
        js: '<script defer src="/static/js/user-profile.js"></script>',
        profilePicture: user.profilePicture,
        username: user.username,
        description: user.description,
        reviews: reviewsArray
    })
})
/*
searchRouter.get("/search", async (req, res) => {
    const estabQueryPipe = {
        $or: [
            { "displayed-name": { $regex: new RegExp(req.query.q, "i") } },
            { description: { $regex: new RegExp(req.query.q, "i") } }
        ]
    };

    if(req.query.filter) {
        let ratingFloor = Math.floor(req.query.filter);
        estabQueryPipe.$and = [ { rating: { $gt: ratingFloor, $lt: ratingFloor + 1 } } ]
    }

    const reviewQueryPipe = [
        {
            $match: {
                $or: [
                    { title: { $regex: new RegExp(req.query.q, "i") } },
                    { content: { $regex: new RegExp(req.query.q, "i") } }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" }
    ];

    const establishmentsArray = await establishments.find(estabQueryPipe).toArray();
    const reviewsArray = await reviews.aggregate(reviewQueryPipe).toArray();

    res.render("search", {
        title: req.query.q + " - Search Results",
        css:'<link href="static/css/search-result.css" rel="stylesheet">',
        js: '<script defer src="static/js/search-result.js"></script>',
        key: req.query.q,
        establishments: establishmentsArray,
        reviews: reviewsArray
    })
});
*/
export default userRouter;