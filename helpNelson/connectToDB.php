<?php

function getPDO() {
  // har ändrat till mitt DBnamn, bara att ändra tillbaka
  return new PDO('mysql:host=localhost;dbname=Nelson','root','root');
  // return new PDO('mysql:host=localhost:8889;dbname=244914-helpnelson','root','root');

}
?>