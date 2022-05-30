// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    drugs: [Drug]
  }

  type Drug {
    _id: ID
    drug_name: String
    createdAt: String
    username: String
    dosage: Int
    freq: Int
    reactions: [Reason]
  }

  type Reason {
    _id: ID
    reason: String
    createdAt: String
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
    addDrug(drug_name: String!, dosage: String!, freq: String!): Drug
    addReaction(drugId: ID!, reason: String!): Drug
  }

  type Auth {
    token: ID!
    user: User
  }

`;

// export the typeDefs
module.exports = typeDefs;