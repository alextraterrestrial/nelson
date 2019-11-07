<?php
require("header.php")
?>
    <main>
        <?php
        if(isset($_SESSION["loggedin"])){
            require("../game/game.php");
        } else{
            require("login.php");
            
        }
        ?>
    </main>
