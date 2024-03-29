import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import webpack from 'webpack';
import path from 'path';
import passport from 'passport';
import webpackConfig from '../webpack.dev';
import routes from './routes';
import schema from './data/schema';
import './config/passport';
import * as admin from 'firebase-admin';
const serviceAccount = require('../firebasekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'kodekurawal-ab777.appspot.com',
});
dotenv.config({ path: path.join(__dirname, '../.env') });
const { ObjectId } = mongoose.Types;
const compiler = webpack(webpackConfig);

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true },
);
mongoose.Promise = global.Promise;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
const server = http.createServer(app);
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

if (process.env.MODE === 'development') {
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  app.use(require('webpack-hot-middleware')(compiler));
}

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

server.listen(process.env.PORT);
