import { Router } from 'express'
import searchRouter from './search-router.js';

const router = Router();

router.get("/", function(req, res) {
    res.render("index", {
        title: "Home"
    });
})

router.use(searchRouter);

router.get("/users/:userid", function(req, res) {
    console.log(req.params.userid);
    res.render("___jstn", {
        title: "User profile"
    });
})

router.get("/:establishmentid", function(req, res) {
    console.log(req.params.establishmentid);
    res.render("establishment-view", {
        title: "Establishment view"
    })
})

router.post('/login', function(req, res) {
    res.redirect("/");
})

router.post('/register', function(req, res) {
    res.redirect("/");
})

router.post('/comment', function(req, res) {
    res.redirect("/");
})

router.post('/:establishmentid', function(req, res) {
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