<?php
include('connectDB.php');

$pdo = connectDB();

$query = "SELECT testId, content, testImage FROM Test";

$sql = $pdo->prepare($query);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>