$(document).ready(() => {
    let loginToken;

    init();

})



function init() {

    checkCookie()

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

            createUser(cookie.id, cookie.password);
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return null;
}