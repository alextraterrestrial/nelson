<?php
ini_set("allow_url_include", true );
require_once "../login/config.php";
var_dump($pdo);
if ($_SERVER["REQUEST_METHOD"] == "GET"){
   
 
    if(isset($_GET["email"])){
        $request = $_GET["email"];
        $sql = "SELECT email FROM User WHERE email = :field";
    }
    else if(isset($_GET["username"])){
        $request = $_GET["userName"];
        $sql = "SELECT username FROM User WHERE username = :field";
    }
    
    if($stmt = $pdo->prepare($sql)){

        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(":field", $param_field, PDO::PARAM_STR);
        
        // Set parameters
        $param_field = $request;
        
        // Attempt to execute the prepared statement
        if($stmt->execute()){
            // Check if username or email exists
            if($stmt->rowCount() == 1){
                
                // $res = "Det finns redan ett konto med den här mailadressen";
                echo json_encode(false);
                exit;    

            } else{
               
                // echo json_encode(true); 
                echo json_encode(true);
            
                exit;
            }
        }
    }
}