class User {
  // constructor
  constructor(obj) {
    this.id = obj.id
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
  submitAnswer(submission) {
    // takes the submission and checks/uploads to DB, handling team funcitonality
  }
}

class Captain extends User {
  // methods
  adminUser(action) {
    // targets a user and adds, removes or makes into captain depending on the passed action
  }
}