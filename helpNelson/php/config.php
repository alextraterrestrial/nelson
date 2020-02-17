<?php
    // Database credentials
    define('DB_SERVER', 'localhost:8889');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', 'root');
    define('DB_NAME', 'newnelson');

    // define('DB_SERVER', 'my88b.sqlserver.se');
    // define('DB_USERNAME', '244914_xd85104');
    // define('DB_PASSWORD', 'AllHailNelson666');
    // define('DB_NAME', '244914-helpnelson');
    
    /* Attempt to connect to MySQL database */
    try{
        // $pdo = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
        $pdo = new PDO('mysql:host=localhost;dbname=newnelson','root','root');
        // Set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       
    } catch(PDOException $e){
        die("ERROR: Could not connect. " . $e->getMessage());
        echo "Error";
        
    }
