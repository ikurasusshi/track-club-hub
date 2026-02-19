import { gql } from "@apollo/client";

export const CREATE_COMPETITION_REPORT = gql`
  mutation CreateCompetitionReport($createCompetitionReportInput: CreateCompetitionReportInput!) {
    createCompetitionReport(createCompetitionReportInput: $createCompetitionReportInput) {
      id
      competitionName
      body 
    }
  }
`