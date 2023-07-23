import { ObjectId } from 'mongodb';
import { Router } from 'express';
import { getDb } from '../model/conn.js';

const userRouter = Router();
const db = getDb();
const users = db.collection("users");
const reviews = db.collection("reviews");
const comments = db.collection("comments");

userRouter.get("/users/:username", async (req, res, next) => {
    try {
        // get user from users collection
        const user = await users.findOne({
            username: req.params.username,
        });
        if (user == null) next();
        let id = new ObjectId(user._id);
        
    // get reviews by user from reviews collection
    const reviewsArray = await reviews.find({
        userId: id,
    }).toArray();

    // add values needed in view to review object
    reviewsArray.forEach(async (review) => {
        // get post age
        let currentDate = new Date();
        review.age = Math.ceil(Math.abs(currentDate - review.datePosted) / (1000 * 60 * 60 * 24));

        if(review.edited) review.editedTag = "edited";

        // get all the comments of the review (slow)
        const commentArray = await comments.find({
            reviewId: review._id,
        }).toArray();

        review.commentNum = commentArray.length;
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
} catch (err) {
    console.log(err)
}
})

export default userRouter;