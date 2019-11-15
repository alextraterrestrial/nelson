//när spelaren loggat in engång så sparas inloggning och vi sparar "player Id"? som vi i sin tur hämtar namn, team och poäng med.

function updatePlayer(obj) {
    //kolla session/ cookies efter id och behöver i så fall inte ges som ett argument?

    $(".playerName").html(obj.name)

    if (obj.teamName) {
        $(".teamName").html(obj.teamName)
    } else {
        console.log(obj.teamName)
    }

    $(".playerPoints").html(obj.points)


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

    div.click(() => {
        $("section").css({ display: "none" })
        $("#sec" + action).css({ display: "block" })

        // if(screen.width< 600) {
        //   $("#navMeny").toggle(200)
        // }
    })

    $("#navMeny").append(div)
}

function createMeny(arr) {
    for (let i = 0; i < arr.length; i++) {
        createMenyAction(arr[i])
    }
}













//Variables
let menyActions = ["Spelet", "Team", "arkiv"]
//"Spelet" måste vara först i arrayen

// let menyActions = ["Spelet", "Logga in"]
let timeLeft = 14644
let menySwich = 0




//Events
$(".circuit img").click(() => {
    if (screen.width < 600 && !menySwich) {
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
    } else if(screen.width < 600) {
        $("#headerNav").css({
            backgroundColor: "initial",
            transition: "width .2s linear .2s",
            width: "17vw"
        })
        $("#navMeny, .rightHeader").css({
            transition: "transform .2s linear 0s",
            transform: "scalex(0)"
        })
        menySwich = 0
    }

})


//directCode
updatePlayer(player)

createMeny(menyActions)
countDown(timeLeft, function() { test("works") })