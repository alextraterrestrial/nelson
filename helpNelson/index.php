<?php

function loadPuzzle(){
    $releaseDate = "2020-03-12 10:00:00";
    $releaseTimestamp = new DateTime($releaseDate);
    $currentTimestamp = new DateTime();

    if($currentTimestamp > $releaseTimestamp){
        include("html/home.html");
    } else{
        include("html/intro.html");
    }
}

?>


<html>
    <head>
        <title>Help Erik</title>
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
        <link rel="stylesheet" href="https://use.typekit.net/epf5kaq.css">
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-160980162-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-160980162-1');
        </script>

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
                            <div class="playerName"></div>
                            <div class="playerPoints">Points: <span>ss</span></div>
                            <div class="countDown"></div>
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
                <h1>Help Erik</h1>
                <h4>Äntligen, nu kör vi igen!</h4>
                <p>
                 För er som är nya här så heter jag Erik och är universitetslektor på Malmö Universitet. Det här spelet är inte skapat av mig, utan av AI:n Athena!
Artificiell intelligens behöver kunskap genom information och data för att kunna fungera och utvecklas. Nu hjälps vi åt för att samla kunskap till Athena! 

Första omgången av quizet handlar om Internetkultur, något jag verkligen behöver hjälp med att svara på. Så var med den 16 april, klockan 15.00 för då kör quizet igång!
                </p>
                <p></p>
                <p>Håll er uppdaterad på min instagram <span ><a class="link" href="https://www.instagram.com/helperik/?hl=sv">@helperik</a></span></p>
                <a class="link" href="https://www.facebook.com/events/507725873240037/"><p>https://www.facebook.com/events/507725873240037/</p></a>
                <?php      
                // loadPuzzle();
                ?> 
                <div id="game"></div>
            </section>
        </div>
        <!-- <script src="js/puzzle.js"></script>  -->
        <script src="js/challenge2/challenge2.js"></script> 
        <script src="js/jquery-3.4.1.min.js"></script>
        <script src="js/node_modules/jquery-validation/dist/jquery.validate.min.js"></script>
        <script src="js/MenuOption.js"></script> 
        <script src="js/auxFunctions.js"></script> 
        
        <script src="js/team.js"></script>
        <script src="js/userClass.js"></script>
        <script src="js/userFunctionality.js"></script>
        <script src="js/login.js"></script>
        <script src="js/signup.js"></script>
        <script src="js/controller.js"></script>
    </body>
  </html>