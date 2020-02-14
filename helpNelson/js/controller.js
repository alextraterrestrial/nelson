// Imports
// import Menu from "./Menu.js";

//variables
let loginToken = null;
let menuOptionLoggedOff = [
    { label: "Logga in", content: $("<div>").load("html/login.html") },
    { label: "Skapa konto", content: $("<div>").load("html/signupform.html") }
]

//test


$(document).ready(() => {
    init();

    //check if logged in 
    // loadM:q
    //bör köras i .done efter att vi hämtat användarinfo till loginToken



    //TEST FOR MOBILE console
    // $(":root").css({"--color2": "red"})
})

function init() {

    //Check if user has been logged in recently 
    if (loginToken != null) {
        console.log(loginToken)

    } else {
        checkCookie();
    }
    // Display menu and user data
    loadMenu();
    getPuzzles();
}

function checkCookie() {
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

            cookie = JSON.parse(c.substring(name.length, c.length));
            let request;
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
    // Create an instance of the menu class
    // const menu = new Menu();

    const menuOptionsBasic = [
        { label: "Logga in", content: $("<div>").load("html/login.html") },
        { label: "Skapa konto", content: $("<div>").load("html/signupform.html") }
    ]

    const menuOptionsUser = [
        { label: "Team", content: $("<div>").load("html/login.html") },
        { label: "Min profil", content: $("<div>").load("html/signupform.html") }
    ]
    let renderOptions;

    if (loginToken == null) {
        // Load menu for NOT logged in users
        renderOptions = menuOptionsUser
    } else if (loginToken != null) {
        // Load menu for logged in users
        renderOptions = menuOptionsBasic;
    }

    renderOptions.forEach((item) => {
        let opt = new MenuOption(item.label, item.content)
        if (item.label == "Logga in" || item.label == "Team") {
            opt.iconContainer.click()
        }
    })

}


// Event handling
//Logout function, testing only
$("#testLogout").click(() => {
    console.log("asdlkasd")
});


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