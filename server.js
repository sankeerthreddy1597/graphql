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

//Defining Member Object type
const memberType = new GraphQLObjectType({
  name: "Member",
  description: "Represents member details object",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    teamId: { type: GraphQLNonNull(GraphQLInt) },
    team: {
      type: teamType,
      resolve: (member) => teams.find((team) => team.id === member.teamId),
    },
  }),
});

//Defining Team Object type
const teamType = new GraphQLObjectType({
  name: "Team",
  description: "Represents team details object",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    members: {
      type: new GraphQLList(memberType),
      resolve: (team) => members.filter((member) => member.teamId === team.id),
    },
  }),
});

//Defining Root Query
const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    member: {
      type: memberType,
      description: "A single member",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => members.find((member) => member.id === args.id),
    },
    members: {
      type: new GraphQLList(memberType),
      description: "List of all members",
      resolve: () => members,
    },
    team: {
      type: teamType,
      description: "A single team",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => teams.find((team) => team.id === args.id),
    },
    teams: {
      type: new GraphQLList(teamType),
      description: "List of all teams",
      resolve: () => teams,
    },
  }),
});

//Defining mutations
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addMember: {
      type: memberType,
      description: "Add a member",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        teamId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => {
        const member = {
          id: members.length + 1,
          name: args.name,
          teamId: args.teamId,
        };
        members.push(member);
        return member;
      },
    },
    addTeam: {
      type: teamType,
      description: "Add a team",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const team = { id: teams.length + 1, name: args.name };
        teams.push(team);
        return team;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server Running"));
