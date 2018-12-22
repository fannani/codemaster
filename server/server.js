import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import passport from 'passport';
import './config/passport';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import routes from './routes';
import schema from './data/schema';

const { ObjectId } = mongoose.Types;
var compiler = webpack(webpackConfig);
let port = 3000;
mongoose.connect(
  'mongodb://localhost/belajarkode',
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
const apollo = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req.user,
  }),
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  }
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
  path: '/api'
});
app.use('/api', (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (user) {
        req.user = user;
      }
      next();
    })(req, res, next);
  });
});
app.use(routes);

app.listen(port);
