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
      position: "relative",
      // left: "47%",
      display: "flex",
      JustifyContent: "center",
      top: "47%",
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
        let rule = /.[^\s]/
        if (this.textField.val().search(rule) != -1) {
          this.submitAnswer(this.textField.val(), this.id, loginToken.teamId)
        }
      }

      this.textField.val("")

    })


   

  }

  //send submit request 
  submitAnswer(ans, questionId, teamId) {
    console.log(ans)
    console.log(questionId)
    console.log(teamId)

    let data = {teamId: teamId, questionId: questionId, answer: ans}
    JSON.stringify(data)

    $.ajax({
      url: "php/challenge2/submitAnswer.php",
      type: "POST",
      data: data
    }).done(res => {
      console.log("ok")
      console.log(res);
  
      
    }).fail((e)=>{
      console.log(e)
      console.log("fail")
    })


    // $.post("php/challenge2/submitAnswer.php", {teamId: teamId, questionId: questionId, answer: ans})
    // .done(data => {
    //   console.log(data)
    //   let nrOfPoints = 20
    //   // data = JSON.parse(data)
    //   console.log(data)
      
      
    //   // if correct
    //   // this.cooldownElement.css({display: "flex"})
    //   // this.contentContainer.css({filter: "blur(2px)"})
    //   // this.cooldownElement.html("Rätt svar!")
    //   // // this.cooldownElement.css({color: 'var(--colorCorrect)'})
    //   // this.cooldownElement.css({color: '#34be34'})

    //   // setTimeout(function(){
    //   //   this.container.remove()
    //   // }.bind(this), 3000)

    //   // loginToken.score = parseInt(loginToken.score) + nrOfPoints
    //   // $(".playerPoints span").html(parseInt(loginToken.score))

    //   // else run, t = sec from DB
    //   // this.setCooldown(10) 

    // })
    // .fail(()=>{
    //   console.log("fail, answer")
    // })

    //in done:
    //if already answered -> remove/blur and show message
    //if correct update points throught new get-request
    //if wrong or cooldown on questing --> setCooldown(t) //t is the cooldown time in seconds returned from the request
    
  }

  setCooldown(s){
    this.cooldownElement.css({display: "flex"})
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

}

//(2 WAY)
let challenge2Array = []

function getChallenge2() {

  let data = null
  
  if(teamId){
    data = {teamId: teamId}
  }

  //clear #game container
  $("#game").empty();

  $.get("php/challenge2/getQuestions.php", data)
  .done(data => {
    data = JSON.parse(data);
    console.table(data)

    data.forEach(item => {
      challenge2Array.push(new challenge2(item.questionId, item.contentHTML))
      // console.log(loginToken.)
    })
  })

}


function updateChallenge2Answers(teamId) {
  

  $.get("php/challenge2/answeredQuestions.php")
  .done(data =>{
    data = JSON.parse(data)
    console.log(data)

    data.forEach((item)=>{
      //if item. is answered is 1 and challengeArray. is answered is 0 --> remove(
      challenge2Array.forEach((item2)=>{
        if((item.questionId == item2.id) && ((Boolean(parseInt(item.isAnswered)) != item2.isAnswered))) {
          //remove object.container
          
          console.log("remove")
          console.log(item2)
        }
      })


    })
  })

  //get an array of challenge2 {id: x, isAnswered: 1/0} (remeber parseInt)
  //data.forEach match by id -->  challenge2.find(item.id) --> if !parseInt(item.IsAnswered) --> remove challenge2.content
}



updateChallenge2Answers()

//udate team points/ score