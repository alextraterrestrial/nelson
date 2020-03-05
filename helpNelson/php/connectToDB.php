<?php

function getPDO() {
  // har ändrat till mitt DBnamn, bara att ändra tillbaka
  // return new PDO('mysql:host=localhost;dbname=newnelson','root','root');
<<<<<<< HEAD
  return new PDO('mysql:host=localhost;dbname=244914-helpnelson','root','root');
  // return new PDO('mysql:host=my88b.sqlserver.se;dbname=246642-helperik','246642_dh39215','AllHailErik666');
=======
  return new PDO('mysql:host=localhost;dbname=helperik','root','root');
  // return new PDO('mysql:host=my88b.sqlserver.se;dbname=244914-helpnelson','244914_xd85104','AllHailNelson666');
>>>>>>> 51d5b0f64884df65863a25d8330096bdd1e823e1

}

$pdo = getPDO();
?>