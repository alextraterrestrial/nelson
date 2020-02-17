<?php
include('connectToDB.php');

// $pdo = connectDB();

$query = "INSERT INTO UserTeam(teamId, userId, status) VALUES (?, ?, 'pending')";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['team']);
$sql->bindParam(2, $_GET['userId']);
$sql->execute();

echo 'INVITATION SENT';
?>
