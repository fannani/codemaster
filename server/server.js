import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import graphqlHTTP from 'express-graphql';
import schema from './data/schema'
import path from 'path';
let port = 3000;

mongoose.connect("mongodb://localhost/belajarkode", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
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


