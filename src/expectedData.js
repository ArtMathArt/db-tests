export const expectedPersonTable = [
    { name: "uuid", type: "UUID" },
    { name: "firstName", type: "TEXT" },
    { name: "lastName", type: "TEXT" },
    { name: "phoneNumber", type: "TEXT" },
    { name: "birthDate", type: "TEXT" },
  ];
  
  export const expectedStudentTable = [
    {
      name: "id",
      type: "INTEGER",
    },
    {
      name: "personId",
      type: "UUID",
    },
    {
      name: "stipend",
      type: "REAL",
    },
  ];
  
  export const expectedTeacherTable = [
    {
      name: "id",
      type: "INTEGER",
    },
    {
      name: "personId",
      type: "UUID",
    },
    {
      name: "salary",
      type: "REAL",
    },
  ];
  
  export const expectedCourseTable = [
    {
      name: "id",
      type: "INTEGER",
    },
    {
      name: "name",
      type: "TEXT",
    },
    {
      name: "credits",
      type: "INTEGER",
    },
    {
      name: "teacherId",
      type: "UUID",
    },
  ];
  
  export const expectedStudentToCourseTable = [
    {
      name: "id",
      type: "INTEGER",
    },
    {
      name: "studentId",
      type: "UUID",
    },
    {
      name: "courseId",
      type: "INTEGER",
    },
  ];