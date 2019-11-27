<?php

function connectDB() {
  // har ändrat till mitt DBnamn, bara att ändra tillbaka
  return new PDO('mysql:host=localhost;dbname=Nelson','root','root');

}
?>