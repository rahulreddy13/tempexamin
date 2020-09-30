import express      from 'express'
// import logger       from 'morgan'
import bodyParser   from 'body-parser'
import path         from 'path';
import exphbs       from 'express-handlebars';


import './modules/config/globals'
import './modules/config/mongoose'

import Login    from './routes/index'


const app = express()
app.disable('x-powered-by')
// app.use(logger('dev', { skip: () => app.get('env') === 'test' }))


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, '../public')))

app.all('*', function(req, res,next) {
  /**
   * Response settings
   * @type {Object}
   */
  var responseSettings = {
      "AccessControlAllowOrigin": req.headers.origin,
      "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
      "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
      "AccessControlAllowCredentials": true
  };
  /**
   * Headers
   */
  res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
  res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
  res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
  res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

  if ('OPTIONS' == req.method) {
      res.send(200);
  }
  else {
      next();
  }
});

// Routes

app.use('/', Login)

// RESTful API Error Handler

app.use(function(req, res, next) { var err = new Error('Not Found');err.status = 404;next(err)})

app.use(function(err, req, res, next) {
  if (req.app.get('env') !== 'development') {
      delete err.stack
  }
  res.status(err.statusCode || 500).json(err)
});



export default app;
