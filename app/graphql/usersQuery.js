import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      email
      password
    }
  }
`;
