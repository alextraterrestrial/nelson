let allUsers;

function getUsers() {
  $.get("php/getUsers.php")
    .done(data => {
      console.log("executing getUsers");
      data = JSON.parse(data);
      users = data;
      let inTeam = users[0];
      allUsers = users[1];

      allUsers.forEach((a, i) => {
        inTeam.forEach(b => {
          if (a.username == b.username) {
            allUsers.splice(i, 1, b);
          }
        });
      });
      
      displayUserInfo();
      findPlayersProgram();

      // right now this needs a timeout to work, this will probably be removed when the function is moved to some initializing function that runs on refresh
      // setTimeout(() => {
        //   initializeTeam();
      // }, 1000);
    })
    .fail(error => {
      console.log(error);
    });
}

// WORKS - sends user data to DB => program respone function for requested user
function addUser(clickedUser, captain) {
  let team = captain.teamId;
  let requestedId = clickedUser.userId;

  $.get("php/sendRequest.php", { team: team, userId: requestedId })
    .done(data => {
      popup(data);
      console.log(data);
      getUsers();
    })
    .fail(error => {
      console.log(error);
    });
}

function updateTeam(action, team, memberToEffect) {
  console.log(action, team, memberToEffect);
  $.get("php/updateTeam.php", {
    action: action,
    team: team,
    member: memberToEffect
  })
    .done(data => {
      // popup(data)
      console.log(data);
      getUsers();
    })
    .fail(error => {
      console.log(error);
    });
}

// not in use as the moment
function popup(message) {
  let pop = $("<div>");
  pop.attr("class", "popup flex");
  pop.html(message);
  $("#secTeam").append(pop);
  setTimeout(() => {
    pop.remove();
  }, 1000);
}

let members;
// displays members in your team OR invitations if you're not in one
function displayUserInfo() {
  console.log("executing displayUserInfo");
  console.log(allUsers, loginToken);
  $("#members").empty();
  members = [];

  if (loginToken.status == "captain" || loginToken.status == "active") {
    for (let user of allUsers) {
      if (user.teamName == loginToken.teamName && user.status != "pending") {
        members.push(user);
      }
    }
    // console.log(members)

    // fill list of members (TC & ACTIVE)
    for (let member of members) {
      let memberSlot = $("<div>");
      memberSlot.attr("class", "flexAround");
      let alias = $("<div>");
      alias.html(member.username);
      $(memberSlot).append(alias);

      let status = $("<div>");
      status.html(member.status);
      $(memberSlot).append(status);

      let btnContainer
      btnContainer = $("<div>");
      btnContainer.attr("class", "flexAround");

      if (loginToken.status == "captain" && loginToken.id != member.userId) {
        

        let makeCaptain = $("<div>");
        makeCaptain.click(() => {
          updateTeam("updateCaptain", loginToken.teamId, member.userId);
        });
        makeCaptain.attr("class", "button flex");
        makeCaptain.css({ "margin-right": "5px" });
        makeCaptain.html("♕");
        $(btnContainer).append(makeCaptain);

      }
      
      if ((loginToken.status == "captain" && loginToken.id != member.userId) || (loginToken.status == "active" && loginToken.id == member.userId)) {
        let removeMember = $("<div>");
        removeMember.click(() => {
          updateTeam("removeMember", loginToken.teamId, member.userId);
        });
        removeMember.attr("class", "button flex");
        removeMember.html("X");
        $(btnContainer).append(removeMember);
  
        $(memberSlot).append(btnContainer);
      }
      
      
      $("#members").append(memberSlot);
    }

    displayAvaliableUsers();

    // shows invitations
  } else if (loginToken.status == "pending") {
    let invitations;
    $.get("php/getInvitations.php", { userId: loginToken.id })
      .done(data => {
        data = JSON.parse(data);
        console.log(data);
        invitations = data;

        // $("#teamWrapper > div:first-child").toggle()
        // $("#teamWrapper > div:last-child").toggle()

        // let prompt = $("<div>");
        // prompt.html("You have been invited to join the following teams:");
        // $("#teamWrapper").html(prompt);

        // for (let invite of invitations) {
        //   let invitationId = invite.teamId;
        //   let teamInvites = $("<div>");
        //   teamInvites.attr("class", "flexAround");

        //   let team = $("<h4>");
        //   team.html(invite.teamName);
        //   $(teamInvites).append(team);

        //   let accept = $("<div>");
        //   accept.click(() => {
        //     $.get("php/handleRequest.php", {
        //       action: "accept",
        //       team: invitationId,
        //       userId: loginToken.id
        //     })
        //       .done(data => {
        //         console.log(data);
        //         getUsers()
        //         // updatepuzzles()
                
        //       })
        //       .fail(error => {
        //         console.log(error);
        //       });
        //   });
        //   accept.html("ACCEPT");
        //   accept.attr("class", "button flex");
        //   accept.css({ padding: "0px 5px", width: "auto" });
        //   $(teamInvites).append(accept);

        //   let deny = $("<div>");
        //   deny.click(() => {
        //     $.get("php/handleRequest.php", {
        //       action: "deny",
        //       team: invitationId,
        //       userId: loginToken.id
        //     })
        //       .done(data => {
        //         console.log(data);
        //         getUsers();
        //         displayUserInfo();
        //       })
        //       .fail(error => {
        //         console.log(error);
        //       });
        //   });
        //   deny.html("DENY");
        //   deny.attr("class", "button flex");
        //   deny.css({ padding: "0px 5px", width: "auto" });
        //   $(teamInvites).append(deny);

        //   // $("#invites").append(teamInvites);
        //   $("#teamWrapper").append(teamInvites);
        // }
      })
    .fail((error) => {
      console.log(error)
    })
    // console.log(invitations)

    

    // if not invited or in a team, do this
  } else if (loginToken.status == null) {
    $("#teamMessage").remove();
    let prompt = $("<div>", { id: "teamMessage" });
    prompt.html("Please add users to form a team");
    // $("#teamMembers").css('justify-content', 'center')
    $("#teamWrapper").append(prompt);
  }
}

// displays all the users available to be invited by a captain
function displayAvaliableUsers() {
  // fill list of users
  $("#availableUsers").empty();
  for (let user of allUsers) {
    if (user.username != loginToken.username && user.status != "captain") {
      let availableUser = $("<div>");
      availableUser.attr("class", "flexAround");

      let userToAppend = $("<div>");
      userToAppend.html(user.username);
      let button = $("<div>");

      // button by users name, sends a request to the clicked user
      if (loginToken.status == "captain") {
        button.attr("class", "button flex");
        button.val(user.id);
        button.html(() => {
          if (loginToken.status != null) {
            switch (user.status) {
              case null:
                return "+";
              case "pending":
                return "?";
              case "active":
                return "✓";
              case "captain":
                return "♕";
            }
          } else {
            return "+";
          }
        });

        button.click(() => {
          if (
            user.status == null &&
            loginToken.status == "captain" &&
            members.length <= 2
          ) {
            button.html("?");
            addUser(user, loginToken);
          } else {
            popup("Cannot add user!");
          }
        });
      }

      availableUser.append(userToAppend, button);

      $("#availableUsers").append(availableUser);
    }
  }
}

function createTeam() {
  $("#createTeam").submit((e) =>{
    e.preventDefault()

    if($("#createTeam input[type='text']").val()) {
      $.get("php/createTeam.php", {teamName: $("#createTeam input[type='text']").val(), userId: loginToken.id})
      .done(data => {
        data = JSON.parse(data)
        console.log(data)

        if (data == "exists") {
          $("#teamWrapper > div:last-child > div:last:child").html("Det teamet finns redan. Kom på ett annat namn.")
        } else {
          loginToken.teamId = data[0].teamId
          loginToken.teamName = data[0].teamName
          loginToken.status = "captain"

          $("#teamWrapper > div:last-child").toggle()
          $("#teamWrapper > div:first-child").toggle()
          
          getUsers()
        }
      })
      .fail(()=>{
        console.log("fail")
      })
      
      //create Team
    } else {

      $("#teamWrapper > div:last-child > div:last:child").html("Skriv ert teamnamn.")
    }

  })
}


//teamsetup
function initializeTeam() {
  if(loginToken.teamId) {
    getUsers()
  } else {
    setTimeout(()=>{
      createTeam()
    }, 300)
  
  }
  
}

function findPlayersProgram() {
  $("#searchForPlayer input[type='button']").click(() => {
    $("#searchForPlayer input[type='text']").toggle();
    $("#availableUsers").toggle();

    if ($("#searchForPlayer input[type='button']").val() == "sök") {
      $("#searchForPlayer input[type='button']").val("Göm");
    } else {
      $("#searchForPlayer input[type='button']").val("sök");
    }
  });

  let t;
  $("#searchForPlayer input[type='text']").focus(() => {
    t = setInterval(() => {
      $("#availableUsers > div").css({ display: "none" });

      for (let i = 1; i <= $("#availableUsers").children().length; i++) {
        let val = $("#searchForPlayer input[type='text']")
          .val()
          .toLowerCase();

        if (
          $("#availableUsers > div:nth-child(" + i + ") > div")
            .html()
            .toLowerCase()
            .includes(val)
        ) {
          $("#availableUsers > div:nth-child(" + i + ")").css({
            display: "flex"
          });
        }
      }
    }, 800);
  });

  $("#searchForPlayer input[type='text']").focusout(() => {
    clearInterval(t);
  });
}

// functions to call on page-load
// getUsers();

// setInterval(() => {
//   displayUserInfo();
// }, 5000);
