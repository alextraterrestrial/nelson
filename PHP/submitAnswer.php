<?php
include('connectDB.php');

$pdo = connectDB();

$query = "SELECT * FROM `Answer` WHERE testId = ? and teamId = ?";
$sql = $pdo->prepare($query);

$sql->bindParam(1, $_GET['testId']);
$sql->bindParam(2, $_GET['teamId']);

$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

if(!$answer) {
  $pdo = connectDB();

  $query = "INSERT INTO Answer(teamId, testId, answer, answerHow) VALUES (?, ?, ?, ?)";
  $sql = $pdo->prepare($query);

  $sql->bindParam(1, $_GET['teamId']);
  $sql->bindParam(2, $_GET['testId']);
  $sql->bindParam(3, $_GET['answer']);
  $sql->bindParam(4, $_GET['solution']);

  $sql->execute();

  echo "Success";

} else {
  $answer = json_encode($answer);
  echo $answer;
}





?>