export interface Student {
  id: string;
  name: string;
  grade: string;
  rollNo: string;
  attendance: 'Present' | 'Absent';
  feesPaid: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  classTeacher: string;
  status: 'Active' | 'On Leave';
}

export const initialStudents: Student[] = [
  { id: '1', name: 'Rahul Sharma', grade: 'Class 5', rollNo: 'A-01', attendance: 'Present', feesPaid: true },
  { id: '2', name: 'Anjali Verma', grade: 'Class 5', rollNo: 'A-02', attendance: 'Present', feesPaid: false },
  { id: '3', name: 'Aman Das', grade: 'Class 6', rollNo: 'B-12', attendance: 'Absent', feesPaid: true }
];

export const initialTeachers: Teacher[] = [
  { id: '1', name: 'Rakesh Mishra', subject: 'Mathematics', classTeacher: 'Class 5', status: 'Active' },
  { id: '2', name: 'Sunita Rao', subject: 'Science', classTeacher: 'Class 6', status: 'Active' }
];