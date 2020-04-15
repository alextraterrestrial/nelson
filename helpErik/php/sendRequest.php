<?php
include('connectToDB.php');

$query = "SELECT * FROM UserTeam WHERE (teamId = ? AND userId = ?) AND status = 'pending'";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['team']);
$sql->bindParam(2, $_GET['userId']);
$sql->execute();
$response = $sql->fetchAll(PDO::FETCH_ASSOC);
$response = json_encode($response);

if ($response) {
  $query = "INSERT INTO UserTeam(teamId, userId, status) VALUES (?, ?, 'pending')";
  
  $sql = $pdo->prepare($query);
  $sql->bindParam(1, $_GET['team']);
  $sql->bindParam(2, $_GET['userId']);
  $sql->execute();
  
  echo 'INVITATION SENT';
} else {
  echo 'ALREADY INVITED';
}
?>
