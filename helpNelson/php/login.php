<?php
//Show server errors 'on'
ini_set('display_errors', 'on');

// Include config file
require_once "../connectToDB.php";

// Initialize the session
session_start();

// Object reference for the response
$response = new stdClass();

//If logeed in session already exists
if(isset($_SESSION["userId"])){
    $response -> id = $_SESSION["userId"];
    $response -> password = $_SESSION["password"];
    echo json_encode($response);
    exit;
}
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

                    if($_SERVER["REQUEST_METHOD"] == "POST"){
                        // Check password against DB
                        if(password_verify($password, $hashed_password)){
                            //Password was correct

                            //Set session
                            // session_start();
                            $_SESSION["userId"] = $id;
                            $_SESSION["password"] = $hashed_password;
                            
                            // Create response
                            $response -> id = $userId;
                            $response -> password = $password;
                                
                            //Create a cookie for the logged in user
                            $cookieName = "user";
                            $cookie = new stdClass();
                            $cookie -> id = $id;
                            $cookie -> password = $hashed_password;
    
                            $cookieValue = json_encode($cookie);
                            setCookie($cookieName, $cookieValue, time() + (86400 * 14), "/");

                        } else{
                            $response -> errors = "Wrong password";
                        }
                    } else if($_COOKIE['user']){
                        //Validate stored password against DB
                        if($password == $hashed_password){
                            //Start session
                            // session_start();
                            $_SESSION["userId"] = $id;
                            $_SESSION["password"] = $hashed_password;

                            // Create response
                            $response -> id = $userId;
                            $response -> password = $password;
                        } else{
                            $response -> errors = "Wrong password";
                        }
                    }
                    
                    // if(password_verify($password, $hashed_password)){
                    //     // Password is correct, so start a new session
                        
                    //     // Get team data for loged in user
                    //     // $query = "SELECT * FROM UserTeam LEFT JOIN Team ON UserTeam.teamId=Team.teamId WHERE userId = :userId AND UserTeam.status = 'member'";
                    //     // $stmt = $pdo->prepare($query);
                    //     // $stmt -> bindParam(":userId", $param_id, PDO::PARAM_STR);

                    //     //Set parameters
                    //     // $param_id  = $id;

                    //     // Execute query
                    //     // $stmt -> execute();
                    //     // $row = $stmt -> fetch();

                    //     // Check if the user has a team where the status is member 
                    //     // if($stmt -> rowCount() > 0){
                    //     //     $teamName = $row["teamName"];
                    //     //     $teamId = $row["teamId"];
                    //     //     $password = $row["password"];
                    //     // } else {
                    //     //     $teamName = null;
                    //     //     $teamId = null;
                    //     //     $password = null;
                    //     // }

                    //     // Store data in session variables
                        // $_SESSION["loggedin"] = true;
                        // $_SESSION["id"] = $id;
                        // $_SESSION["username"] = $username;
                        // $_SESSION["teamName"] = $teamName;

                    //     //Return login token
                    //     // $response -> loggedIn = true;
                    //     // $response -> userId = $id;
                    //     // $response -> teamName = $teamName;
                    //     // $response -> teamId = $teamId;
                    //     $response -> id = $userId;
                    //     $response -> password = $password;
                            
                    //     //Create a cookie for the logged in user
                    //     $cookieName = "user";
                    //     $cookie = new stdClass();
                    //     $cookie -> email = $email;
                    //     $cookie -> username = $username;
                    //     $cookie -> password = $password;

                    //     $cookieValue = json_encode($cookie);
                    //     setCookie($cookieName, $cookieValue, time() + (86400 * 14), "/");
                        
                    //     //Send response
                    //     // echo json_encode($response);

                    // } else if($_SERVER["REQUEST_METHOD"] == "POST"){
                    //     // Check credentials with hashed password
                    //     if($password == $hashed_password){
                    //         $response -> username = $username;
                    //         $response -> password = $password;
                    //     }
                        

                    // } else {
                    //     // Wrong password
                    //     $response -> errors = ["password"];
                    // }
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
 







