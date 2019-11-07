<?php
require("header.php")
?>
    <main>
        <?php
        if(isset($_SESSION["loggedin"])){
            require("welcome.html");
        } else{
            require("login.php");
            
        }
        ?>
    </main>
<?php
require("footer.php")
?>