<?php
include('../PHP/connectDB.php');

$pdo = connectDB();

$query = "SELECT * FROM users";

$sql = $pdo->prepare($query);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>
