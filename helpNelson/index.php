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
        <link rel="stylesheet" href="css/main.css">
        <link href="https://fonts.googleapis.com/css?family=Overpass+Mono&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39&display=swap" rel="stylesheet">
    </head>
  
    <body>
        <div class="wrapper">
            
            <?php //include("headerN.html")?>
            
            <!-- menu, containing the team-, user- and other settings and options -->
            <section Id="icon">
                <div>
                    <div class="circuit">
                        <img src="content/graphicResources/circuitIcon.png" class="logoButton"></img>
                    </div>
                </div>
            </section>
            <section id="menu">
                <!-- menu top -->
                <div id="menuHeader">
                    <div>
                        <div class="currentPlayer">
                            <div class="playerName">Linus</div>
                            <div>Points: <span class="playerPoints">28</span></div>
                            <div class="countDown">20:20:20 ska vara med?</div>
                        </div>
                        <div class="circuitRight"></div>
                    </div>
                </div> 
                
                <!-- option contatiner -->
                <div id="menuOptionContainer" class="flexAround">
                    <!-- <?php //include("html/menuOptionButton.html")?> -->
                </div>

                <!-- contains the  -->
                <div id="menuOptionContent">
                    <!-- <div class="testT1">test1 test1 test1</div> 
                    <div class="testT2">test2 test2 test2</div> 
                    <div class="testT3">test3 test3 test3</div>  -->
                </div>

                <div id="menuOptionActions">
            
                </div>

            </section>
            
            <!-- this section contains the welcome message and the current game -->
            <section id="home">
                <h1>Välkommen</h1>
                <p>lLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <!-- behövs knapparna? -->
                <div class="linkContainer">
                    <input class="inputClass" type="button" value="link 1">
                    <input class="inputClass" type="button" value="link 2">
                    <input class="inputClass" type="button" value="link 3">
                </div>
            
                <div id="secSpelet">
                    <!-- för att testa pussel -->
                    <?php //include("testPussel.html")?>
                </div>
            
            
            
            </section>



            <!-- kommer att göras om till moduler -->
            <!-- <section id="menuContent">
                <div id="secTeam" class="menuItem">
                   <?php //include("../team/team.html")?>
                </div>
                <div id="secArkiv" class="menuItem">spellog</div>
                <div id="secLogin" class="menuItem">
                    <?php include("html/login.html")?>
                </div>
                <div id="secRegistrering" class="menuItem">
                    <?php include("html/signupform.html") ?>
                </div>
            </section> -->
        <div>

        <script src="js/jquery-3.4.1.min.js"></script>
        <script src="js/node_modules/jquery-validation/dist/jquery.validate.min.js"></script>
        <script src="js/login.js"></script>
        <script src="js/signup.js"></script>
        <script src="js/controller.js"></script>
        <script src="js/userClass.js"></script>
        <script src="js/userFunctionality.js"></script> 
        <script src="js/linus.js"></script> 
        
        <!-- <script src="testContent.js"></script>
        <script src="auxFunctions.js"></script>
        <script src="header.js"></script>
        <script src="../login/login.js"></script>  
        <script src="game.js"></script>
        <script src="../team/team.js"></script>
    -->
    </body>
  </html>