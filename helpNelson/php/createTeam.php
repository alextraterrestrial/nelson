<?php
echo "hi";
include('connectToDB.php');
// $pdo = getPDO();

$query = "SELECT teamName FROM Team WHERE teamName = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['teamName']);
$sql->execute();
$answer = $sql->fetchAll(PDO::FETCH_ASSOC);

echo Boolean($answer);


// if ($answer) {

//   $answer = json_encode($answer);
//   echo $answer;

// } else {
//   $query = "SELECT * FROM User WHERE User.userId = ? AND User.password = ?";

//   $sql = $pdo->prepare($query);
//   $sql->bindParam(1, $_GET['id']);
//   $sql->bindParam(2, $_GET['password']);
//   $sql->execute();
//   $answer = $sql->fetchAll(PDO::FETCH_ASSOC);

//   $answer = json_encode($answer);
//   echo $answer;
// }
?>