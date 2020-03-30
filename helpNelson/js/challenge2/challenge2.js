//Code for puzzle
class challenge2 {
  constructor(id, contentHTML) {
    //sparar idet behöv egentligen inte.
    this.id = id

    //(2 WAY)
    this.isAnswered = false
    //give css class and display none as default
    this.cooldownTime = 0
    
    
    //inehåller hela frågan med content och forn etc
    this.container = $("<div>", { 
      class: "puzzleContainer", 
      id: "questionId" + this.id, // questionId24
      appendTo: "#game"
    })

    this.cooldownElement = $("<div>", {
      class: "cooldown",
      appendTo: this.container
    }).css({
      display: "none",
      position: "absolute",
      left: "50%",
      top: "50%",
      zIndex: 20,
      fontSize: "100px"
    })

    //container innehåller frågan. innerHTML(contentHTML)
    //set css to relative om cooldown ska visas över
    this.contentContainer = $("<div>", {
      class: "puzzleContent",
      appendTo: this.container,
      html: contentHTML
    })

    

    //form for the answer
    this.form = $("<form>", {
      id: "questionForm" + this.id,
      appendTo: this.container
    })

    this.textField = $("<input>", {
      class: "textField",
      type: "text",
      placeholder: "Svar",
      appendTo: this.form
    })

    this.submit = $("<input>", {
      class: "inputClass button",
      type: "submit",
      value: "Skicka in",
      appendTo: this.form
    }).css({ display: "none" })

    this.textField.focus(() => {
      this.submit.css({ display: "block" })
    })

    this.form.submit((e)=>{
      e.preventDefault()
      if (!loginToken) {
        console.log("ej inloggad")
        //kontrollruta
      } else if (loginToken.status == "pending" || !loginToken.id) {
        console.log("Skapa ett team")
        //skapa ett team eller gå med i ett
      } else {
        this.submitAnswer(this.textField.val(), this.id, loginToken.teamId)
      }

      this.textField.val("")

    })


   

  }

  //send submit request 
  submitAnswer(ans, challengeId, teamId) {
    console.log(ans)
    console.log(challengeId)
    console.log(teamId)
    //in done:
    //if already answered -> remove/blur and show message
    //if correct update points throught new get-request
    //if wrong or cooldown on questing --> setCooldown(t) //t is the cooldown time in seconds returned from the request
    this.setCooldown(3)
  }

  setCooldown(s){
    this.cooldownElement.css({display: "block"})
    this.textField.attr("readonly", "readonly")
    this.contentContainer.css({filter: "blur(" + s +"px)"})
    this.form.css({filter: "blur(" + s +"px)"})
    this.cooldownElement.html(s)

    let interval = setInterval(function(){ 
      s--

      this.contentContainer.css({filter: "blur(" + s +"px)"})
      this.form.css({filter: "blur(" + s +"px)"})
      this.cooldownElement.html(s)
      
      if(!s) {
        clearInterval(interval)
        this.cooldownElement.css({display: "none"})
        this.textField.removeAttr("readonly")
      }
    }.bind(this), 1000)
  }

// 1 WAY TO DO IT
  checkIfAnswered() {
    //send request
    //if answered remove this.container
  }

}

//(2 WAY)
let challenge2Array = []

function getChallange2(t) {

  //clear #game container

  //send request for challange2
  //in done, loop throught array of puzzles and apend/create them + 
  //(1 WAY)(run setTimeout --> dnewObject.checkIfAnswered.)
  //(2 WAY) (push into array)
}

//(2 WAY)
function updateChallenge2Answers() {
  //get an array of challenge2 {id: x, isAnswered: 1/0} (remeber parseInt)
  //data.forEach match by id -->  challenge2.find(item.id) --> if !parseInt(item.IsAnswered) --> remove challenge2.content
}






//TEST

function testChallenge() {
  // Clear any puzzles already created
  $("#game").empty();

  $.get("php/getGame1.php").done(data => {
    data = JSON.parse(data);
    data.forEach(item => {
      challenge2Array.push(new challenge2(item.puzzleId, item.contentHTML))
      // console.log(loginToken.)
    })
  });
}