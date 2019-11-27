<?php 
  function givePoints($teamId, $testId, $answer) {
    $pdo = connectDB();

    $points = 12;

    $query = "SELECT members FROM teams WHERE id = ?";
    $sql = $pdo->prepare($query);

    $sql->bindParam(1, $teamId);

    $sql->execute();
    $howManyPlayers = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $points = $points/$howManyPlayers;
    
    $query = "UPDATE USERS SET SCORE = $points WHERE TeamName = ?";
    $sql = $pdo->prepare($query);

    $sql->bindParam(1, $teamId);

    $sql->execute();
  }
?>