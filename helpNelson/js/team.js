let allUsers

// why do i need ../ when i'm in the same folder?? check out later
function getUsers() {
  $.get('../php/getUsers.php') 
  .done((data) => {
    data = JSON.parse(data)
    allUsers = data
    switch (loginToken.status) {
      case 'captain':
        $('#teamShowcase > h3').html(loginToken.teamName)
        break
      case 'active':
        $('#teamShowcase > h3').html(loginToken.teamName)
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
  let requestedId = clickedUser.id

  $.get('../php/sendRequest.php', {team: team, userId: requestedId}) 
  .done((data) => {
    // popup(data)
    console.log(data)
    getUsers()
  })
  .fail((error) => {
    console.log(error)
  })
}

function updateTeam(action, team, memberToEffect) {
  $.get('../php/updateTeam.php', {action: action, team: team, member: memberToEffect})
    .done((data) => {
      // popup(data)
      console.log(data)
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
  console.log(allUsers, loginToken)
  $("#teamMembers").empty()
  members = []
  
  if (loginToken.status == "captain" || loginToken.status == "active") {
    for (let user of allUsers) {
      if (user.teamName == loginToken.teamName) {
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

      if (loginToken.status == "captain") {
        let btnContainer = $("<div>")
        btnContainer.attr('class', 'flex')

        let makeCaptain = $("<div>")
        makeCaptain.click(() => {
          updateTeam('updateCaptain', loginToken.teamName, member.id)
        })
        makeCaptain.attr('class', 'button flex')
        makeCaptain.css({'margin-right': '5px'})
        makeCaptain.html('♕')
        $(btnContainer).append(makeCaptain)
  
        let removeMember = $("<div>")
        removeMember.click(() => {
          updateTeam('removeMember', loginToken.teamName, member.id)
        })
        removeMember.attr('class', 'button flex')
        removeMember.html('X')
        $(btnContainer).append(removeMember)

        $(memberSlot).append(btnContainer)
      }

      $("#teamMembers").append(memberSlot)
    }

  } else if (loginToken.status == 'pending') {
    let prompt = $("<div>")
    prompt.html('You have been invited to join the following teams:')
    $("#teamMembers").css('justify-content', 'center')
    $("#teamMembers").append(prompt)
    let teamInvites = $("<div>")
    teamInvites.attr('class', 'flex')

    let team = $("<div>")
    team.html(loginToken.teamName)
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

  } else if (loginToken.status == 'passive') {
    let prompt = $("<div>")
    prompt.html('Please add users to form a team')
    $("#teamMembers").css('justify-content', 'center')
    $("#teamMembers").append(prompt)
  }

  
    // fill list of users
  $("#availableUsers").empty()
  for (let user of allUsers) {
    if (user.username != loginToken.username) {
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
        if (user.status == 'passive' && loginToken.status == 'captain') {
        button.html('?')
        addUser(user, loginToken)
        }
      })
      
      availableUser.append(userToAppend, button)
      $("#availableUsers").append(availableUser)
    }
  }
}

// functions to call on page-load

getUsers()