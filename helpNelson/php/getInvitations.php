<?php
include('connectToDB.php');

$query = "SELECT * FROM UserTeam JOIN Team ON UserTeam.teamId = Team.teamId WHERE userId = ? AND status = 'pending'";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();
$answer = $sql->fetchAll(PDO::FETCH_ASSOC);
$answer = json_encode($answer);

echo $answer;
?>
