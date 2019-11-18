<?php
//Get form data
$email = $_POST["email"];
$password = $_POST["password"];


$test = json_encode("Alex");
echo $email;

//Show server errors 'on'
ini_set('display_errors', 'on');

// Initialize the session
session_start();
 
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$email = $password = "";
$email_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate credentials

    // Prepare a select statement
    $sql = "SELECT id, email, password FROM users WHERE email = :email";
    
    if($stmt = $pdo->prepare($sql)){
        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
        
        // Set parameters
        $param_email = trim($_POST["email"]);
        
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
                        // session_start();
                        
                        // Store data in session variables
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $id;
                        $_SESSION["email"] = $email;                            

                        //Create a cookie for the loged in user

                        $cookieName = "user";
                        $cookie = new stdClass();
                        $cookie -> userId = $id;
                        $cookie -> logedIn = true;
                        $cookieValue = json_encode($cookie);
                        setCookie($cookieName, $cookieValue, 0);
                        echo $cookieValue;
 
                    } 
                }
            } else{
                // Display an error message if username doesn't exist
                $email_err = "Inget konto med mailadressen du angav fanns";
            }
        } else{
            echo "Ojdå, något gick fel...";
        }
    }
    
    // Close statement
    unset($stmt);

    // Close connection
    unset($pdo);
}
?>
 









