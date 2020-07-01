var express = require('./node_modules/express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.use('/api/todos', todoRoutes)

// process.env.PORT
app.listen(port, () => {
    console.log("App is running on port " + port);
}); 