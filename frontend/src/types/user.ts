export type Grade =
  | "FIRST"
  | "SECOND"
  | "THIRD"
  | "FOURTH"
  | "GRADUATE_STUDENT";

export type Block =
  | "Sprints"
  | "MiddleAndLongDistance"
  | "Jumps"
  | "Throws"
  | "Others";

export type User = {
  id: number;
  name: string;
  email: string;
  block: Block;
  grade: Grade;
};
