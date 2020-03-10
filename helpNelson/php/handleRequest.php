<?php
include('connectToDB.php');

// $pdo = connectDB();
$action = $_GET['action'];
$check = false;

$query = "SELECT COUNT(*) AS count FROM UserTeam WHERE teamId = ? AND (status = 'active' OR status = 'captain')";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['team']);
$sql->execute();
$response = $sql->fetchAll(PDO::FETCH_ASSOC);

if ($response[0]['count'] > 2) {
  exit;
};
if ($response[0]['count'] == 1 && $action == 'accept') {
  $check = true;
};

switch ($action) {
  case 'accept':
    $query = "UPDATE UserTeam SET status = 'active' WHERE userId = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['userId']);
    $sql->execute();

    sleep(1);
    if($check) {
      $query = "DELETE FROM UserTeam WHERE teamId = ? AND status = 'pending'";
      $sql = $pdo->prepare($query);
      $sql->bindParam(1, $_GET['team']);
      $sql->execute();
      break;
    }

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
