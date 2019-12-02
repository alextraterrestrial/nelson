<?php
include('connectDB.php');

$pdo = connectDB();

$query = "SELECT * FROM `Submission1` WHERE puzzleId = ? and teamId = ?";
$sql = $pdo->prepare($query);

$sql->bindParam(1, $_GET['puzzleId']);
$sql->bindParam(2, $_GET['teamId']);

$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

if(!$answer) {
  $pdo = connectDB();

  $query = "INSERT INTO Submission1(teamId, puzzleId, submission, subDescription) VALUES (?, ?, ?, ?)";
  $sql = $pdo->prepare($query);

  $sql->bindParam(1, $_GET['teamId']);
  $sql->bindParam(2, $_GET['puzzleId']);
  $sql->bindParam(3, $_GET['submission']);
  $sql->bindParam(4, $_GET['solution']);

  $sql->execute();

  // $teamId = $_GET['teamId']
  $teamId = "teamDevs";

  // include('givePoints.php');
  // givePoints($teamId, $_GET['testId'], $_GET['answer']);
  
  echo "Success";
  

} else {
  $answer = json_encode($answer);
  echo $answer;
}





?>