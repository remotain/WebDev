var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

var app = express();

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Mongoose configuration
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to mongo db
mongoose.connect("mongodb://localhost/blog_app");

// Mongoose model configuration
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create(
//     {
//         title: "La ragazza sull'autobus", 
//         body: "L’autobus è affollato di impiegati che tornano a casa dopo una lunga, e per molti noiosa, giornata di lavoro. La ragazza con la sciarpa color senape è in piedi e si tiene stretta all’asta di sostegno ma non sembra far caso alla folla. Io sono seduto a qualche sedile di distanza e non posso fare a meno di osservarla. Non sono attirato dal suo aspetto fisico, che ad ogni modo è nascosto dal pesante cappotto e dalla sciarpa che la copre fino al mento, ma da alcuni gesti impercettibili che suggeriscono impazienza e preoccupazione. Gli occhi sembrano fissare la città che scorre fuori dal finestrino senza fermarsi su alcun dettaglio. La mano destra stringe l’asta di sostegno con una forza tale da rendere evidenti i tendini anche dalla distanza da cui mi trovo, mentre la mano sinistra aggiusta in maniera quasi compulsiva la borsa che porta sulla spalla. Ad un certo punto il capo si anima con decisione, come percorso da una corrente elettrica e ruota di scatto verso il monitor che indica le fermate successive. La mano sinistra lascia per la prima volta la tracolla della borsa per prendere il telefono dalla tasca del cappotto. Per un attimo guarda lo schermo, sospira scuotendo la testa in maniera che da lontano mi sembra sconsolato, poi il pollice inizia a muoversi rapidamente sullo schermo, forse per rispondere ad un messaggio. Intanto l’autobus si ferma, siamo in periferia ormai, poca gente sale da queste parti ma ancora pochi scendono. Quando ormai le porte stanno per chiudersi, la ragazza con lo sguardo ancora fisso sul telefono e il pollice che continua a muoversi si accorge che quella è la sua fermata. Immediatamente si sposta verso la porta tenendo il telefono in mano e la mano sulla tracolla della borsa. Si fa strada rapidamente con il braccio destro, forzando il passaggio attraverso le persone che la separano dall'uscita. Scende per un soffio, mentre le porte si chiudono dopo il suo passaggio. Io la osservo dal finestrino mentre si allontana a passo svelto, come se dovesse correre ma non ne avesse voglia."
//     }, (err, camp) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log(camp);
//         }
//     });

// Routes

// INDEX
app.get("/", (req,res) => {
    res.redirect("/blogs");
});

// INDEX
app.get("/blogs", (req,res) => {

    Blog.find({}, (err,blogs) => {
        if(err){
            console.log(err);
        } else {
            res.render("blogs", {blogs : blogs});
        }
    })
});

// NEW
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE
app.post("/blogs", (req, res) => {

    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.create(req.body.blog, (err, blog) =>{
        if(err){
            console.log(err);
            res.redirect("/blogs/new");
        } else {
            res.redirect("/blogs");
        }
    })

});

// SHOW
app.get("/blogs/:id", (req, res)  =>{

    Blog.findById(req.params.id, (err, blog)=> {
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: blog});
        }
    });

});

// EDIT
app.get("/blogs/:id/edit", (req, res) => {

    Blog.findById(req.params.id, (err, blog)=> {
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: blog});
        }
    });

});

//UPDATE
app.put("/blogs/:id", (req, res) =>{

    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, post) => {
        if(err){
            console.log(err);
            res.redirect("/blogs/");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE
app.delete("/blogs/:id", (req, res) => {

    Blog.findByIdAndDelete(req.params.id, (err) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
    
});

app.listen(3000, "localhost", () =>{
    console.log("Listening...");
})