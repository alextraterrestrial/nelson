<?php


// Include config file
require_once "connectToDB.php";



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
        echo json_encode("Oops! Something went wrong. Please try again later.");
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
                    echo json_encode("Oops! This email is already registered.");
                    exit;
                }
            } else{
                echo json_encode("Oops! Something went wrong. Please try again later.");
                exit;
            }
        }
         
        // Close statement
        unset($stmt);
    }



    // Validate username
    if(empty(trim($username))){
        echo json_encode("Oops! You didn't enter a valid username");
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
                    echo json_encode("Oops! This username is already being used");
                    exit;
                } 
            } else{
                echo json_encode("Oops! Something went wrong. Please try again later.");
                exit;
            }
        }
         
        // Close statement
        unset($stmt);
    }
    
    // Validate password
    if(empty(trim($password))){
        echo json_encode("Oops! You didn't enter a valid password");   
        exit; 
    } elseif(strlen(trim($password)) < 6){
        echo json_encode("The password was too short");
        exit; 
    }
    
    // Validate confirm password
    if(empty(trim($passwordConfirm))){
        echo json_encode("Oops! Enter a confirm password");
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
                            }
                        }
                    }

                }
                //Set session
                // session_start();
                $_SESSION["userId"] = $id;
                $_SESSION["password"] = $param_password;

                //Set cookie
                //Create a cookie for the logged in user
                $cookieName = "user";
                $cookie = new stdClass();
                $cookie -> userId = $id;
                $cookie -> password = $param_password;

                $cookieValue = json_encode($cookie);
                setCookie($cookieName, $cookieValue, time() + (86400 * 14), "/");

                
                $response -> password = $param_password;
                $response -> userId = $id;

                echo json_encode($response);
            }
        } else{
            echo json_encode("Oops! Something went wrong. Please try again later.");
            exit;  
        }
    } else{
        echo "Oops... connection error";
    }
        
    // Close statement
    unset($stmt);
    
    // Close connection
    unset($pdo);
}
?>
 



       
