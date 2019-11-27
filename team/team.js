let users
let loggedInUser

// why do i need ../ when i'm in the same folder?? check out later
function getUsers() {
  $.get('../team/getUsers.php') 
  .done((data) => {
    data = JSON.parse(data)
    users = data
    loggedInUser = data[1]
    switch (loggedInUser.status) {
      case 'captain':
        $('#teamShowcase > h3').html(loggedInUser.teamName)
        break
      case 'active':
        $('#teamShowcase > h3').html(loggedInUser.teamName)
        break
      case 'pending':
        $('#teamShowcase > h3').html('Invitations:')
        break
      case 'passive':
        $('#teamShowcase > h3').html('Create a team:')
        break
    }
    displayUserInfo()
  })
  .fail((error) => {
    console.log(error)
  })
}

// WORKS - sends user data to DB => program respone function for requested user
function addUser(clickedUser, captain) {
  let team = captain.teamName
  let requestedID = clickedUser.id

  $.get('../team/sendRequest.php', {team: team, userID: requestedID}) 
  .done((data) => {
    popup(data)
    getUsers()
  })
  .fail((error) => {
    console.log(error)
  })
}

function updateTeam(action, team, memberToEffect) {
  $.get('../team/updateTeam.php', {action: action, team: team, member: memberToEffect})
    .done((data) => {
      popup(data)
      getUsers()
    })
    .fail((error) => {
      console.log(error)
    })
}

function popup(message) {
  let pop = $('<div>')
  pop.attr('class', 'popup flex')
  pop.html(message)
  $('#secTeam').append(pop)
  setTimeout(() => {
    pop.remove()
  }, 1000)
}

let members
function displayUserInfo() {
  console.log(users, loggedInUser)
  $("#teamMembers").empty()
  members = []
  
  if (loggedInUser.status == "captain" || loggedInUser.status == "active") {
    for (let user of users) {
      if (user.teamName == loggedInUser.teamName) {
        members.push(user)
      }
    }

    // fill list of members (TC & ACTIVE)
    for (let member of members) {
      let memberSlot = $("<div>")
      memberSlot.attr('class', 'flex')
      let alias = $("<div>")
      alias.html(member.username)
      $(memberSlot).append(alias)

      let status = $("<div>")
      status.html(member.status)
      $(memberSlot).append(status)

      if (loggedInUser.status == "captain") {
        let btnContainer = $("<div>")
        btnContainer.attr('class', 'flex')

        let makeCaptain = $("<div>")
        makeCaptain.click(() => {
          updateTeam('updateCaptain', loggedInUser.teamName, member.id)
        })
        makeCaptain.attr('class', 'button flex')
        makeCaptain.css({'margin-right': '5px'})
        makeCaptain.html('♕')
        $(btnContainer).append(makeCaptain)
  
        let removeMember = $("<div>")
        removeMember.click(() => {
          updateTeam('removeMember', loggedInUser.teamName, member.id)
        })
        removeMember.attr('class', 'button flex')
        removeMember.html('X')
        $(btnContainer).append(removeMember)

        $(memberSlot).append(btnContainer)
      }

      $("#teamMembers").append(memberSlot)
    }

  } else if (loggedInUser.status == 'pending') {
    let prompt = $("<div>")
    prompt.html('You have been invited to join the following teams:')
    $("#teamMembers").css('justify-content', 'center')
    $("#teamMembers").append(prompt)
    let teamInvites = $("<div>")
    teamInvites.attr('class', 'flex')

    let team = $("<div>")
    team.html(loggedInUser.teamName)
    $(teamInvites).append(team)

    let accept = $("<div>")
    accept.click(() => {
      // manage corresponding post-request to DB
    })
    accept.html("ACCEPT")
    accept.attr('class', 'button flex')
    accept.css({padding: '0px 5px', width: 'auto'})
    $(teamInvites).append(accept)

    let deny = $("<div>")
    deny.click(() => {
      // manage corresponding post-request to DB
    })
    deny.html('DENY')
    deny.attr('class', 'button flex')
    deny.css({padding: '0px 5px', width: 'auto'})
    $(teamInvites).append(deny)
    
    $("#teamMembers").append(teamInvites)

  } else if (loggedInUser.status == 'passive') {
    let prompt = $("<div>")
    prompt.html('Please add users to form a team')
    $("#teamMembers").css('justify-content', 'center')
    $("#teamMembers").append(prompt)
  }

  
    // fill list of users
  $("#availableUsers").empty()
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
            return '✓'
          case 'captain':
            return '♕'
        }
      })

      button.click(() => {
        if (user.status == 'passive' && loggedInUser.status == 'captain') {
        button.html('?')
        addUser(user, loggedInUser)
        }
      })
      
      availableUser.append(userToAppend, button)
      $("#availableUsers").append(availableUser)
    }
  }
}

// functions to call on page-load

getUsers()