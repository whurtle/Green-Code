DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Code;

CREATE TABLE User(
	userId int AUTO_INCREMENT,
	firstName varchar(32),
	lastName varchar(32),
	username varchar(32),
	password varchar(32),
	email varchar(128),

	PRIMARY KEY(userId)
);

CREATE TABLE Code(
	submissionId int AUTO_INCREMENT,
	userId int,
	submissionNumber int,
	submissionTimestamp date,
	codeString longtext,

	PRIMARY KEY(submissionId),
	FOREIGN KEY(userId) REFERENCES User(userId) ON DELETE CASCADE
);