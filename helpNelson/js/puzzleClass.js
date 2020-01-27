class Puzzle {
  constructor(obj) {
    id = obj.puzzleId
    content = obj.contentHTML
    checkType = obj.checkType
    minChars = obj.minChars
    image = obj.image
  }

  render() {
    // render the puzzle in HTML from the inherent properties of the class
  }

  update() {
    // update the HTML according to certain action (ex. submitted answer)
  }

  submit(teamName, answer) {
    // submit answer of the puzzle to the DB 
  }
}