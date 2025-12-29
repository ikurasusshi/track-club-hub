export type Grade = 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'GRADUATE_STUDENT';

export type User = {
  id: number;
  name: string;
  email: string;
  block: string;
  grade: Grade;
};
