CREATE TABLE `Challenge2Questions` (
  `questionId` int(11) NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `isAnswered` tinyint(1) DEFAULT '0',
  `checkType` varchar(255) DEFAULT NULL,
  `contentHtml` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `Challenge2Questions` (`questionId`, `answer`, `isAnswered`, `checkType`, `contentHtml`) VALUES
(1, 'right answer', 0, 'type', 'Hello world'),
(2, 'answer', 0, NULL, 'Hello again');


CREATE TABLE `Challenge2Submissions` (
  `questionId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `correctAnswer` int(11) NOT NULL,
  `submissionTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `submissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `Challenge2Questions`
  ADD PRIMARY KEY (`questionId`);

ALTER TABLE `Challenge2Submissions`
  ADD PRIMARY KEY (`submissionId`),
  ADD KEY `questionId` (`questionId`),
  ADD KEY `teamId` (`teamId`);


ALTER TABLE `Challenge2Submissions`
  ADD CONSTRAINT `challenge2submissions_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Challenge2Questions` (`questionId`),
  ADD CONSTRAINT `challenge2submissions_ibfk_2` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`),
  ADD CONSTRAINT `challenge2submissions_ibfk_3` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`);
