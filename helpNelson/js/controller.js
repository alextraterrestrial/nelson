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

  // Adding event listeners
  //Icon and menu
  $(".logoButton").click(toggleMenu);
});

function init() {
  //Check if user is logged in or not
  checkUser();

  //Load info
  // countDown();
}

function checkUser() {
  checkCookie().then(res => {
    //When login is complete
    // console.log("done checking cookie");
    // console.log(loginToken);
    // Load menu
    loadMenu();
    initializeTeam();

    // Load player data, team data etc

    //Load the puzzle
    // getPuzzles();

    //send team-id if it exists.
    // if (loginToken) {
    //   getChallenge2(loginToken.teamId);
    // } else {
    //   getChallenge2();
    // }
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
            // console.log(res);
            let parsedRes = JSON.parse(res);
            // console.log(JSON.parse(res));

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
    // console.log(res);

    // Call init function to restart
    // init();
    location.reload();
  });
}

//creates the menu from the passed in array of objects
function loadMenu() {
  //Clear menu
  $("#menuOptionContainer").empty();
  $("#menuOptionContent").empty();
  // console.log("oading menu");

  //Clear header profile info
  $(".playerName").empty();
  $(".playerPoints span").empty();

  const menuOptionsBasic = [
    {
      label: "Logga in",
      content: $("<div>").load("html/login.html", () => {
        addLoginListener();
      }),
      icon: "loginIcon.png"
    },
    {
      label: "Skapa konto",
      content: $("<div>").load("html/signupform.html", () => {
        addSignupListener();
      }),
      icon: "registerIcon.png"
    }
  ];

  const menuOptionsUser = [
    {
      label: "Team",
      content: $("<div>").load("html/teamSnippet.html"),
      icon: "teamIcon.png"
    },
    {
      label: "Min profil",
      content: $("<div>").load("html/profile.html"),
      icon: "userIcon.png"
    }
  ];
  let renderOptions;

  if (loginToken === null) {
    // Load menu for NOT logged in users
    renderOptions = menuOptionsBasic;

    // console.log("loginToken is null");
  } else if (loginToken != null) {
    // Load menu for logged in users
    renderOptions = menuOptionsUser;

    // Update profile in header
    $(".playerName").html(loginToken.username);
    $(".playerPoints span").html(loginToken.score);
  }

  // console.log(renderOptions);
  renderOptions.forEach(item => {
    let opt = new MenuOption(item.label, item.content, item.icon);
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
