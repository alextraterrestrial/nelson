<?php

include('connectToDB.php');

$query = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
JOIN UserTeam ON User.userId = UserTeam.userId 
JOIN Team ON UserTeam.teamId = Team.teamId";
$sql = $pdo->prepare($query);
$sql->execute();
$answer1 = $sql->fetchAll(PDO::FETCH_ASSOC);

$query = "SELECT * FROM User";
$sql = $pdo->prepare($query);
$sql->execute();
$answer2 = $sql->fetchAll(PDO::FETCH_ASSOC);
  
$result = array();
$result[] = $answer1;
$result[] = $answer2;
$result = json_encode($result);

echo $result;

?>