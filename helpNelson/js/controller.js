// Imports
// import Menu from "./Menu.js";

//variables
let loginToken = null;
let menuOptionLoggedOff = [
  { label: "Logga in", content: $("<div>").load("html/login.html") },
  { label: "Skapa konto", content: $("<div>").load("html/signupform.html") }
];
let puzzles = [];

$(document).ready(() => {
  init();

  //TEST FOR MOBILE console
  // $(":root").css({"--color2": "red"})
});

function init() {
  //Check if user has been logged in recently
  // if (loginToken != null) {
  //   console.log(loginToken);
  // } else {
  //   checkCookie();
  // }
  // loadMenu();
  checkUser();
  // Display menu and user data

  countDown();
}

function checkUser() {
  checkCookie().then(res => {
    //When login is complete
    console.log("done checking cookie");
    console.log(loginToken);
    // Load menu
    loadMenu();

    // Load player data, team data etc
    getUsers();

    //Load the puzzle
    puzzles = getPuzzles();
  });
}

function checkCookie() {
  return new Promise((resolve, reject) => {
    var name = "user=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    var cookie;

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
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
          encode: true
        })
          .done(res => {
            console.log(res);
            let parsedRes = JSON.parse(res);
            console.log(JSON.parse(res));

            // Create a user
            loginToken = new User(parsedRes);

            resolve();
            // createUser(parsedRes.userId, parsedRes.password).then(data => {
            //   console.log(loginToken);
            //   resolve(res);
            // });
          })
          .fail(res => {
            reject(res);
          });
        break;
      }
      // If no cookie is found -> Resolve
      if (i == ca.length - 1) {
        resolve();
      }
    }
  });
}

/**
 * Clears cookie and logs out user
 */
function logOut() {
  // Variables
  let request;

  // Set loginToken to null
  loginToken = null;

  //Send request to logout.php
  request = $.ajax({
    url: "php/logout.php",
    type: "POST"
  }).done(res => {
    // Load menu
    init();
    console.log(res);

    // Call init function to restart
    init();
  });
}

//creates the menu from the passed in array of objects
function loadMenu() {
  //Clear menu
  $("#menuOptionContainer").empty();
  console.log("oading menu");

  const menuOptionsBasic = [
    { label: "Logga in", content: $("<div>").load("html/login.html") },
    { label: "Skapa konto", content: $("<div>").load("html/signupform.html") }
  ];

  const menuOptionsUser = [
    { label: "Team", content: $("<div>").load("html/teamSnippet.html") },
    {
      label: "Min profil",
      content: $("<div>").html(
        "Här kommer profilsidan var där man kan logga ut och ev byta lösenord."
      )
    }
  ];
  let renderOptions;

  if (loginToken === null) {
    // Load menu for NOT logged in users
    renderOptions = menuOptionsBasic;
    console.log("loginToken is null");
  } else if (loginToken != null) {
    console.log("Not null");
    // Load menu for logged in users
    renderOptions = menuOptionsUser;
  }

  console.log(renderOptions);
  renderOptions.forEach(item => {
    let opt = new MenuOption(item.label, item.content);
    if (item.label == "Logga in" || item.label == "Team") {
      opt.iconContainer.click();
    }
  });
}
// Toggle between showing and hiding the menu
function toggleMenu() {
  if ($("body").width() < 601) {
    let val;
    if ($("#menu").css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
      val = "-100vw";
    } else {
      val = "0vw";
    }

    $("#menu").css({
      transform: "translateX(" + val + ")",
      "-webkit-transform": "translateX(" + val + ")"
    });
  }
}

// Event handling
//Logout function, testing only
$("#testLogout").click(() => {
  console.log("asdlkasd");
});

//click events for Icon and menu
$(".logoButton").click(toggleMenu);

// $(".logoButton").click(() => {
//   let val;
//   if ($("#menu").css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
//     val = "-100vw";
//   } else {
//     val = "0vw";
//   }

//   $("#menu").css({
//     transform: "translateX(" + val + ")",
//     "-webkit-transform": "translateX(" + val + ")"
//   });

//   // if ($("#menu").css("display")=="none") {
//   //     $("#menu").css({display: "block"})
//   // } else {
//   //     $("#menu").css({display: "none"})
//   // }
// });
