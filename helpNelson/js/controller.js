let loginToken = null;
$(document).ready(() => {


    init();

})


function init() {

    //Check if user has been logged in recently 
    if (loginToken) {


    } else if (checkCookie()) {
        console.log(checkCookie())
            //Validate credentials against DB

    } else {

    }


    // Display menu and user data

    //Create menu
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

            // Validate credentials against Db
            request = $.ajax({
                    url: "php/login.php",
                    type: "POST",
                    encode: true,
                })
                .done((res) => {
                    return JSON.parse(c.substring(name.length, c.length));
                })
        }
        return null;
    }
}