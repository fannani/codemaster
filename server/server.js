import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import graphqlHTTP from 'express-graphql';
const { ObjectId } = mongoose.Types;
import schema from './data/schema'
import path from 'path';
let port = 3000;

import Course from './data/models/Course';

mongoose.connect("mongodb://localhost/belajarkode", { useNewUrlParser: true });
mongoose.Promise = global.Promise;


ObjectId.prototype.valueOf = function() {
    return this.toString();
};
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../dist/index.html'));
});

app.listen(port);


let c = new Course({
    name:"haha",
    desc:"bacngs"
});
c.id = c._id;
c.save();