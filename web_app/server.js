//setup Dependencies
var connect = require('connect'), 
  express = require('express'), 
  // io = require('socket.io'), 
  port = (process.env.PORT || 8081),
  http = require('http'),
  querystring = require('querystring'),
  request = require('request');


// Setup Express
var server = express.createServer();
server.configure(function(){
  server.set('views', __dirname + '/views');
  server.set('view options', { layout: false });
  server.use(connect.bodyParser());
  server.use(express.cookieParser());
  server.use(express.session({ secret: "shhhhhhhhh!"}));
  server.use(connect.static(__dirname + '/static'));
  server.use(server.router);
});

// //setup the errors
// server.error(function(err, req, res, next){
//   console.log(err);
//     if (err instanceof NotFound) {
//       res.render('404.jade', { 
//         locals: { 
//           title : '404 - Not Found',
//           description: '',
//           author: '',
//           analyticssiteid: 'XXXXXXX' 
//         }, status: 404 
//       });
//     } 
//     else {
//       res.render('500.jade', { 
//         locals: { 
//           title : 'The Server Encountered an Error',
//           description: '',
//           author: '',
//           analyticssiteid: 'XXXXXXX',
//           error: err 
//         }, status: 500 
//       });
//     }
// });

// //Setup Socket.IO
// var io = io.listen(server);
// io.sockets.on('connection', function(socket){
//   console.log('Client Connected');
//   socket.on('message', function(data){
//     socket.broadcast.emit('server_message',data);
//     socket.emit('server_message',data);
//   });
//   socket.on('disconnect', function(){
//     console.log('Client Disconnected.');
//   });
// });


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

server.get('/', function(req,res){
  res.render('index.jade', {
    locals : { 
        title : 'Your Page Title',
        description: 'Your Page Description',  
        author: 'Your Name',  
        analyticssiteid: 'XXXXXXX' 
      }
  });
});

//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

server.get('/auth', function (req, res) {
  // REQUEST TOKEN
  res.redirect("https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=tIiffvT3IrUMF8C1AOeJgw&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Foauth2%2Fcallback&scope=view_profile&state=csrf_code1234");
});

server.get('/success', function(req, res){
  res.render('success.jade', {locals : { 
    title : 'Your Page Title',
    description: 'Your Page Description',  
    author: 'Your Name',  
    analyticssiteid: 'XXXXXXX' 
  }});
});

server.on('uncaughtException',function(request, response, route, error){
  console.error(error.stack);
  response.send(error);
});

server.get('/oauth2/callback', function (req, res) {
  // code, state, error
  var params = queryString(req);

  var code = params.code;
  var state = params.code || "";
  if(params.error)
    console.error('Token request failed with error');

  request.post({
    url: 'https://accounts.coursera.org/oauth2/v1/token', 
    form: { 
      'code' : code,
      'client_id': 'tIiffvT3IrUMF8C1AOeJgw',
      'client_secret': 'NhzwbCucSgxhCykXzpZmqQ',
      'redirect_uri': 'http://localhost:8081/oauth2/callback',
      'grant_type': code 
    } 
  },
  function (error, response, body) {
    if(error)
      console.log(JSON.stringify(error));
    if (!error && response.statusCode == 200) {
        console.log('shit');
        console.log(body);
    }
  });

  res.render('success.jade', {
    locals : { 
        title : 'Your Page Title',
        description: 'Your Page Description',  
        author: 'Your Name',  
        analyticssiteid: 'XXXXXXX' 
      }
  });

});

// parses the current url + returns an object fo parameters + values.
function queryString(req) {
  var query_string = {};
  var query = req.url;
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}

function NotFound(msg){
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
  throw new NotFound;
});

server.listen(port);
 
console.log('Listening on http://0.0.0.0:' + port );
