//variables
let loginToken = null;
let menuOptionLoggedOff = [
    {label: "Logga in", content: $("<div>").load("html/login.html")},
    {label: "Skapa konto", content: $("<div>").load("html/signupform.html")}
]


$(document).ready(() => {
    init();

    loadMenu(menuOptionLoggedOff)
    //TEST FOR MOBILE
    $(":root").css({"--color2": "red"})
})

function init() {
    // let cookie = checkCookie();
    // console.log(cookie)
    //Check if user has been logged in recently 
    if (loginToken != null) {
        console.log(loginToken)

    } else {
        checkCookie();
        // console.log("In the else if ");
    }
    // Display menu and user data


    //Create menu
}

function checkCookie() {
    // console.log("Checking cookie");
    var name = "user=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var cookie;

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            let pattern = /[+]/g;
            c = c.replace(pattern, " ");
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            // console.log("In checkCookie if...")
            cookie = JSON.parse(c.substring(name.length, c.length));

            // Validate credentials against Db
            request = $.ajax({
                    url: "php/login.php",
                    type: "GET",
                    encode: true,
                })
                .done((res) => {
                    let parsedRes = JSON.parse(res)
                    console.log(JSON.parse(res));

                    // Create a user
                    createUser(parsedRes.userId, parsedRes.password)

                    // return parsedRes;
                })
        }
    }
    // return null;
}
/** 
 * Clears cookie and logs out user
 */
function logOut() {
    // Variables
    let request

    // Set loginToken to null
    loginToken = null

    //Send request to logout.php
    request = $.ajax({
            url: "php/logout.php",
            type: "POST"
        })
        .done(res => {
            console.log(res)

            // Call init function to restart
            init()
        })
}

//creates the menu from the passed in array of objects
function loadMenu(arr) {
    arr.forEach((item) => {
        let o = new MenuOption(item.label, item.content)
        if (item.label == "Logga in" || item.label == "Team") {
            o.iconContainer.click()
        }
    })

}



//click events for Icon and menu

$(".logoButton").click(() => {
    let val
    if ($("#menu").css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
        val = "-100vw"
    } else {
        val = "0vw"
    }

    $("#menu").css({ 
        transform: "translateX(" + val + ")",
        "-webkit-transform": "translateX(" + val + ")" 
    })


    // if ($("#menu").css("display")=="none") {
    //     $("#menu").css({display: "block"})
    // } else {
    //     $("#menu").css({display: "none"})
    // }
})