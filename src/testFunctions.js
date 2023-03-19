import Database from "better-sqlite3";
import { assert } from "chai";
import {
  expectedPersonTable,
  expectedStudentTable,
  expectedTeacherTable,
  expectedCourseTable,
  expectedStudentToCourseTable,
} from "./expectedData.js";

export function getDBConnection(pathToDB) {
  const db = new Database(pathToDB, { verbose: console.log });
  db.pragma("journal_mode = WAL");
  return db;
}

export function closeConnection(db) {
  db.close();
}

function getColumnAndTypes(db, tableName) {
  let result = db.pragma(`table_info(${tableName})`);
  return result.map((column) => {
    return { name: column.name, type: column.type };
  });
}

function testTableInfo(db, tableName, expected) {
  let actual = getColumnAndTypes(db, tableName);
  assert.deepEqual(
    actual,
    expected,
    `Table ${tableName} has columns ${expected
      .map((column) => column.name)
      .join()}`
  );
}

function testMinColumnValue(db, table, columnName, expected) {
  let stmt = db.prepare(`SELECT min(${columnName}) from ${table}`);
  let result = stmt.get();
  let [actual] = Object.values(result);
  assert.isAtLeast(actual, expected, `Column ${columnName} from table ${table} has minimum value ${expected}`);
}

function testMaxColumnValue(db, table, columnName, expected) {
  let stmt = db.prepare(`SELECT max(${columnName}) from ${table}`);
  let result = stmt.get();
  let [actual] = Object.values(result);
  assert.isAtMost(actual, expected, `Column ${columnName} from table ${table} has maximum value ${expected}`);
}

function wrapTestFunction(testFunction, ...args) {
    return (db) => () => testFunction(db, ...args);
}

export const tests = [
    [
        'Test "PERSON" table structure',
        wrapTestFunction(testTableInfo, "PERSON", expectedPersonTable)
    ],
    [
        'Test "STUDENT" table structure',
        wrapTestFunction(testTableInfo, "STUDENT", expectedStudentTable)
    ],
    [
        'Test "TEACHER" table structure',
        wrapTestFunction(testTableInfo, "TEACHER", expectedTeacherTable)
    ],
    [
        'Test "COURSE" table structure',
        wrapTestFunction(testTableInfo, "COURSE", expectedCourseTable)
    ],
    [
        'Test "STUDENT_TO_COURSE" table structure',
        wrapTestFunction(testTableInfo, "COURSE", expectedStudentToCourseTable)
    ]
    [
        'Test min value of "stipend" in table "STUDENT"',
        wrapTestFunction(testMinColumnValue, "STUDENT", "stipend", 500)
    ],
    [
        'Test min value of "salary" in table "TEACHER"',
        wrapTestFunction(testMinColumnValue, "TEACHER", "salary", 50000)
    ],
    [
        'Test max value of "stipend" in table "STUDENT"',
        wrapTestFunction(testMaxColumnValue, "STUDENT", "stipend", 1000)
    ],
    [
        'Test max value of "salary" in table "TEACHER"',
        wrapTestFunction(testMaxColumnValue, "TEACHER", "salary", 100000)
    ]
];