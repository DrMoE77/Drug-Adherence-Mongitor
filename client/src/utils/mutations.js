import gql from 'graphql-tag';

// mutation for logged in user 
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// mutation for user to sign up
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


// add drug
export const ADD_DRUG = gql`
mutation addDrug($drugText: String!, $dosage:String!, $freq: String!) {
  addDrug(drugText: $drugText, dosage: $dosage, freq:$freq) {
      _id
      drugText
      dosage
      freq
      createdAt
      username
    }
  }
`;
