import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      email
      block
      grade
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      name
      email
      block
      grade
    }
  }
`;
