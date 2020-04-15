<?php


// Include config file
require_once "connectToDB.php";

$response = new stdClass();

if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Processing form data when form is submitted
    $formData = file_get_contents('php://input');
    $formObject = json_decode($formData);
    
    $email = $formObject -> email;
    $password = $formObject -> password; 
    $username = $formObject -> username;
    $passwordConfirm = $formObject -> passwordConfirm;
 
    // Validate email
    if(empty(trim($email))){
        $response -> errors = "Oops! Something went wrong. No email provided. Please try again later.";
        echo json_encode($response);
        exit;
    } else{
        // Prepare a select statement
        $sql = "SELECT email FROM User WHERE email = :email";
        
        if($stmt = $pdo->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
            
            // Set parameters
            $param_email = trim($email);
            
            // Attempt to execute the prepared statement
            if($stmt->execute()){
                if($stmt->rowCount() == 1){
                    $response -> errors = "Oops! This email is already registered.";
                    echo json_encode($response);
                    exit;
                }
            } else{
                $response -> errors = "Oops! Something went wrong with the connection to the db. Please try again later.";
                echo json_encode($response);
                exit;
            }
        }
         
        // Close statement
        unset($stmt);
    }



    // Validate username
    if(empty(trim($username))){
        $response -> errors = "Oops! You didn't enter a valid username";
        echo json_encode($response);
        exit;
    } else{
        // Prepare a select statement
        $sql = "SELECT username FROM User WHERE username = :username";
        
        if($stmt = $pdo->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(":username", $param_username, PDO::PARAM_STR);
            
            // Set parameters
            $param_username = trim($username);
            
            // Attempt to execute the prepared statement
            if($stmt->execute()){
                if($stmt->rowCount() == 1){
                    $response -> errors = "Oops! This username is already being used";
                    echo json_encode($response);
                    exit;
                } 
            } else{
                $response -> errors = "Oops! Something went wrong when connecting to the db. Please try again later.";
                echo json_encode($response);
                exit;
            }
        }
         
        // Close statement
        unset($stmt);
    }
    
    // Validate password
    if(empty(trim($password))){
        $response -> errors = "Oops! You didn't enter a valid password";
        echo json_encode($response);
     
        exit; 
    } elseif(strlen(trim($password)) < 6){
        $response -> errors = "The password was too short";
        echo json_encode($response);
      
        exit; 
    }
    
    // Validate confirm password
    if(empty(trim($passwordConfirm))){
        $response -> errors = "Oops! Enter a confirm password";
        echo json_encode($response);
        
        exit;    
    } 
    
    // Check input errors before inserting in database
    // Prepare an insert statement
    $sql = "INSERT INTO User (email, username, password) VALUES (:email, :username, :password)";
        
    if($stmt = $pdo->prepare($sql)){
        
        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
        $stmt->bindParam(":username", $param_username, PDO::PARAM_STR);
        $stmt->bindParam(":password", $param_password, PDO::PARAM_STR);
        
        // Set parameters
        $param_email = $email;
        $param_username = $username;
        $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
        
        // Attempt to execute the prepared statement
        if($stmt->execute()){
            if($stmt->rowCount() == 1){
                $response = new stdClass();

                // Query the row that was inserted
                $sql = "SELECT * FROM User WHERE email = :email";
                if($stmt = $pdo->prepare($sql)){
                    $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);

                    if($stmt->execute()){
                        if($stmt->rowCount() == 1){
                            // Get id from inserted row
                            if($row = $stmt->fetch()){
                                $id = $row['userId'];
                                $username = $row['username'];
                                $score = $row['score'];
                                $dateReg = $row['dateReg'];
                            }
                        }
                    }

                }
                //Set session
                // session_start();
                $_SESSION["userId"] = $id;
                $_SESSION["password"] = $param_password;
                $_SESSION["username"] = $username;
                $_SESSION['score'] = $score;
                $_SESSION['dateReg'] = $dateReg;

                //Set cookie
                //Create a cookie for the logged in user
                $cookieName = "user";
                $cookie = new stdClass();
                $cookie -> userId = $id;
                $cookie -> password = $param_password;

                $cookieValue = json_encode($cookie);
                setCookie($cookieName, $cookieValue, time() + (86400 * 14), "/");

                $response -> email = $email;
                $response -> password = $param_password;
                $response -> userId = $id;
                $response -> username = $username;
                $response -> score = $score;
                $response -> dateReg = $dateReg;
                $response -> teamId = null;
                $response -> teamName = null;
                $response -> status = null;  

                echo json_encode($response);
            }
        } else{
            $response -> errors = "Oops! Something went wrong. Could not insert user into db. Please try again later.";
            echo json_encode($response);
            exit;  
        }
    } else{
        $response -> errors = "Oops... connection error";
        echo json_encode($response);
    }
        
    // Close statement
    unset($stmt);
    
    // Close connection
    unset($pdo);
}
?>
 



       
