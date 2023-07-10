import { Router } from 'express';
import userRouter from './userRouter.js';
import establishmentRouter from './establishmentRouter.js';
import searchRouter from './searchRouter.js';

const router = Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "ArcherEats",
        css: "<link rel='stylesheet' href='static/css/index.css'></link>",
        js: '<script src="static/js/attach-pfp.js" defer></script>' +
            '<script src="static/js/navbar.js" defer></script>' +
            '<script src="static/js/establishments.js" defer></script>' +
            '<script src="static/js/card-view.js" defer></script>' +
            '<script src="static/js/authentication.js" defer></script>',
    })
});

router.use(establishmentRouter);
router.use(userRouter);
router.use(searchRouter);

router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default router;