/**
 * Virtual Vlad Basic Server
 * Created by jefferson.wu on 05/04/17.
 */

// ========================
// MODULES ================
// ========================
const fs                = require('fs');
const express           = require('express');
const app               = express();
const http              = require('http').Server(app);
const https             = require('https');

const chalk             = require('chalk');
const clear             = require('clear');
const io                = require('socket.io')(http);

// ------------------------
// custom modules ---------
// ------------------------
const gqm = require(process.cwd() + '/models/get_questions_module');

// =========================
// HTTPS ===================
// =========================
const hskey = fs.readFileSync(process.cwd() + '/hacksparrow-key.pem');
const hscert = fs.readFileSync(process.cwd() + '/hacksparrow-cert.pem');

const credentials       = {key: hskey, cert: hscert};
const https_server      = https.createServer(credentials, app);

// =========================
// CONFIGURATION ===========
// =========================

const port              = process.env.PORT || 3443;
var connectedClients    = 0;

//------------------------
//--- enable socket.io ---
io.on('connection', function(socket){
    connectedClients++;
    console.log(chalk.blue(socket.id) + ' connected. Total: ' + connectedClients);
    io.emit('userCount', connectedClients);

    //SOCKET events here.
    socket.on('disconnect', function(){
        connectedClients--;
        console.log(chalk.red(socket.id) + ' disconnected. Total: ' + connectedClients);
        io.emit('userCount', connectedClients);
    });
});




// ====================
// MIDDLEWARE =========
// ====================


// --- basic logger ---
// TODO: switch to Morgan, or encapsulate into module
app.use(function(req,res,next){
    console.log(new Date() + ' ' + req.method + ' ' + req.url + ' ');
    next();
});

// ==================
// ROUTES ===========
// ==================



// TEMP ROUTES
app.get('/', function(req, res){
// res.send('<b>You\'re on an active server.  Find the right page.</b>');
    res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:page', function(req, res){
    res.sendFile(process.cwd() + '/public/' + req.params.page + '.html');
    console.log(chalk.yellow('sending file ' + req.params.page + '.html'));
});


// custom router
var api_router = express.Router();

// api middleware
api_router.use(function(req, res, next) {
    console.log('API Router route hit,');
    next();
});

// api_routes
api_router.get('/get_questions', function(req, res) {
    gqm.get_questions_promise().then(function(data) {
        console.log(data);
        res.json(data);

    }).catch(function(reason){
        console.log(reason);
        res.json(reason);
    });
});


// register router
app.use('/api/', api_router);


// ========================
// CATCH ALL MIDDLEWARE ===
// ========================
//static files
app.use(express.static('public/'));

// 404
app.use(function(req,res,next){
    res.status(404);
    res.send('404: Page not found!');
});

// 500
app.use(function(req,res,next){
    res.status(500);
    res.render('500: Server error!');
});

// ========================
// ===== START SERVER =====
// ========================

// if port is 3443 (String) , HTTPS
if (port === '3443') {
    https_server.listen(port, function(err){
        if(err) {
            console.log(Error('Error: ' + err));
        } else {
            clear();
            console.log(chalk.blue('[SECURE] Virtual Vlad Server on port ' + port));
        }
    });
} else {
    http.listen(port, function(err){
        if(err) {
            console.log(Error('Error: ' + err));
        } else {
            clear();
            console.log(chalk.yellow('[UNSECURE] Virtual Vlad Server on port ' + port));
        }
    });

}