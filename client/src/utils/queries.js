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
        reason
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
        reason
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

