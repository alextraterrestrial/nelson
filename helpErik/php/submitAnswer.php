<?php
include('connectToDB.php');

$query = "SELECT * FROM `Submission1` WHERE puzzleId = ? and teamId = ?";
$sql = $pdo->prepare($query);

$sql->bindParam(1, $_GET['puzzleId']);
$sql->bindParam(2, $_GET['teamId']);

$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

if(!$answer) {

  $query = "INSERT INTO Submission1(teamId, puzzleId, submission) VALUES (?, ?, ?)";
  $sql = $pdo->prepare($query);

  $sql->bindParam(1, $_GET['teamId']);
  $sql->bindParam(2, $_GET['puzzleId']);
  $sql->bindParam(3, $_GET['submission']);

  $sql->execute();
  echo "Success";
  

} else {
  echo "Already Submitted an answer";
}





?>