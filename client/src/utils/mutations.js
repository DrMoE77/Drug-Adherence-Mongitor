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

// adding friends
export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

// add drug
export const ADD_DRUG = gql`
  mutation addDrug($drug_name: String!, $dosage:String!, $freq: String!) {
    addDrug(drug_name: $drug_name, dosage: $dosage, freq:$freq) {
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

// add reaction
export const ADD_REACTION = gql`
  mutation addReaction($drugId: ID!, $reactionText: String!) {
    addReaction(drugId: $drugId, reactionText: $reactionText) {
      _id
      reactions {
        _id
        createdAt
        reactionText
      }
    }
  }
`;