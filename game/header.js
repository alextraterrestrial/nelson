//när spelaren loggat in engång så sparas inloggning och vi sparar "player Id"? som vi i sin tur hämtar namn, team och poäng med.
// Kontrollera om användaren är inloggad genom att hämta cookie
$(document).ready(() => {
    checkUser();
});

//Variables

// Token that holds the an object for the logged in user, otherwise null.
let loginToken = null;

let timeLeft = 14644
let menySwich = 0


function checkUser() {
    let menuActions;

    if (getCookie("user")) {
        loginToken = getCookie("user");

        // Skapa menyn för inloggade användare
        menuActions = ["Team", "Arkiv", "Logga ut"]

    } else {
        // Skapa menyn för icke inloggade användare
        menuActions = ["Login", "Registrering"];
    }
    updatePlayer(loginToken);
    createMeny(menuActions)
}

function displayHeader() {
    if ($("body").width() < 600 && !menySwich) {
        $("#headerNav").css({
            backgroundColor: "var(--backgroundColor)",
            transition: "width .2s",
            width: "100vw"
        })
        $("#navMeny, .rightHeader").css({
            transition: "transform .3s linear .2s",
            transform: "scalex(1)"
        })
        menySwich = 1
    } else if ($("body").width() < 600) {
        $("#headerNav").css({
            backgroundColor: "initial",
            transition: "width .2s linear .2s",
            width: "17vw"
        })
        $("#navMeny, .rightHeader").css({
            transition: "transform .2s linear 0s",
            transform: "scalex(0)"
        })
        getBackToHomePage()
        menySwich = 0
    }
}

function getBackToHomePage() {
    $(".menyItem").css({ display: "none" })
    $("#menyContent").css({ display: "none" })

    //Remove any messageContainer
    $("#messageContainer").remove();
}

function updatePlayer(obj) {
    if (obj != null) {

        $(".playerName").html(obj.username)

        if (obj.teamName) {
            $(".teamName").html(obj.teamName)
        } else {
            console.log(obj.teamName)
        }

        $(".currentPlayer div:last-child").show();
        $(".playerPoints").html(obj.score)
    } else {

        // Remove 
        $(".playerName").html("");
        $(".teamName").html("");
        $(".playerPoints").html("");
        $(".currentPlayer div:last-child").hide();
    }


}

function countDown(time, endAction) {
    let timeLeft = getHourMinSecArray(time)
    $(".countDown").html(timeLeft[0] + ":" + timeLeft[1] + ":" + timeLeft[2])

    let count = setInterval(() => {
        time--
        timeLeft = getHourMinSecArray(time)

        if (!time) {
            clearInterval(count)
            endAction()
        }
        $(".countDown").html(timeLeft[0] + ":" + timeLeft[1] + ":" + timeLeft[2])
    }, 1000);
}

function createMenyAction(action) {
    let div = $("<div>")
    div.html(action)
    if (action == "Logga ut") {
        div.click(() => {
            // Call the log out function
            logOut();
        })
    } else {
        div.click(() => {
            $(".menyItem").css({ display: "none" })
            $("#menyContent").css({ display: "block" })
            $("#sec" + action).css({ display: "block" })

        })
    }


    $("#navMeny").append(div)
}

function createMeny(arr) {
    $("#navMeny").empty();
    for (let i = 0; i < arr.length; i++) {
        createMenyAction(arr[i])
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            let pattern = /[+]/g;
            c = c.replace(pattern, " ");
            c = c.substring(1);

        }

        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return null;
}



//Events
$(".circuit img").click(() => {
    displayHeader()
})

$("#menyContent").click((e) => {
    if (e.target.id == "menyContent") {
        getBackToHomePage()
        displayHeader()
    }
})

//directCode

countDown(timeLeft, function() { test("works") })

// Log out function
const logOut = () => {
    $.ajax({
            url: "../login/logout.php",
            type: "POST",
            encode: true,
            beforeSend: function() {
                //Create spinner

                //Show spinner

            }
        })
        .done(res => {
            // Empty loginToken
            loginToken = null;


            //Create logout message
            $("<div id='messageContainer' class='menyItem'>Du är nu utloggad</div>").appendTo("#menyContent");

            //Display it
            $("#menyContent").css({ display: "block" })
            $("#messageContainer").css({ display: "block" })

            //Update menu
            checkUser();
        })
}