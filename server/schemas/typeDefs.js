// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// thought is a custom data type
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    drugs: [Drug]
  }

  type Drug {
    _id: ID
    name: String
    createdAt: String
    drug_name: String
    dosage: Int
    frequency: Int
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    drugs(username: String): [Drug]
    drug(_id: ID!): Drug
  }

  type Mutation {
    login(email: String!, password: String!): Authentication
    addUser(username: String!, email: String!, password: String!): Authentication
    addDrug(name: String!, drug_name: String!, dosage:Int!, frequency:Int!): Drug
  }

  type Authentication {
    token: ID!
    user: User
  }

`;

// export the typeDefs
module.exports = typeDefs;