import { Router } from 'express';

const searchRouter = Router();

searchRouter.get("/search", (req, res) => {
    res.render("search", {
        title: req.query.q + " - Search Results",
        css:'<link href="static/css/search-result.css" rel="stylesheet">',
        js: '<script defer src="../js/search-result.js"></script>',
        key: req.query.q
    })
});

export default searchRouter;