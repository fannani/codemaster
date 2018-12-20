import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
const { ObjectId } = mongoose.Types;
import path from 'path';
import passport from 'passport';
import './config/passport';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import routes from './routes';

var compiler = webpack(webpackConfig);
let port = 3000;
mongoose.connect("mongodb://localhost/belajarkode", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
ObjectId.prototype.valueOf = function() {
    return this.toString();
};
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(routes);

app.listen(port);

