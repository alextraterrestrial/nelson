<?php
include('connectToDB.php');

$query = "DELETE FROM `UserTeam` WHERE teamId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(2, $_GET['teamId']);

$sql->execute();

$query = "DELETE FROM `Team` WHERE teamId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(2, $_GET['teamId']);

$sql->execute();


echo "success"
?>
