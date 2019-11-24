<?php
include('../PHP/connectDB.php');

$pdo = connectDB();

$query = "INSERT INTO teamRequests(teamName, id) VALUES (?, ?)";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['team']);
$sql->bindParam(2, $_GET['userID']);
$sql->execute();

$pdo = connectDB();

// $query = "UPDATE users SET status = 'pending' WHERE id = ?";
$query = "UPDATE users SET status = 'pending', teamName = ? WHERE id = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['team']);
$sql->bindParam(2, $_GET['userID']);
$sql->execute();

echo 'Request sent';
?>
