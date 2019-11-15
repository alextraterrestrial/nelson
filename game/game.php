<html>
    <head>
        <title>Nelson</title>
        <meta charset="utf-8" />
        <?php require('../login/bootstrap.html')?>
        <link rel="stylesheet" href="cssHeader.css">
        <link rel="stylesheet" href="game.css">


        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">


        <link href="https://fonts.googleapis.com/css?family=Overpass+Mono&display=swap" rel="stylesheet">
    </head>
  
    <body>
        <?php include("headerNav.html")?>
        <section id="secTeam">team</section>
        <section id="secSpellogg">spellog</section>
        <section id="secSpelet">
            <?php include("game.html")?>
        </section>
        <section id="secLogin">
            <?php include("../login/login.php")?>
        </section>


      <script src="jquery-3.4.1.min.js"></script>
      <script src="testContent.js"></script>
      <script src="auxFunctions.js"></script>
      <script src="header.js"></script>

      <script src="game.js"></script>

    </body>
  
  </html>