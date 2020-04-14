<?php
include('connectToDB.php');

$query = "DELETE FROM `UserTeam` WHERE teamId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['teamId']);

$sql->execute();

$query = "DELETE FROM `Submission1` WHERE teamId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['teamId']);

$sql->execute();

$query = "DELETE FROM `Team` WHERE teamId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['teamId']);

$sql->execute();


echo "success"
?>
