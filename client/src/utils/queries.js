import gql from 'graphql-tag';

// query for all thoughts
export const QUERY_DRUGS = gql`
  query drugs($username: String) {
    drugs(username: $username) {
      _id
      drug_name
      createdAt
      username
      dosage
      freq
      reactions {
        _id
        createdAt
        reactionText
      }
    }
  }
`;

// query for single thought 
export const QUERY_DRUG = gql`
  query drug($id: ID!) {
    drug(_id: $id) {
      _id
      drug_name
      createdAt
      username
      dosage
      freq
      reactions {
        _id
        createdAt
        reactionText
      }
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
        drug_name
        createdAt
        dosage
        freq
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
      friendCount
      drugs {
        _id
        drug_name
        createdAt
        reactions {
          _id
          createdAt
          reactionText
        }
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