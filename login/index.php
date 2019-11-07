

<?php

if(isset($_SESSION["loggedin"])){
    require("../game/game.php");
} else{
    require("login.php");
    
}
?>
