-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: 10.209.2.88
-- Generation Time: Nov 29, 2019 at 02:00 PM
-- Server version: 5.5.52
-- PHP Version: 5.3.10-1ubuntu3.11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `244914-helpnelson`
--

-- --------------------------------------------------------

--
-- Table structure for table `Puzzle1`
--

CREATE TABLE IF NOT EXISTS `Puzzle1` (
  `puzzleId` int(11) NOT NULL AUTO_INCREMENT,
  `contentHTML` text NOT NULL,
  `answer` text NOT NULL,
  `checkType` varchar(50) NOT NULL,
  `minChars` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`puzzleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Submission1`
--

CREATE TABLE IF NOT EXISTS `Submission1` (
  `puzzleId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `submission` text NOT NULL,
  `timeReg` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `puzzleId` (`puzzleId`),
  KEY `teamId` (`teamId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Team`
--

CREATE TABLE IF NOT EXISTS `Team` (
  `teamId` int(11) NOT NULL AUTO_INCREMENT,
  `teamName` varchar(255) NOT NULL,
  PRIMARY KEY (`teamId`),
  UNIQUE KEY `teamName` (`teamName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `dateReg` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `UserTeam`
--

CREATE TABLE IF NOT EXISTS `UserTeam` (
  `teamId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  KEY `teamId` (`teamId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Submission1`
--
ALTER TABLE `Submission1`
  ADD CONSTRAINT `Submission1_ibfk_5` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`),
  ADD CONSTRAINT `Submission1_ibfk_1` FOREIGN KEY (`puzzleId`) REFERENCES `Puzzle1` (`puzzleId`),
  ADD CONSTRAINT `Submission1_ibfk_2` FOREIGN KEY (`puzzleId`) REFERENCES `Puzzle1` (`puzzleId`),
  ADD CONSTRAINT `Submission1_ibfk_3` FOREIGN KEY (`puzzleId`) REFERENCES `Puzzle1` (`puzzleId`),
  ADD CONSTRAINT `Submission1_ibfk_4` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`);

--
-- Constraints for table `UserTeam`
--
ALTER TABLE `UserTeam`
  ADD CONSTRAINT `UserTeam_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`),
  ADD CONSTRAINT `UserTeam_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
