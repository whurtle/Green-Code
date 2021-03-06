DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Code;
DROP TABLE IF EXISTS Assignment;

CREATE TABLE Student(
	studentId int AUTO_INCREMENT,
	firstName varchar(32),
	lastName varchar(32),

	PRIMARY KEY(studentId)
);

CREATE TABLE Assignment(
	assignmentId int AUTO_INCREMENT,
	assignmentName varchar(64),

	PRIMARY KEY(assignmentId)
);

CREATE TABLE Code(
	submissionId int AUTO_INCREMENT,
	studentId int,
	assignmentId int,
	submissionNumber int,
	submissionTimestamp date,

	PRIMARY KEY(submissionId),
	FOREIGN KEY(studentId) REFERENCES Student(studentId) ON DELETE CASCADE,
	FOREIGN KEY(assignmentId) REFERENCES Assignment(assignmentId) ON DELETE CASCADE
);