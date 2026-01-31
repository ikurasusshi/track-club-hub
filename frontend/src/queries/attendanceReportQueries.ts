import { gql } from "@apollo/client";

export const GET_ATTENDANCE_REPORTS = gql`
  query getAttendanceReports($block: String) {
    getAttendanceReports(block: $block) {
      id
      date
      status
      reason
      user {
        id
        name
      }
    }
  }
`;
