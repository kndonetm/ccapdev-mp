import { Router } from 'express';

const establishmentRouter = Router();

establishmentRouter.get("/", (req, res) => {
    res.render("index", {
        title: "ArcherEats",
        css: "<link rel='stylesheet' href='../css/index.css'></link>",
        js: '<script src="../js/attach-pfp.js" defer></script>' +
            '<script src="../js/navbar.js" defer></script>' +
            '<script src="../js/establishments.js" defer></script>' +
            '<script src="../js/card-view.js" defer></script>' +
            '<script src="../js/authentication.js" defer></script>'
    })
});

export default establishmentRouter;