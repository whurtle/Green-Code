DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Code;

CREATE TABLE User(
	userId int AUTO_INCREMENT,
	firstName varchar(32),
	lastName varchar(32),

	PRIMARY KEY(userId)
);

CREATE TABLE Code(
	submissionId int AUTO_INCREMENT,
	userId int,
	submissionNumber int,
	submissionTimestamp date,
	code text,

	PRIMARY KEY(submissionId),
	FOREIGN KEY(userId) REFERENCES User(userId) ON DELETE CASCADE
);