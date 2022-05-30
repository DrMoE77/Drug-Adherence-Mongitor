import gql from 'graphql-tag';

// query for all drugs
export const QUERY_DRUGS = gql`
  query drugs($username: String) {
    drugs(username: $username) {
      _id
      drugText
      dosage
      freq
      createdAt
      username
    }
  }
`;

// query for single drug 
export const QUERY_DRUG = gql`
  query drug($id: ID!) {
    drug(_id: $id) {
      _id
      drugText
      dosage
      freq
      createdAt
      username
    }
  }
`;

// query for user's profile
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      drugs {
        _id
        drugText
        dosage
        freq
        createdAt
        username
      }
    }
  }
`;

// queries for logged in users -- we don't need to pass in data
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      drugs {
        _id
        drugText
        dosage
        freq
        createdAt
        username
      }
    }
  }
`;


// queries for logged in users homepage
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;