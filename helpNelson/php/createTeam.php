<?php
include('connectToDB.php');
// $pdo = getPDO();

$query = "SELECT teamName FROM Team WHERE teamName = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['teamName']);
$sql->execute();
$answer = $sql->fetchAll(PDO::FETCH_ASSOC);

if($answer) {
    echo "exists";
} else {
    
    $captain = "captain";

    $query = "INSERT INTO `Team`(`teamName`) VALUES (?)";

    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['teamName']);
    $sql->execute();

    $query = "SELECT teamId FROM `Team` WHERE teamName = ?";

    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['teamName']);
    $sql->execute();
    $answer = $sql->fetchAll(PDO::FETCH_ASSOC);

    $answer = $answer[0]['teamId'];

    // sleep(1);
    // echo $answer;
    // echo $captain;
    // echo $_GET['userId'];

    $query = "INSERT INTO `UserTeam`(`teamId`, `userId`, `status`) VALUES (?, ?, ?)";

    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $answer);
    $sql->bindParam(2, $_GET['userId']);
    $sql->bindParam(3, $captain);
    $sql->execute();

    $query = "SELECT * FROM `Team` WHERE teamId = ?";

    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $answer);
    $sql->execute();
    $answer = $sql->fetchAll(PDO::FETCH_ASSOC);

    $answer = json_encode($answer);
    echo $answer;
};

// $answer = json_encode($answer);



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