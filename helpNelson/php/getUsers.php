<?php

include('php/connectToDB.php');
// $pdo = getPDO();

$query = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
JOIN UserTeam ON User.userId = UserTeam.userId 
JOIN Team ON UserTeam.teamId = Team.teamId";

$sql = $pdo->prepare($query);
$sql->execute();
$answer = $sql->fetchAll(PDO::FETCH_ASSOC);

if ($answer) {
  $answer = json_encode($answer);
  echo $answer;

} else {
  $query = "SELECT * FROM User";

  $sql = $pdo->prepare($query);
  $sql->execute();
  $answer = $sql->fetchAll(PDO::FETCH_ASSOC);

  $answer = json_encode($answer);
  echo $answer;
}

?>