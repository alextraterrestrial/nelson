let users
let loggedInUser

// why do i need ../ when i'm in the same folder?? check out later
$.get('../team/getUsers.php') 
.done((data) => {
  data = JSON.parse(data)
  users = data
  loggedInUser = data[0]
  // console.log(data)
  displayUserInfo()
})
.fail((error) => {
  console.log(error)
})

// WORKS - sends user data to DB => program respone function for requested user
function addUser(clickedUser, captain, button) {
  // console.table(clickedUser, captain)
  let team = captain.teamName
  let requestedID = clickedUser.id

  $.get('../team/sendRequest.php', {team: team, userID: requestedID}) 
  .done((data) => {
    console.log(data)
    // the letter S is just for testing, replace later
    button.html('S')
    displayUserInfo()
  })
  .fail((error) => {
    console.log(error)
  })
}

function displayUserInfo() {
  console.log(users, loggedInUser)
  let members = []
  
  if (loggedInUser.status == "captain") {
    for (let user of users) {
      if (user.teamName == loggedInUser.teamName) {
        members.push(user)
      }
    }
    // fill list of members (TC)
    for (let member of members) {
      let memberSlot = $("<div>")
      memberSlot.attr('class', 'flex')

      let alias = $("<div>")
      alias.html(member.username)
      $(memberSlot).append(alias)

      let status = $("<div>")
      status.html(member.status)
      $(memberSlot).append(status)

      $("#teamMembers").append(memberSlot)
    }

  } else {
    let prompt = $("<div>")
    prompt.html('Please add users to form a team')
    $("#teamMembers").css('justify-content', 'center')
    $("#members").append(prompt)
  }
  
    // fill list of users
  for (let user of users) {
    if (user.username != loggedInUser.username) {
      let availableUser = $("<div>")
      availableUser.attr('class', 'flex')
      
      let userToAppend = $("<div>")
      userToAppend.html(user.username)
      let button = $("<div>")
      button.attr('class', 'button flex')
      button.val(user.id)
      button.html(() => {
        switch (user.status) {
          case 'passive':
            return '+'
          case 'pending':
            return '?'
          case 'active':
            return 'M'
        }
      })

      button.click(() => {
        if (user.status == 'passive') {
        addUser(user, loggedInUser, button)
        }
      })
      
      availableUser.append(userToAppend, button)
      $("#availableUsers").append(availableUser)
    }
  }
}

// INSERT INTO teams(teamName, id) VALUES (?, ?);

// INSERT INTO `teamRequests`(`teamName`, `id`) VALUES ('teamDevs', 12) ADD TO TEAM

// $.get('../team/getRequests.php')
// .done((data) => {
//   let requests = JSON.parse(data)
//   console.log(requests)
//   for (let request of requests) {
//     if (button.val() == request.id) {

//     }
//   }
// })
// .fail(() => {
//   console.log("fail")
// })