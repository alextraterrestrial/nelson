<?php
// Initialize the session
session_start();
 
// Unset all of the session variables
$_SESSION = array();
 
// Destroy the session.
session_destroy();
 
//Remove cookie
setCookie("user", null, time() - 3600, "/");

echo json_encode(true); 
exit;
?>