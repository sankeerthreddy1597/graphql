const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const app = express();

const schema = new GraphQLSchema({});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server Running"));
