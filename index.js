express = require('express');
exphbs = require('express-handlebars');

const port = 3000;

const app = express();

app.use("/static", express.static("public"));

app.engine("hbs", exphbs.engine({ 
    extname: "hbs",
}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", function(req, res) {
    res.render("index", {
        title: "Home"
    })
})




app.listen(port, function() {
    console.log("Console now listening on port " + port);
});

