
$.get('getUsers.php')
.done((data) => {
  let users = JSON.parse(data)
  console.log(users)
})
.fail((error) => {
  console.log(error)
})

// let users = ["Simon", "Alex", "Linus", "Richard", "Aneela", "Emile", "Erik"]
let members = ["Simon", "Alex", "Linus", "Richard"]
let memberStatus = ["Captain", "Pending", "Active", "Active"]

let captain = true
let users = [
  {username: "Simon", status: "Captain", captainRole: 1, inTeam: false},
  {username: "Alex", status: "Pending", captainRole: 0, inTeam: false},
  {username: "Linus", status: "Active", captainRole: 0, inTeam: false},
  {username: "Richard", status: "Active", captainRole: 0, inTeam: false},
  {username: "Aneela", status: "Passive", captainRole: 0, inTeam: false},
  {username: "Emile", status: "Passive", captainRole: 0, inTeam: false},
  {username: "Erik", status: "Passive", captainRole: 0, inTeam: false},
]

if (captain) {
  // fill list of members (TC)
  for (let member of members) {
    let alias = $("<p>")
    alias.html(member)
    $("#members").append(alias)
  }
  for (let status of memberStatus) {
    let alias = $("<p>")
    alias.html(status)
    $("#status").append(alias)
  }

  // fill list of users
  for (let user of users) {
    if (!user.inTeam) {
      let availableUser = $("<p>")
      availableUser.html(user.username)
      $("#availableUsers").append(availableUser)
    }
  }

} else {
  let prompt = $("<div>")
  prompt.html('Please add users to form a team')
  $("#teamMembers").css('justify-content', 'center')
  $("#members").append(prompt)


}


