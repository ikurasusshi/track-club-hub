import { gql } from "@apollo/client";

export const GET_COMPETITION_REPORTS = gql`
  query {
    getCompetitionReports {
      id
      body
      user {
        id
        name
      }
    }
  }
`

export const GET_MY_COMPETITION_REPORTS = gql`
  query($userId: Int!) {
    getMyCompetitionReports(userId: $userId) {
      id
      body
      user {
        id
        name
      }
    }
  }
`