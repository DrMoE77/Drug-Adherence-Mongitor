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

  type Query {
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
  }

  type Mutation {
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
