const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String,
    password: String
  }

  type Drug {
    _id: ID
    name: String,
    drug_name: String,
    dosage: Number,
    image: String,
    frequency: Number
  }

  type Mutation {
    addDrug(name: String!, drug_name: String!, dosage: Number!, frequency: Number!): Drug
    
    removeDrug(drugId: ID!): Drug
    
  }
`;

module.exports = typeDefs;