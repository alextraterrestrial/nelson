<?php
include('connectToDB.php');
$check = false;


$query = "SELECT * FROM `UserTeam` WHERE userId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

if($answer) {
    foreach ($answer as $obj) {
    
    
        if($obj['status'] == "active" || $obj['status'] == "captain") {
            $query = "DELETE FROM UserTeam WHERE userId = ? AND status = 'pending'";
            $sql = $pdo->prepare($query);
            $sql->bindParam(1, $_GET['userId']);
            $sql->execute();
            
            $query = "SELECT UserTeam.*, teamName FROM `UserTeam` 
            JOIN Team ON UserTeam.teamId = Team.teamId  
            WHERE UserTeam.userId = ? AND UserTeam.status = 'active' ";
            $sql = $pdo->prepare($query);
            $sql->bindParam(1, $_GET['userId']);
            $sql->execute();
            $res = $sql->fetchAll(\PDO::FETCH_ASSOC);

            $res = json_encode($res);
            echo $res;
            exit;
        } else {
            $check = true;
        }
    }
    
    if($check) {
        echo "pending";
    }
} else {
    echo "noInvitations";
}

?>