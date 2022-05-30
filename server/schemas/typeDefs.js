// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// drug is a custom data type
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    drugs: [Drug]
  }

  type Drug {
    _id: ID
    drugText: String
    dosage: String
    freq: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    drugs(username: String): [Drug]
    drug(_id: ID!): Drug
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addDrug(drugText: String!, dosage: String!, freq:String!): Drug
  }

  type Auth {
    token: ID!
    user: User
  }

`;

// export the typeDefs
module.exports = typeDefs;