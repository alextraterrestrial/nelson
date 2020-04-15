<?php
    include("../php/connectToDB.php");

    class teamScore {
        public function __construct($id, $team, $score) {
            $this->id = $id;
            $this->team = $team;
            $this->score = $score;
        }
    }

    $query = "SELECT User.username, User.score, Team.teamId, Team.teamName FROM `User` 
    JOIN UserTeam ON User.userId=UserTeam.userId
    JOIN Team ON UserTeam.teamId=Team.teamId";

    $sql = $pdo->prepare($query);
    $sql->execute();
    $answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $teamScoreArr = array();

    // array_push($teamScoreArr, new teamScore(20, "hej", 26));
    // array_push($teamScoreArr, new teamScore(34, "hej", 26));

    foreach ($answer as $key => $value) {
        // Check i user exist in new array teamAcoreArr else pushes user into array

        if(in_array($value['teamId'], array_column($teamScoreArr, "id"))) {
            //if yes check if this user have a higher score than the old and repalce if it does.
            $i = array_search($value['teamId'], array_column($teamScoreArr, "id"));

            if($value['score'] > $teamScoreArr[$i]->score) {
                array_splice($teamScoreArr, $i, 1);
                array_push($teamScoreArr, new teamScore($value['teamId'], $value['teamName'], $value['score']));
            } 

        } else {
            array_push($teamScoreArr, new teamScore($value['teamId'], $value['teamName'], $value['score']));
        }
    };

    //sorts th array from most point to the least
    usort($teamScoreArr, function($a, $b)
    {
        return $b->score - $a->score;
    });

    //prints the list ass HTML
    
    $scoreNr = 1;

    echo "<h1>helpErik</h1>";
    echo "<div><a class='button' href='../index.php'>Tillbaka till spelet.</a></div>";
    echo "<h2>ScoreBoard från Challenge2</h2>";
    echo "<div class='scoreBoard'>";

    // echo json_encode($teamScoreArr) . "<br>";

    foreach ($teamScoreArr as $key => $value) {

        echo "<div class='scoreItem'><span class='place'> " . $scoreNr .  "</span><span class='teamName'> " . $value->team . "</span><span class='point'> " . $value->score . "poäng</span></div>";

        $scoreNr++;
    };

    echo "</div>";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="./scoreboard.css">
    <title>Help Erik - Scoreboard</title>
</head>
<body>
    
</body>
</html>