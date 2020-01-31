<?php
include('../PHP/connectDB.php');

$pdo = connectDB();
$action = $_GET['action'];

switch ($action) {
  case 'updateCaptain':
    $query = "UPDATE UserTeam SET status = 'active' WHERE status = 'captain' AND teamName = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['team']);
    $sql->execute();
    
    $query = "UPDATE UserTeam SET status = 'captain' WHERE (status = 'active' AND teamName = ?) AND (id = ?)";
  break;
  case 'removeMember':
    $query = "UPDATE users SET status = 'passive', teamName = NULL WHERE teamName = ? AND id = ?";
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