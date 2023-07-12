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