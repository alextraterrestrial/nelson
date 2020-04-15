class User {
    // constructor
    constructor(obj) {
        this.id = obj.userId
        this.username = obj.username
        this.password = obj.password
        this.email = obj.email
        this.score = obj.score
        this.dateReg = obj.dateReg
        this.teamId = obj.teamId
        this.teamName = obj.teamName
        this.status = obj.status
    }

    // methods
    // submitAnswer(submission) {
    //     // takes the submission and checks/uploads to DB, handling team funcitonality
    // }

    // not in use right now, displayUserInfo() does this instead
    refreshTeam() {
        let tN = $("h1>").html(this.teamName)
        let tP = $("<h3>").html(this.score)
        let heading = $("<h3>").html("Members:")
        let members = $("<div>")

        $.get("php/getUsers.php")
        .done((data) => {
            allUsers = JSON.parse(data)
            for (let user of allUsers[0]) {
                if (user.teamName != this.teamName) {
                    members.push($("<div>").html(user.username))
                }
            }
        })

        $("#teamWrapper").append(tN, tP, heading, members)
    }
}

// class Captain extends User {
//     // methods
//     adminUser(action) {
//         // targets a user and adds, removes or makes into captain depending on the passed action
//     }
// }