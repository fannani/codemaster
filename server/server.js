import express  from 'express'
import path from 'path';
import connectHistoryApiFallback from 'connect-history-api-fallback'
import { buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';

const app = express();
const port = 3000

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var root = { hello: () => 'Hello world!' };


app.use('/', connectHistoryApiFallback());
app.use('/',express.static(path.join(__dirname,"..",'build')));
app.use('/',express.static(path.join(__dirname,"..",'static')));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))