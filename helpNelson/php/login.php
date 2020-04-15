<?php
//Show server errors 'on'
ini_set('display_errors', 'on');

// Include config file
include('connectToDB.php');

// Initialize the session
session_start();

// Object reference for the response
$response = new stdClass();

//If logeed in session already exists
// if(isset($_SESSION["userId"])){
//     $response -> userId = $_SESSION["userId"];
//     $response -> password = $_SESSION["password"];
//     echo json_encode($response);        
//     exit;
// }
// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" || $_COOKIE['user']){

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        //Get form data
        $formData = file_get_contents('php://input');
        $formObject = json_decode($formData);
        
        $email = $formObject -> email;
        $password = $formObject -> password; 

        // Prepare a select statement
        $sql = "SELECT * FROM User WHERE email = :email";

    } else if($_COOKIE['user']){
        $cookie = $_COOKIE['user'];
        $cookie = json_decode($cookie);

        $id = $cookie -> userId;
        $password = $cookie -> password;
        
        
        // Prepare a select statement
        $sql = "SELECT * FROM User WHERE userId = :id";
    }
    
    
    // Validate credentials
    
    if($stmt = $pdo->prepare($sql)){
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);

            // Set parameters
            $param_email = $email;
        }
        else if($_COOKIE['user']){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(":id", $param_id, PDO::PARAM_STR);

            // Set parameters
            $param_id = $id;
        } 
        
        // Attempt to execute the prepared statement
        if($stmt->execute()){
            // Check if username exists, if yes then verify password
            if($stmt->rowCount() == 1){
                if($row = $stmt->fetch()){
                    $id = $row["userId"];
                    $username = $row["username"];
                    $hashed_password = $row["password"];

                    $email = $row["email"];
                    $score = $row["score"];
                    $dateReg = $row["dateReg"];
                    
                    if($_SERVER["REQUEST_METHOD"] == "POST"){
                        // Check password against DB
                        if(password_verify($password, $hashed_password)){
                            //Password was correct

                            // // Get user information
                            // $sql = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
                            // JOIN UserTeam ON User.userId = UserTeam.userId 
                            // JOIN Team ON UserTeam.teamId = Team.teamId
                            // WHERE User.userId = :userId AND User.password = :userPassword";

                            // if($stmt = $pdo->prepare($sql)){
                            //     $stmt->bindParam(":userId", $param_id, PDO::PARAM_STR);
                            //     $stmt->bindParam(":userPassword", $param_hashed_password, PDO::PARAM_STR); 

                            //     $param_id = $id;
                            //     $param_hashed_password = $hashed_password;

                            //     if($stmt->execute()){
                            //         if($stmt->rowCount() == 1){
                            //             if($row = $stmt->fetch()){
                            //                 $teamName = $row["teamName"];
                            //                 $teamId = $row["teamId"];
                            //                 $status = $row["status"];
                            //             }
                            //         }
                            //     }

                            // }
                            

                            //Set session
                            // session_start();
                            $_SESSION["userId"] = $id;
                            $_SESSION["password"] = $hashed_password;
                            
                            // Create response
                            $response -> userId = $id;
                            $response -> username = $username;
                            $response -> password = $hashed_password;
                            $response -> email = $email;
                            $response -> score = $score;
                            $response -> dateReg = $dateReg;

                            // if(isset($teamId)){
                            //     $response -> teamId = $teamId;
                            //     $response -> teamName = $teamName;
                            //     $response -> status = $status;
                            // } else {
                            //     $response -> teamId = null;
                            //     $response -> teamName = null;
                            //     $response -> status = null;
                            // }
                            
                            
                                
                            //Create a cookie for the logged in user
                            $cookieName = "user";
                            $cookie = new stdClass();
                            $cookie -> userId = $id;
                            $cookie -> password = $hashed_password;
    
                            $cookieValue = json_encode($cookie);
                            setCookie($cookieName, $cookieValue, time() + (86400 * 14), "/");

                        } else{
                            $response -> errors .= "Wrong password";
                        }
                    } else if($_COOKIE['user']){
                        //Validate stored password against DB
                        if($password == $hashed_password){

                            $hashed_password = $password;

                            // // Get user information
                            //  // Get user information
                            //  $sql = "SELECT User.userId, Team.teamId, Team.teamName, UserTeam.status FROM User 
                            //  JOIN UserTeam ON User.userId = UserTeam.userId 
                            //  JOIN Team ON UserTeam.teamId = Team.teamId
                            //  WHERE User.userId = :userId AND User.password = :userPassword";
 
                            //  if($stmt = $pdo->prepare($sql)){
                            //      $stmt->bindParam(":userId", $id, PDO::PARAM_STR);
                            //      $stmt->bindParam(":userPassword", $hashed_password, PDO::PARAM_STR); 
 
                            //  }
                            //  if($stmt->execute()){
                            //      if($stmt->rowCount() == 1){
                            //          $teamName = $row["teamName"];
                            //          $teamId = $row["teamId"];
                            //          $status = $row["status"];
                            //      }
                                 
                            //  }
                            //Start session
                            // session_start();
                            $_SESSION["userId"] = $id;
                            $_SESSION["password"] = $hashed_password;

                            // Create response
                            $response -> userId = $id;
                            $response -> password = $password;
                            $response -> username = $username;
                            $response -> email = $email;
                            $response -> score = $score;
                            $response -> dateReg = $dateReg;

                        } else{
                            $response -> errors = "Wrong password";
                        }
                    }

                     // Get user and team information
                     $sql = "SELECT User.*, Team.teamId, Team.teamName, UserTeam.status FROM User 
                     JOIN UserTeam ON User.userId = UserTeam.userId 
                     JOIN Team ON UserTeam.teamId = Team.teamId
                     WHERE User.userId = :userId AND User.password = :userPassword";

                     if($stmt = $pdo->prepare($sql)){
                         $stmt->bindParam(":userId", $param_id, PDO::PARAM_STR);
                         $stmt->bindParam(":userPassword", $param_hashed_password, PDO::PARAM_STR); 

                         $param_id = $id;
                         $param_hashed_password = $hashed_password;

                         if($stmt->execute()){
                             if($stmt->rowCount() == 1){
                                 if($row = $stmt->fetch()){
                                     $teamName = $row["teamName"];
                                     $teamId = $row["teamId"];
                                     $status = $row["status"];
                                 }
                             }
                         }

                     }
                     //If user is part of a team
                     if(isset($teamId)){
                        $response -> teamId = $teamId;
                        $response -> teamName = $teamName;
                        $response -> status = $status;
                    } else {
                        // Otherwise set to null
                        $response -> teamId = null;
                        $response -> teamName = null;
                        $response -> status = null;
                    }
                }
            } else{
                // Display an error message if username doesn't exist
                $response -> errors = "Email doesn't exist";
            }
        } else{
            // Could not connect
            $response -> errors = "connection error";
        }
    }
    
    // Close statement
    unset($stmt);

    // Close connection
    unset($pdo);

    //Return the response
    echo json_encode($response);
    
// If request is NOT a POST request
} else{
   
    echo "You are trying to access this page the wrong way";
}
?>
 







