<?php

include('connectToDB.php');

$query = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
JOIN UserTeam ON User.userId = UserTeam.userId 
JOIN Team ON UserTeam.teamId = Team.teamId
WHERE Team.teamId = ? AND UserTeam.status <> 'pending'";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['teamId']);
$sql->execute();
$answer1 = $sql->fetchAll(PDO::FETCH_ASSOC);

$query = "SELECT * FROM User WHERE userId NOT IN (SELECT userId FROM UserTeam)";
$sql = $pdo->prepare($query);
$sql->execute();
$answer2 = $sql->fetchAll(PDO::FETCH_ASSOC);
  
$result = array();
$result[] = $answer1;
$result[] = $answer2;
$result = json_encode($result);

echo $result;

?>