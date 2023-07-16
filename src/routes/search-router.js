import { Router } from 'express';
import { getDb } from '../model/conn.js';

const searchRouter = Router();
const db = getDb();
const establishments = db.collection("establishments");
const reviews = db.collection("reviews");

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
                localField: "user-id",
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

export default searchRouter;