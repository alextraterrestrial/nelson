<html>
    <head>
        <title>Nelson</title>
        <meta charset="utf-8"/>
        <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
        />
        <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"
        ></script>
        <script
            src="https://code.jquery.com/jquery-3.4.1.js"
            integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
            crossorigin="anonymous"
        ></script>
        <!-- <link rel="stylesheet" href="../CSS/cssGeneral.css">
        <link rel="stylesheet" href="cssHeader.css">
        <link rel="stylesheet" href="game.css">
        <link rel="stylesheet" href="../team/team.css">
        <link rel="stylesheet" href="../CSS/p.css"> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=Overpass+Mono&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39&display=swap" rel="stylesheet">
    </head>
  
    <body>
        <div class="wrapper">
            <?php //include("headerNav.html")?>
            <section id="home">
                <h1>Välkommen</h1>
                <p>lLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div class="linkContainer">
                    <input class="inputClass" type="button" value="link 1">
                    <input class="inputClass" type="button" value="link 2">
                    <input class="inputClass" type="button" value="link 3">
                </div>
            </section>
            <section id="secSpelet">
                <!-- för att testa pussel -->
                <?php //include("testPussel.html")?>
            </section>
            <section id="menyContent">
                <div id="secTeam" class="menyItem">
                   <?php //include("../team/team.html")?>
                </div>
                <div id="secArkiv" class="menyItem">spellog</div>
                <div id="secLogin" class="menyItem">
                    <?php include("html/login.html")?>
                </div>
                <div id="secRegistrering" class="menyItem">
                    <?php include("html/signupform.html") ?>
                </div>
            </section>
        <div>

        <script src="jquery-3.4.1.min.js"></script>
        <script src="js/login.js"></script>
        <script src="js/controller.js"></script>

        <!-- <script src="../login/node_modules/jquery-validation/dist/jquery.validate.min.js"></script>
        <script src="testContent.js"></script>
        <script src="auxFunctions.js"></script>
        <script src="header.js"></script>
        <script src="../login/login.js"></script>  
        <script src="game.js"></script>
        <script src="../team/team.js"></script>  -->
        <script src="js/userClass.js"></script>
        <script src="js/userFunctionality.js"></script>
    </body>
  </html>