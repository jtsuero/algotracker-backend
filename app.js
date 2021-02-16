const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
      type RootQuery {
        algos: [String!]
      }

      type RootMutation {
        createAlgo(name: String): String
      }

      schema{
        query: RootQuery
        mutation: RootMutation
      }
      `),
    rootValue: {
      algos: () => {
        return ['test'];
      },
      createAlgo: args => {
        const algoName = args.name;
        return algoName;
      },
    },
    graphiql: true,
  }),
);

app.listen(PORT);
