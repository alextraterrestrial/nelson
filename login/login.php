<?php
//Show server errors 'on'
ini_set('display_errors', 'on');

// Initialize the session
session_start();
 
// Include config file
require_once "config.php";

//Get form data
$formData = file_get_contents('php://input');
$formObject = json_decode($formData);

$email = $formObject -> email;
$password = $formObject -> password;    

// Variable for the response
$response = new stdClass();

//If logeed in session already exists
if($_SESSION["loggedin"]){
    $response -> loggedIn = true;
    $response -> userId = $_SESSION["id"];
    echo json_encode($response);
    $response = new stdClass();
}
// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate credentials

    // Prepare a select statement
    $sql = "SELECT id, email, password FROM users WHERE email = :email";
    
    if($stmt = $pdo->prepare($sql)){
        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
        
        // Set parameters
        $param_email = $email;
        
        // Attempt to execute the prepared statement
        if($stmt->execute()){
            // Check if username exists, if yes then verify password
            if($stmt->rowCount() == 1){
                if($row = $stmt->fetch()){
                    $id = $row["id"];
                    $username = $row["email"];
                    $hashed_password = $row["password"];
                    if(password_verify($password, $hashed_password)){
                        // Password is correct, so start a new session
                        session_start();
                        
                        // Store data in session variables
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $id;
                        $_SESSION["email"] = $email;  
                        
                        //Return login token
                        $response -> loggedIn = true;
                        $response -> userId = $id;
                        
                        //Create a cookie for the loged in user
                        $cookieName = "user";
                        $cookie = new stdClass();
                        $cookie -> userId = $id;
                        $cookie -> logedIn = true;
                        $cookieValue = json_encode($cookie);
                        setCookie($cookieName, $cookieValue, 0);
                    } else {
                        // Wrong password
                        $response -> errors = ["password"];
                    }
                }
            } else{
                // Display an error message if username doesn't exist
                $response -> errors = ["email"];
            }
        } else{
            // Could not connect
            $response -> errors = ["connection"];
        }
    }
    
    // Close statement
    unset($stmt);

    // Close connection
    unset($pdo);

    //Return the response
    echo json_encode($response);
}
?>
 









