const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const app = express();

//Dummy Data

const teams = [
  { id: 1, name: "Front End" },
  { id: 2, name: "Back End" },
  { id: 3, name: "Design" },
  { id: 4, name: "Testing" },
];

const members = [
  { id: 1, name: "Sankeerth Reddy", teamId: 1 },
  { id: 2, name: "John Doe", teamId: 1 },
  { id: 3, name: "Sansa Stark", teamId: 1 },
  { id: 4, name: "Vince Carter", teamId: 2 },
  { id: 5, name: "Jon Snow", teamId: 2 },
  { id: 6, name: "Kahl Drogo", teamId: 2 },
  { id: 7, name: "Aiden Jackson", teamId: 2 },
  { id: 8, name: "Casper Ackerman", teamId: 3 },
  { id: 9, name: "Devon Buttler", teamId: 3 },
  { id: 10, name: "Joe Root", teamId: 3 },
  { id: 11, name: "Moeen Ali", teamId: 4 },
  { id: 12, name: "Karl Malone", teamId: 4 },
];

const schema = new GraphQLSchema({
  //query: RootQuery,
  //mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server Running"));
