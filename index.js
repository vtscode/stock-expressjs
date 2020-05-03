// stock market portfolio from riventus

const express = require('express');
const request = require('request');
const exphbs  = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
// const dotenv = require('dotenv');
// dotenv.config();
// console.log(dotenv.config());
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended:false}));

// API Key pk_9947e79595994364a927215a26c20f96
// create call_api function
function call_api(finishedAPI,ticker='fb'){
    request(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_9947e79595994364a927215a26c20f96`,{json:true},(err,res,body) => {
        if(err) {
            return console.log(err);
        }
        if(res.statusCode === 200){
            finishedAPI(body);
        }
    });
}



// set handlebars middleware
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

const otherstuf = "halo there, this is other stuff";

// set handlebars index GET routes
app.get('/',(req,res)=>{
    call_api(doneAPI => {
        res.render('home',{
            stock:doneAPI
        });
    });
});

// set handlebars index POST route
app.post('/',(req,res)=>{
    call_api(doneAPI => {
        // posted_stuff = req.body.stock_ticker;
        res.render('home',{
            stock:doneAPI
        });
    },req.body.stock_ticker);
});

// create about page route
app.get('/about',(req,res)=>{
    res.render('about',{
        stuff:otherstuf
    });
});

// set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
