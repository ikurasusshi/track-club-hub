import type { Grade } from '../types/user';

export const formatGrade = (grade: Grade): string => {
  const gradeMap: Record<Grade, string> = {
    FIRST: '1年',
    SECOND: '2年',
    THIRD: '3年',
    FOURTH: '4年',
    GRADUATE_STUDENT: '院生',
  };
  return gradeMap[grade];
};
