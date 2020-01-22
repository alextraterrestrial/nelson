<?php

include('connectToDB.php');
// $pdo = getPDO();

$query = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
JOIN UserTeam ON User.userId = UserTeam.userId 
JOIN Team ON UserTeam.teamId = Team.teamId
WHERE User.userId = ? AND User.password = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['id']);
$sql->bindParam(2, $_GET['password']);
$sql->execute();
$answer = $sql->fetchAll(PDO::FETCH_ASSOC);

if ($answer) {
  
  // $query = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
  // JOIN UserTeam ON User.userId = UserTeam.userId 
  // JOIN Team ON UserTeam.teamId = Team.teamId
  // WHERE User.userId = ? AND User.password = ?";

  // $sql = $pdo->prepare($query);
  // $sql->bindParam(1, $_GET['id']);
  // $sql->bindParam(2, $_GET['password']);
  // $sql->execute();
  // $answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

  $answer = json_encode($answer);
  echo $answer;

} else {
  $query = "SELECT * FROM User WHERE User.userId = ? AND User.password = ?";

  $sql = $pdo->prepare($query);
  $sql->bindParam(1, $_GET['id']);
  $sql->bindParam(2, $_GET['password']);
  $sql->execute();
  $answer = $sql->fetchAll(PDO::FETCH_ASSOC);

  $answer = json_encode($answer);
  echo $answer;
}



// $query = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
// JOIN UserTeam ON User.userId = UserTeam.userId 
// JOIN Team ON UserTeam.teamId = Team.teamId
// WHERE User.userId = ? AND User.password = ?";

// $sql = $pdo->prepare($query);
// $sql->bindParam(1, $_GET['id']);
// $sql->bindParam(2, $_GET['password']);
// $sql->execute();
// $answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

// $answer = json_encode($answer);
// echo $answer;

?>