<?php
require_once("config.php");

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    
 
    if(isset($_GET["email"])){
        $request = $_GET["email"];
        $sql = "SELECT email FROM users WHERE email = :field";
    }
    else if(isset($_GET["userName"])){
        $request = $_GET["userName"];
        $sql = "SELECT username FROM users WHERE username = :field";
    }
    
    if($stmt = $pdo->prepare($sql)){
        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(":field", $param_field, PDO::PARAM_STR);
        
        // Set parameters
        $param_field = $request;
        
        // Attempt to execute the prepared statement
        if($stmt->execute()){
            // Check if username exists, if yes then verify password
            if($stmt->rowCount() == 1){
                
                // $res = "Det finns redan ett konto med den här mailadressen";
                echo json_encode(false);
                exit;    

            } else{
                // Display an error message if username doesn't exist
                
                // echo json_encode(true); 
                echo json_encode(true);
            
                exit;
            }
        }
    }
}