// example.js
import express from 'express';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import graphqlHTTP from 'express-graphql';
import schema from './data/schema'
import path from 'path';
let port = 3000;


mongoose.connect("mongodb://localhost/belajarkode", { useNewUrlParser: true });

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));



const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/api', graphqlHTTP({
    schema: schema,

    graphiql: true //Set to false if you don't want graphiql enabled
}));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../dist/index.html'));
});



mongoose.Promise = global.Promise;


app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);


