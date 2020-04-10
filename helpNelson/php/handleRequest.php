<?php
include('connectToDB.php');

// $pdo = connectDB();
$action = $_GET['action'];
$check = false;

//Checks the team limit, max limit is now 2
$query = "SELECT COUNT(*) AS count FROM UserTeam WHERE teamId = ? AND (status = 'active' OR status = 'captain')";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['team']);
$sql->execute();
$response = $sql->fetchAll(PDO::FETCH_ASSOC);

//if team limit is reached the invitation is declined an all pending members are removed from the database
if ($response[0]['count'] >= 2) {
  echo "invitation declined";

  $query = "DELETE FROM UserTeam WHERE teamId = ? AND status = 'pending'";
  $sql = $pdo->prepare($query);
  $sql->bindParam(1, $_GET['team']);
  $sql->execute();

  exit;
};

//if the user accepts and the invitation is accepted but
//the limit will be reached with this users addition
//then check is set to true to remove pending members in next step
if ($response[0]['count'] == 1 && $action == 'accept') {
  $check = true;
};

switch ($action) {
  case 'accept':
    //updates the user to active
    $query = "UPDATE UserTeam SET status = 'active' WHERE userId = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['userId']);
    $sql->execute();

    //removes remainiing pending meembers if limit is reached
    sleep(1);
    if($check) {
      $query = "DELETE FROM UserTeam WHERE teamId = ? AND status = 'pending'";
      $sql = $pdo->prepare($query);
      $sql->bindParam(1, $_GET['team']);
      $sql->execute();
      break;
    }

  case 'deny':
    //deletes this users inivitation
    $query = "DELETE FROM UserTeam WHERE teamId = ? AND userId = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['team']);
    $sql->bindParam(2, $_GET['userId']);
    $sql->execute();
    break;
}

echo 'Invitation accepted';
?>
