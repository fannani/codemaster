import express from 'express';
import http from 'http';
import socket from 'socket.io';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import passport from 'passport';
import webpackConfig from '../webpack.dev';
import routes from './routes';
import schema from './data/schema';
import './config/passport';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';

dotenv.config();
const { ObjectId } = mongoose.Types;
var compiler = webpack(webpackConfig);
let port = 3000;

mongoose.connect(
  process.env.BASE_URL,
  { useNewUrlParser: true },
);
mongoose.Promise = global.Promise;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
const server = http.createServer(app);
const io = socket(server);
const apollo = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req.user,
  }),
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
});

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }),
);
app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.resolve(__dirname, '../dist')));
apollo.applyMiddleware({
  app,
  path: '/api',
});
app.use('/api', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
});

app.use(routes);


io.on('connection', (socket) => {
  socket.on('TESAPI', function(msg){
    console.log('message: ' + msg);
  });
});

server.listen(port);
