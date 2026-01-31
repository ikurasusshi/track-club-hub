import { gql } from "@apollo/client";

export const CREATE_ATTENDANCE_REPORT = gql`
  mutation createAttendanceReport(
    $createAttendanceReportInput: CreateAttendanceReportInput!
  ) {
    createAttendanceReport(
      createAttendanceReportInput: $createAttendanceReportInput
    ) {
      id
      date
      status
      reason
    }
  }
`;
