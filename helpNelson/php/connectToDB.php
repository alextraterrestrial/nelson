<?php

function getPDO() {
  // har ändrat till mitt DBnamn, bara att ändra tillbaka
  // return new PDO('mysql:host=localhost;dbname=newnelson','root','root');
  // return new PDO('mysql:host=localhost;dbname=244914-helpnelson','root','root');
  return new PDO('mysql:host=my56b.sqlserver.se;dbname=246642-helperik','246642_dh39215','AllHailErik666');
  // return new PDO('mysql:host=localhost;dbname=helperikny','root','root');
  // return new PDO('mysql:host=my88b.sqlserver.se;dbname=244914-helpnelson','244914_xd85104','AllHailNelson666');

}

$pdo = getPDO();
?>