let loginToken = null;
$(document).ready(() => {
    init();

})


function init() {

    //Check if user has been logged in recently 
    if (loginToken) {
        console.log(loginToken)

    } else if (checkCookie() != null) {
        console.log("Checking cookie");
        checkCookie();

        //Validate credentials against DB

    }
    // Display menu and user data

    //Create menu
}

function checkCookie() {
    console.log("Checking cookie");
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
            console.log("In checkCookie if...")
            cookie = JSON.parse(c.substring(name.length, c.length));

            // Validate credentials against Db
            request = $.ajax({
                    url: "php/login.php",
                    type: "POST",
                    encode: true,
                })
                .done((res) => {
                    console.log(JSON.parse(res));
                    return JSON.parse(res);
                })
        }
    }
    return null;
}