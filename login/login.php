<?php
//Show server errors 'on'
ini_set('display_errors', 'on');

// Include config file
require_once "../login/config.php";

// Initialize the session
session_start();

// Object reference for the response
$response = new stdClass();

//If logeed in session already exists
if(isset($_SESSION["loggedin"])){
    $response -> loggedIn = true;
    $response -> userId = $_SESSION["id"];
    $resonse -> username = $_SESSION["username"];
    $resonse -> teamName = $_SESSION["teamName"];
    echo json_encode($response);
    exit;
}
// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST"){

    //Get form data
    $formData = file_get_contents('php://input');
    $formObject = json_decode($formData);
    
    $email = $formObject -> email;
    $password = $formObject -> password;    
    
    // Validate credentials

    // Prepare a select statement
    $sql = "SELECT * FROM User WHERE email = :email";
    
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
                    $id = $row["userId"];
                    $username = $row["username"];
                    $hashed_password = $row["password"];
                    if(password_verify($password, $hashed_password)){
                        // Password is correct, so start a new session
                        // session_start();
                        
                        // Get team data for loged in user
                        $query = "SELECT * FROM UserTeam LEFT JOIN Team ON UserTeam.teamId=Team.teamId WHERE userId = :userId AND UserTeam.status = 'member'";
                        $stmt = $pdo->prepare($query);
                        $stmt -> bindParam(":userId", $param_id, PDO::PARAM_STR);

                        //Set parameters
                        $param_id  = $id;

                        // Execute query
                        $stmt -> execute();
                        $row = $stmt -> fetch();

                        // Check if the user has a team where the status is member 
                        if($stmt -> rowCount() > 0){
                            $teamName = $row["teamName"];

                        } else {
                            $teamName = null;
                        }

                        // Store data in session variables
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $id;
                        $_SESSION["username"] = $username;
                        $_SESSION["teamName"] = $teamName;
                          
                        
                        //Return login token
                        $response -> loggedIn = true;
                        $response -> userId = $id;
                        $response -> teamName = $teamName;
                  
                        
                        //Create a cookie for the logged in user
                        $cookieName = "user";
                        $cookie = new stdClass();
                        $cookie -> userId = $id;
                        $cookie -> logedIn = true;
                        $cookieValue = json_encode($cookie);
                        setCookie($cookieName, $cookieValue, time() + (86400 * 14), "/");
                        
                        //Send response
                        // echo json_encode($response);

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
 









