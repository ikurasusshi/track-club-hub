import { gql } from "@apollo/client";

export const GET_COMPETITION_REPORTS = gql`
  query {
    getCompetitionReports {
      id
      competitionName
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
      competitionName
      body
      user {
        id
        name
      }
    }
  }
`