import { Router } from 'express';

const searchRouter = Router();

searchRouter.get("/search", (req, res) => {
    res.render("search", {
        title: req.query.q + " - Search Results",
        css: '<link href="static/css/stylesheet.css" rel="stylesheet">' +
             '<link href="static/css/search-result.css" rel="stylesheet">',
        js: '<script src="static/js/attach-pfp.js" defer></script>' +
            '<script src="static/js/navbar.js" defer></script>' +
            '<script defer src="../js/search-result.js"></script>' +
            '<script src="static/js/authentication.js" defer></script>' +
            '<script defer src="../js/establishments.js"></script>',
        key: req.query.q
    })
});

export default searchRouter;