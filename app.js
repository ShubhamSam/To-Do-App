const express = require("express");
const bodyParser = require("body-parser");
const day = require(__dirname + "/date.js")


const app = express();
let items = [];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render('index', {
        heading: day.getDate(),
        listItems: items
    })
})

app.post('/', (req, res) => {
    let item = req.body.addItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect('/work')
    } else {
        items.push(item);
        res.redirect('/');

    }
    // console.log(req.body);
    // console.log(item);
});

app.get("/work", (req, res) => {
    res.render("index", {
        heading: "Work List",
        listItems: workItems
    })
})

app.post('/work', (req, res) => {
    let item = req.body.addItem;
    workItems.push(item);
    res.redirect('/work')

})

app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(process.env.PORT || 80, () => {
    console.log("Running on port 80");
})