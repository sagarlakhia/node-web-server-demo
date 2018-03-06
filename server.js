const express =require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname +'/views/partials');

app.set('view engine', 'hbs');

//Get info from the request
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err) {
            console.log('Unable to write to log file');
        }
    });
    next();
});
//Not needed
// app.use((req,res, next) => {
//     res.render('maintenance');
// });
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('Hello Express');
    res.render('home.hbs', {
        pageTitle:'Home Page',
        welcomeMessage: "welcome to my website"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage:'Unable to fulfill this message'
    })
})
app.listen(3000, () => {
    console.log('Server is up and running');
    
});