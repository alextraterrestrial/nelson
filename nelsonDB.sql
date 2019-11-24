CREATE TABLE `teamRequests` (
  `teamName` varchar(100) NOT NULL DEFAULT 'false',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `teamRequests` (`teamName`, `id`) VALUES
('teamDevs', 12),
('teamDevs', 13);

CREATE TABLE `teams` (
  `teamName` varchar(100) NOT NULL DEFAULT 'false',
  `id` int(11) NOT NULL,
  `members` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `teams` (`teamName`, `id`, `members`) VALUES
('teamDevs', 9, 1);

CREATE TABLE `Test` (
  `testId` int(11) NOT NULL,
  `content` text,
  `correctAnswer` text,
  `testImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `Test` (`testId`, `content`, `correctAnswer`, `testImage`) VALUES
(1, '<img src=\"images/Jazz.png\"></img>', 'correct answer 1', 'pic.jpg'),
(2, 'FÖR   STAB   OK   STAV  EN <br>\r\n        ärs  AMMAS  OM  deni MAL <br>\r\n        mösgy MN asie-o chvux EN <br>\r\n        UT BIL dni ngsn Ä MND EN <br>\r\n        sord  FÖR  ANDE  SN  amN', 'J is right', '');

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `score` int(11) DEFAULT '0',
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) NOT NULL DEFAULT 'passive',
  `teamName` varchar(100) DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `username`, `password`, `email`, `score`, `registered`, `status`, `teamName`) VALUES
(9, 'simon', 'test', 'test@test.com', 0, '2019-11-17 20:41:32', 'captain', 'teamDevs'),
(10, 'alex', 'test', 'test@test.com', 0, '2019-11-17 20:45:26', 'active', 'teamDevs'),
(12, 'linus', 'test', 'test@test.com', 0, '2019-11-17 21:01:19', 'passive', NULL),
(13, 'erik', 'test', 'test@test.com', 0, '2019-11-17 21:49:48', 'passive', NULL),
(14, 'richard', 'test', 'test@test.com', 0, '2019-11-17 21:49:48', 'passive', NULL),
(15, 'aneela', 'test', 'test@test.com', 0, '2019-11-17 21:49:48', 'passive', NULL),
(16, 'emile', 'test', 'test@test.com', 0, '2019-11-17 21:49:48', 'passive', NULL);

ALTER TABLE `teamRequests`
  ADD KEY `teamName` (`teamName`),
  ADD KEY `id` (`id`);

ALTER TABLE `teams`
  ADD PRIMARY KEY (`teamName`),
  ADD KEY `id` (`id`);

ALTER TABLE `Test`
  ADD PRIMARY KEY (`testId`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teamName` (`teamName`);

ALTER TABLE `Test`
  MODIFY `testId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

ALTER TABLE `teamRequests`
  ADD CONSTRAINT `teamrequests_ibfk_1` FOREIGN KEY (`teamName`) REFERENCES `teams` (`teamName`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teamrequests_ibfk_2` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`teamName`) REFERENCES `teams` (`teamName`) ON DELETE CASCADE ON UPDATE CASCADE;