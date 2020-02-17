<?php

include('connectToDB.php');
// $pdo = getPDO();

$query = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
JOIN UserTeam ON User.userId = UserTeam.userId 
JOIN Team ON UserTeam.teamId = Team.teamId";

$sql = $pdo->prepare($query);
$sql->execute();
$answer1 = $sql->fetchAll(PDO::FETCH_ASSOC);

// if ($answer1) {
//   // $answer1 = json_encode($answer);
//   // $arr1 = array($answer);
//   // echo $answer;
  
// } elseif ($answer == false) {
  $query = "SELECT * FROM User";
  
  $sql = $pdo->prepare($query);
  $sql->execute();
  $answer2 = $sql->fetchAll(PDO::FETCH_ASSOC);
  
  // $answer2 = json_encode($answer);
  // $arr2 = array($answer);

  // echo $answer;
// }
$result = array();
$result[] = $answer1;
$result[] = $answer2;
$result = json_encode($result);

echo $result;

?>