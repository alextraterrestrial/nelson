<?php
include('connectToDB.php');

// $pdo = connectDB();
$action = $_GET['action'];

switch ($action) {
  case 'updateCaptain':
    $query = "UPDATE UserTeam SET status = 'active' WHERE status = 'captain' AND teamId = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['team']);
    $sql->execute();
    
    $query = "UPDATE UserTeam SET status = 'captain' WHERE (status = 'active' AND teamId = ?) AND (userId = ?)";
  break;
  case 'removeMember':
    $query = "DELETE FROM UserTeam WHERE teamId = ? AND userId = ?";
  break;
}

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['team']);
$sql->bindParam(2, $_GET['member']);
$sql->execute();

switch ($action) {
  case 'updateCaptain':
    echo 'TEAM CAPTAIN UPDATED';
    break;
  case 'removeMember':
    echo 'TEAM MEMBER REMOVED';
    break;
}
?>