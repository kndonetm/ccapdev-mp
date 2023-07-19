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

export default userRouter;