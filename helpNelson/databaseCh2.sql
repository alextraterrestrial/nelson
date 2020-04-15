-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 25, 2020 at 10:27 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `244914-helpnelson`
--

-- --------------------------------------------------------

--
-- Table structure for table `Challenge2Questions`
--

CREATE TABLE `Challenge2Questions` (
  `questionId` int(11) NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `isAnswered` tinyint(1) DEFAULT '0',
  `checkType` varchar(255) DEFAULT NULL,
  `contentHtml` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Challenge2Questions`
--

INSERT INTO `Challenge2Questions` (`questionId`, `answer`, `isAnswered`, `checkType`, `contentHtml`) VALUES
(1, 'right answer', 0, 'type', 'Hello world'),
(2, 'answer', 0, NULL, 'Hello again');

-- --------------------------------------------------------

--
-- Table structure for table `Challenge2Submissions`
--

CREATE TABLE `Challenge2Submissions` (
  `questionId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `correctAnswer` int(11) NOT NULL,
  `submissionTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `submissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Puzzle1`
--

CREATE TABLE `Puzzle1` (
  `puzzleId` int(11) NOT NULL,
  `contentHTML` text NOT NULL,
  `answer` text NOT NULL,
  `checkType` varchar(50) NOT NULL,
  `minChars` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Puzzle1`
--

INSERT INTO `Puzzle1` (`puzzleId`, `contentHTML`, `answer`, `checkType`, `minChars`, `image`) VALUES
(1, '<img src=\"content/imgGame1/ch1_p1.jpg\">', 'petri', 'ANINSU', 5, 'ch1_p1.jpg'),
(2, '<img src=\"content/imgGame1/ch1_p2.jpg\">', 'malmöhus', 'SAMEAS', 8, 'ch1_p2.jpg'),
(3, '<img src=\"content/imgGame1/ch1_p3.jpg\">', 'peralbinhanssonpahansson', 'SUINAN', 7, 'ch1_p3.jpg'),
(4, '<img src=\"content/imgGame1/ch1_p4.jpg\">', 'hamngatan', 'SAMEAS', 1, 'ch1_p4.jpg'),
(5, '<img src=\"content/imgGame1/ch1_p7.jpg\">', 'turningtorso', 'SAMEAS', 0, 'ch1_p7.jpg'),
(6, '<img src=\"content/imgGame1/ch1_p8.jpg\">', 'ubåt', 'SAMEAS', 4, 'ch1_p8.jpg'),
(7, '<img src=\"content/imgGame1/ch1_p9.jpg\">', 'franssuell', 'SAMEAS', 10, 'ch1_p9.jpg'),
(8, '<img src=\"content/imgGame1/ch1_p11.jpg\">', 'stortorgetstoratorget', 'SUINAN', 10, 'ch1_p11.jpg'),
(9, '<img src=\"content/imgGame1/ch1_p12.jpg\">', 'malmösinrefyren', 'SUINAN', 5, 'ch1_p12.jpg'),
(10, '<img src=\"content/imgGame1/ch1_p13.jpg\">', 'kronprinsen', 'SAMEAS', 11, 'ch1_p13.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Submission1`
--

CREATE TABLE `Submission1` (
  `puzzleId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `submission` text NOT NULL,
  `timeReg` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Submission1`
--

INSERT INTO `Submission1` (`puzzleId`, `teamId`, `submission`, `timeReg`) VALUES
(1, 10, 'asd', '2020-03-06 11:31:29'),
(2, 10, '', '2020-03-06 15:28:47'),
(3, 10, '', '2020-03-06 15:28:51'),
(4, 10, '', '2020-03-06 15:28:53'),
(5, 10, 'asd', '2020-03-06 15:33:10'),
(6, 10, 'fdfe', '2020-03-06 15:33:12');

-- --------------------------------------------------------

--
-- Table structure for table `Team`
--

CREATE TABLE `Team` (
  `teamId` int(11) NOT NULL,
  `teamName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Team`
--

INSERT INTO `Team` (`teamId`, `teamName`) VALUES
(8, '123456'),
(3, 'abc'),
(7, 'abcas'),
(4, 'abcde'),
(6, 'abw'),
(5, 'asb'),
(9, 'myTeam'),
(10, 'team x'),
(1, 'teamDevs'),
(2, 'testTeam');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `score` int(11) DEFAULT '0',
  `dateReg` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userId`, `username`, `password`, `email`, `score`, `dateReg`) VALUES
(3, 'alex', '$2y$10$8sLC7O/D8LD.7hArDPGRZODDV8x4o28CAtFLcnmG4kIQioZ25/zyy', 'alex@purplehaze.se', 0, '2020-01-20 10:24:38'),
(7, 'test', '$2y$10$2r4QCtyJ7Bimm3S3tQesMOxGSB4KVSirK61z4rU0QP5OjV3RRIeau', 'test@gmail.com', 0, '2020-01-22 11:42:41'),
(10, 'qwerty', '$2y$10$iWwXvY9dJXlMeFqxHhWs2.vBu1qFwUVoem2UXIvUV5cyaKiKnqJo.', 'qwerty@gmail.com', 0, '2020-01-28 13:14:08');

-- --------------------------------------------------------

--
-- Table structure for table `UserTeam`
--

CREATE TABLE `UserTeam` (
  `teamId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `UserTeam`
--

INSERT INTO `UserTeam` (`teamId`, `userId`, `status`) VALUES
(9, 7, 'captain'),
(10, 25, 'captain');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Challenge2Questions`
--
ALTER TABLE `Challenge2Questions`
  ADD PRIMARY KEY (`questionId`);

--
-- Indexes for table `Challenge2Submissions`
--
ALTER TABLE `Challenge2Submissions`
  ADD PRIMARY KEY (`submissionId`),
  ADD KEY `questionId` (`questionId`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `Puzzle1`
--
ALTER TABLE `Puzzle1`
  ADD PRIMARY KEY (`puzzleId`);

--
-- Indexes for table `Submission1`
--
ALTER TABLE `Submission1`
  ADD KEY `puzzleId` (`puzzleId`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `Team`
--
ALTER TABLE `Team`
  ADD PRIMARY KEY (`teamId`),
  ADD UNIQUE KEY `teamName` (`teamName`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `UserTeam`
--
ALTER TABLE `UserTeam`
  ADD KEY `teamId` (`teamId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Challenge2Questions`
--
ALTER TABLE `Challenge2Questions`
  MODIFY `questionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Challenge2Submissions`
--
ALTER TABLE `Challenge2Submissions`
  MODIFY `submissionId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Puzzle1`
--
ALTER TABLE `Puzzle1`
  MODIFY `puzzleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Team`
--
ALTER TABLE `Team`
  MODIFY `teamId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Challenge2Submissions`
--
ALTER TABLE `Challenge2Submissions`
  ADD CONSTRAINT `challenge2submissions_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Challenge2Questions` (`questionId`),
  ADD CONSTRAINT `challenge2submissions_ibfk_2` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`),
  ADD CONSTRAINT `challenge2submissions_ibfk_3` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`);

--
-- Constraints for table `Submission1`
--
ALTER TABLE `Submission1`
  ADD CONSTRAINT `Submission1_ibfk_1` FOREIGN KEY (`puzzleId`) REFERENCES `Puzzle1` (`puzzleId`),
  ADD CONSTRAINT `Submission1_ibfk_2` FOREIGN KEY (`puzzleId`) REFERENCES `Puzzle1` (`puzzleId`),
  ADD CONSTRAINT `Submission1_ibfk_3` FOREIGN KEY (`puzzleId`) REFERENCES `Puzzle1` (`puzzleId`),
  ADD CONSTRAINT `Submission1_ibfk_4` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`),
  ADD CONSTRAINT `Submission1_ibfk_5` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`);

--
-- Constraints for table `UserTeam`
--
ALTER TABLE `UserTeam`
  ADD CONSTRAINT `UserTeam_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`),
  ADD CONSTRAINT `UserTeam_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`);
