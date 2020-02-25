<?php
include('connectToDB.php');

// $pdo = connectDB();
$action = $_GET['action'];

switch ($action) {
  case 'accept':
    $query = "UPDATE UserTeam SET status = 'active' WHERE userId = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['userId']);
    $sql->execute();

    $query = "DELETE * FROM UserTeam WHERE userId = ? AND status = 'pending'";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['userId']);
    $sql->execute();
    break;
  case 'deny':
    $query = "DELETE FROM UserTeam WHERE teamId = ? AND userId = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['team']);
    $sql->bindParam(2, $_GET['userId']);
    $sql->execute();
    break;
}

echo 'INVITATION HANDLED';
?>
