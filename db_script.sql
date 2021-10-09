DROP TABLE IF EXISTS Code;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS SortRun;


CREATE TABLE User(
	userId int AUTO_INCREMENT,
	email varchar(72),

	PRIMARY KEY(userId)
);

CREATE TABLE Code(
	submissionId int AUTO_INCREMENT,
	userId int,
	codeName varchar(32),
	mimetype varchar(32),
	codeString longtext,

	PRIMARY KEY(submissionId),
	FOREIGN KEY(userId) REFERENCES User(userId) ON DELETE CASCADE
);

CREATE TABLE SortRun(
	submissionId int,
	sortName varchar(32),
	jsonString longtext,
	csvString longtext,

	FOREIGN KEY(submissionId) REFERENCES Code(submissionId) ON DELETE CASCADE
);