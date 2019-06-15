const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
    getName(firstName: String): String
  }
`);

const root = {
    hello: (args) => {
        console.log(args);
        return "hello";
    },
    getName: (args) => {
        return args.firstName;
    }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: root
}));

app.listen(4000);
