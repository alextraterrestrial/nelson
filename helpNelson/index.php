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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/intro.css">
        <link href="https://fonts.googleapis.com/css?family=Overpass+Mono&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39&display=swap" rel="stylesheet">
    </head>
  
    <body>
        <div class="wrapper">
            <!-- menu, containing the team-, user- and other settings and options -->
            <section Id="icon">
                <div>
                    <div class="circuit">
                        <img src="content/graphicResources/circuitIcon.png" class="logoButton">
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
                </div>

                <!-- contains the  -->
                <div id="menuOptionContent">
                </div>

                <div id="menuOptionActions">
            
                </div>

            </section>
            
            <!-- this section contains the welcome message and the current game -->
            <section id="home">
                
                <?php      
                include("html/home.html")
                // include("html/intro.html")
                ?> 
                
                


                
            
                <!-- this is just a filler, the $.load() will replace this later, comment this in to test team-stuff -->
                <!-- <div id="teamWrapper">
                    <div id="teamName"></div>
                    <div id="teamPoints"></div>
                    <h3>Members:</h3>
                    <div id="members"></div>

                <div id="availableUsers"></div>
                </div> -->
            
            
            </section>
        </div>
        <script src="js/puzzle.js"></script> 
        <script src="js/jquery-3.4.1.min.js"></script>
        <script src="js/node_modules/jquery-validation/dist/jquery.validate.min.js"></script>
        <script src="js/MenuOption.js"></script> 
        <script src="js/auxFunctions.js"></script> 
        
        <script src="js/team.js"></script>
        <script src="js/userClass.js"></script>
        <script src="js/userFunctionality.js"></script>
        <script src="js/login.js"></script>
        <script src="js/controller.js"></script>
    </body>
  </html>