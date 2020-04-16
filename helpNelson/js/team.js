let allUsers;
let members

function getUsers() {
  $.get("php/getUsers.php", {teamId: loginToken.teamId})
    .done(data => {
      // console.log("executing getUsers");
      data = JSON.parse(data);
      users = data;
      members = users[0];


      displayUserInfo();
    })
    .fail(error => {
      // console.log(error);
    });
}

// WORKS - sends user data to DB => program respone function for requested user
function addUser(clickedUser, captain) {
  let team = captain.teamId;
  let requestedId = clickedUser.userId;

  $.get("php/sendRequest.php", { team: team, userId: requestedId })
    .done(data => {
      popup(data);
      // console.log(data);
      getUsers();
    })
    .fail(error => {
      // console.log(error);
    });
}

function updateTeam(action, team, memberToEffect) {
  // console.log(action, team, memberToEffect);
  $.get("php/updateTeam.php", {
    action: action,
    team: team,
    member: memberToEffect
  })
    .done(data => {
      // popup(data)
      // console.log(data);
      init();
    })
    .fail(error => {
      // console.log(error);
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

// displays members in your team OR invitations if you're not in one
function displayUserInfo() {
  // console.log("executing displayUserInfo");
  // console.log(allUsers, loginToken);
  $("#members").empty();
  $("#findPlayerContainer").css({display: "none"})

  if (loginToken.status == "captain" || loginToken.status == "active") {
    $("#teamName").html(loginToken.teamName);

    // fill list of members (TC & ACTIVE)
    for (let member of members) {
      //name of player
      let memberSlot = $("<div>");
      memberSlot.attr("class", "flexList");
      let alias = $("<div>");
      alias.html(member.username);
      $(memberSlot).append(alias);

      let statusValue;

      if (member.status == "captain") {
        statusValue = "Teamledare";
      } else if (member.status == "active") {
        statusValue = "Medlem";
      }

      //player status
      let status = $("<div>");
      status.html(statusValue);
      $(memberSlot).append(status);


      let btnContainer;
      btnContainer = $("<div>");
      btnContainer.attr("class", "flexstart");
      $(memberSlot).append(btnContainer);

      //make capain button
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

      //remove member
      if ((loginToken.status == "captain" && loginToken.id != member.userId) ||
        (loginToken.status == "active" && loginToken.id == member.userId)) {
        let removeMember = $("<div>");
        removeMember.click(() => {
          updateTeam("removeMember", loginToken.teamId, member.userId);
        });
        removeMember.attr("class", "button flex");
        removeMember.html("X");
        $(btnContainer).append(removeMember);


        // status.css({
        //   flexGrow: 2
        // })
        
      }

      //remove teamButton
      

      $("#members").append(memberSlot);
    }
  }

  if (loginToken.status == "captain") {

    if(members.length < 2) {
      $("#findPlayerContainer").css({display: "block"})
      findPlayersProgram();
    }
    removeTeamProgram()
  } else {
    // console.log("done?");
    $("#findPlayerContainer").css({ display: "none" });
  }

 
}

// displays all the users available to be invited by a captain
function displayAvaliableUsers() {
  $.get("php/getUsers.php", {teamId: loginToken.teamId})
    .done(data => {
      // console.log("executing getUsers");
      data = JSON.parse(data);
      allUsers = data[1];

      $("#availableUsers").empty();
  for (let user of allUsers) {
    if (user.username != loginToken.username && user.status != "captain") {
      let availableUser = $("<div>");
      availableUser.attr("class", "flexBetween");

      let userToAppend = $("<div>");
      userToAppend.html(user.username);
      let button = $("<div>");

      // button by users name, sends a request to the clicked user
      if (loginToken.status == "captain") {
        button.attr("class", "button flex");
        button.val(user.id);
        button.html(() => {
          if (loginToken.status != null) {
            // console.log(user.status);
            switch (user.status) {
              case null || undefined:
                return "bjud in";
              case "pending":
                return "inbjuden";
              case "active":
                return loginToken.teamName;
              case "captain":
                return "loginToken.teamName";
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
    })
    .fail(error => {
      // console.log(error);
    });
  // fill list of users
  
}

function createTeam() {
  $("#createTeam").submit(e => {
    e.preventDefault();

    if ($("#createTeam input[type='text']").val()) {
      $.get("php/createTeam.php", {
        teamName: $("#createTeam input[type='text']").val(),
        userId: loginToken.id
      })
        .done(data => {
          // console.log(data);
          

          if (data == "exists") {
            $("#createTeamMessage").html(
              "Det teamet finns redan. Kom på ett annat namn."
            );
          } else {
            data = JSON.parse(data);
            
            loginToken.teamId = data[0].teamId;
            loginToken.teamName = data[0].teamName;
            loginToken.status = "captain";

            $("#teamWrapper > div:last-child").toggle();
            $("#teamWrapper > div:first-child").toggle();

            initializeTeam();
            // run challenge 2
            if (runCH2) {
              $("#welcomeMessage").html(challenge2MessageGame);
        
              if (loginToken) {
                getChallenge2(runCH2, loginToken.teamId);
              } else {
                getChallenge2(runCH2);
              }
            }

             // run challenge 1
            // getPuzzles()
          }
          $("#createTeam input[type='text']").val("")
        })
        .fail(() => {
          // console.log("fail");
        });

      //create Team
    } else {
      $("#teamWrapper .invitations").html("Skriv ert teamnamn.");
    }
  });

  $("#createTeam #search").focus(()=>{
    $("#createTeamMessage").html("")
  })

  $("#updateInvitation").click(()=>{
    getInvitations()
  })

  getInvitations()
}

function getInvitations() {
  $("#teamWrapper .invitations").empty()

    $.get("php/checkTeamStatus.php", {userId: parseInt(loginToken.id)})
    .done(data =>{
      // console.log(data)
  
  
      if(data != "noInvitations") {
        if(data == "pending") {
          loginToken.status = "pending"
        } else {
          data = JSON.parse(data)
          console.log(data)

          loginToken.status = data[0].status
          loginToken.teamId = data[0].teamId
          loginToken.teamName = data[0].teamName
          init()

        } 
  
      }
    
      if (loginToken.status == "pending") {
        let invitations;
        $.get("php/getInvitations.php", { userId: loginToken.id })
          .done(data => {
            data = JSON.parse(data);
            console.log(data);
            invitations = data;
    
            for (let invite of invitations) {
              let invitationId = invite.teamId;
              let teamInvites = $("<div>");
              teamInvites.attr("class", "flexAround");
    
              let team = $("<h4>");
              team.html(invite.teamName);
              $(teamInvites).append(team);
    
              let accept = $("<div>");
              accept.click(() => {
                $.get("php/handleRequest.php", {
                  action: "accept",
                  team: invitationId,
                  userId: loginToken.id
                })
                  .done(data => {
                    console.log(data)
                    if(data == "invitation declined") {
                      teamInvites.empty();
                      loginToken.teamId = null
                      loginToken.teamName = null
                      loginToken.status = null
    
                    
                      teamInvites.html("Det var för många i laget, din inbjudan har tagits bort.")
                      .css({fontSize: "calc(var(--fontSize) * .7)", opacity: ".5"})
    
                      setTimeout(()=>{
                        teamInvites.remove()
                        initializeTeam()
                      }, 4000)
                    } else {
                      loginToken.status = "active";
                      initializeTeam();
                    }
    
                  })
                  .fail(error => {
                    // console.log(error);
                  });
              });
              accept.html("ACCEPT");
              accept.attr("class", "button flex");
              accept.css({ padding: "0px 5px", width: "auto" });
              $(teamInvites).append(accept);
    
              let deny = $("<div>");
              deny.click(() => {
                $.get("php/handleRequest.php", {
                  action: "deny",
                  team: invitationId,
                  userId: loginToken.id
                })
                  .done(data => {
                    teamInvites.remove();
                    loginToken.teamId = null
                    loginToken.teamName = null
                    loginToken.status = null
                    initializeTeam()
                  })
                  .fail(error => {
                    // console.log(error);
                  });
              });
              deny.html("DENY");
              deny.attr("class", "button flex");
              deny.css({ padding: "0px 5px", width: "auto" });
              $(teamInvites).append(deny);
    
              // $("#invites").append(teamInvites);
              $("#teamWrapper .invitations").append(
                teamInvites
              );
            }
          })
          .fail(error => {
            // console.log(error);
          });
        // console.log(invitations)
    
        // if not invited or in a team, do this
      } else {
        $('<div>', {
          html: "Det finns inga inbjudningar, uppdatera för att se om det kommit in nya.",
          appendTo: "#teamWrapper .invitations",
        }).css({fontSize: "calc(var(--fontSize) * .7)", opacity: ".5"})
      }
    })


  

 

  
  
}


//teamsetup
function initializeTeam() {
  // console.log(loginToken)
  if (loginToken) {
    if (loginToken.status && loginToken.status != "pending") {
      setTimeout(() => {
        $("#teamWrapper > div").css({ display: "none" });
        $("#teamWrapper > div:first-child").css({ display: "block" });
        getUsers();


      },300);
    } else if (!loginToken.status || loginToken.status == "pending") {
      setTimeout(() => {
        $("#teamWrapper > div").css({ display: "none" });
        $("#teamWrapper > div:last-child").css({ display: "block" });
        createTeam();
      }, 300);
    }
  }
}

function findPlayersProgram() {
  // console.log("team");
  $("#searchForPlayer input[type='button']").click(() => {
    $("#searchForPlayer input[type='text']").toggle();
    $("#availableUsers").toggle();
    
    if ($("#searchForPlayer input[type='button']").val() == "sök") {
      displayAvaliableUsers()
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

  // $("#searchForPlayer input[type='button']").click()
}

function removeTeamProgram() {
  $(".removeTeam").remove()
  let removeTeam = $('<div>', {
    appendTo: "#teamWrapper", 
    class: "removeTeam"
  })
  //remove team button
  let label = $('<div>', {
    appendTo: removeTeam, 
    class: "button",
    html: "Radera team"
  }).click(()=>{
    label.html("Är du säker?")
    label.removeClass("button").css({color: "var(--color3)"})

    
    //yes
    $('<div>', {
      appendTo: label, 
      class: "button",
      html: "Ja"
    }).click(()=>{
      removeTeam.remove()
      
      $.get("php/removeTeam.php", {teamId: loginToken.teamId})
      .done(data => {
        loginToken.status = null
        loginToken.teamId = null
        loginToken.teamName = null
        setTimeout(()=> init(), 500)
        
      })

    })
    
    //no
    $('<div>', {
      appendTo: label, 
      class: "button",
      html: "Nej"
    }).click(()=>{
      removeTeam.remove()
      removeTeamProgram()
    })



  })
}
