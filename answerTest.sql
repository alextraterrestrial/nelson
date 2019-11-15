CREATE TABLE `Test` (
  `testId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` TEXT,
  `correctAnswer` TEXT,
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

INSERT INTO `Test` (content, correctAnswer, testImage)
VALUES('<div class="testContent"><img src="images/Jazz.png"></img></div>', "correct answer 1", "pic.jpg"),
("FÖR   STAB   OK   STAV  EN <br>
        ärs  AMMAS  OM  deni MAL <br>
        mösgy MN asie-o chvux EN <br>
        UT BIL dni ngsn Ä MND EN <br>
        sord  FÖR  ANDE  SN  amN", "J is right", "")