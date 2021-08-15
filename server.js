var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
var multer = require('multer');
var timeout = require('connect-timeout');
var fs = require('fs'),
    http = require('http'),
    https = require('https');
	
const fileUpload = require('express-fileupload');
//var upload = multer({ dest: './uploads' });
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './www/uploads');
    },
	
    filename: function (req, file, callback) {
				console.log('img-' + Date.now()+'.png');
        callback(null, 'img-' + Date.now()+file.originalname.replace(/ /g, "_"));
    }
});

var upload = multer({
    storage: storage
});

var app = express();
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb'}));
app.use(morgan('dev'));

app.use(timeout('1s'))
app.use(haltOnTimedout)

function haltOnTimedout(req,res,next)
{
	if(!req.timedout)
		next()
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('tokenSecret', 'secr3t');
app.use(express.static(path.join(__dirname, './www')));

app.get('/', function (req, res) {
    res.send('Hello! The API is up and running');
});
connection.init();
routes.configure(app);

const hostname = 'threesainfoway.net';

 const cert = fs.readFileSync('../../etc/letsencrypt/live/threesainfoway.net/cert.pem');
const ca = fs.readFileSync('../../etc/letsencrypt/live/threesainfoway.net/chain.pem');
const key = fs.readFileSync('../../etc/letsencrypt/live/threesainfoway.net/privkey.pem');


let httpsOptions = {
    cert: cert, // fs.readFileSync('./ssl/example.crt');
    ca: ca, // fs.readFileSync('./ssl/example.ca-bundle');
    key: key // fs.readFileSync('./ssl/example.key');
 };


// let httpsOptions = {};

 const httpServer = http.createServer((req, res) => {
    res.statusCode = 301;
    res.setHeader('Location', `https://${hostname}${req.url}`);
    res.end(); // make sure to call send() or end() to send the response
 });

 const httpsServer = https.createServer(httpsOptions, app);
 

 app.use((req, res, next) => {
    if(req.protocol === 'http') {
      res.redirect(301, 'https://threesainfoway.net');
    }
    next();
 });

 // Your app code here
 
 

//  console.log('Server listening on port ' + JSON.stringify(httpsServer));

/*  var server = app.listen(80, function () {
    console.log('Server listening on port ' + server.address().port);
});   */





httpServer.listen(80);
httpsServer.listen(443, hostname)
 