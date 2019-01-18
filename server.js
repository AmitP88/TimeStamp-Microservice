// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/* ======================================================== */
// enable the use of momentJS
var moment = require('moment');
moment().format();

app.get("/api/timestamp/:date_string?", function(req, res){
  // Parse a date, initialize a moment object
  let date = moment(req.params.date_string);
  
  if(date.isValid()){
     res.json(
       {
         // Unix Timestamp (milliseconds)
         "unix":date.valueOf(),
         // Universal Time Coordinated (example format: Sun, 20 Nov 2016 17:31:29 GMT)
         "utc":date.format('ddd, DD MMM Y HH:mm:ss [GMT]')
       }
     );
  } else if(req.params.date_string === " ") {
     // set date variable to current date by calling moment with no arguments
     date = moment();
    
     res.json(
       {
         // Unix Timestamp (milliseconds) of current date
         "unix":date.valueOf(),
         // Universal Time Coordinated (example format: Sun, 20 Nov 2016 17:31:29 GMT) of current date
         "utc":date.format('ddd, DD MMM Y HH:mm:ss [GMT]')
       }
     );
  } else if(date.isValid() === false){
     res.json(
       {
         // date variable will return null since req.params.date_string is an invalid date
         "unix":date,
         "utc":"Invalid Date"
       }
     );
  }
});
/* ======================================================== */
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});