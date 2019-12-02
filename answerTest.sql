CREATE TABLE `Test` (
  `testId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` TEXT,
  `correctAnswer` TEXT,
  `typeOfCheck` VARCHAR(255),
  `minCharacters` INT,
  `testImage` varchar(255) DEFAULT NULL
);

CREATE TABLE `Answer` (
  `teamId` INT,
  `testId` INT,
  `answer` TEXT,
  `answerHow` TEXT,
  `submitTimestamp` TIMESTAMP,
  FOREIGN KEY (testId) REFERENCES test(testId)
);

INSERT INTO `Test` (content, correctAnswer, typeOfCheck, minCharacters, testImage)
VALUES()