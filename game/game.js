function createTest(id, content) {
  
  $("<div>", {
    class: "test",
    "id": "test" + id,
    appendTo: "#sec" + menyActions[0]
  })

  //element för att visa hur många som svarat
  $("<div>", {
    class: "testSubmission",
    "id": "testSubmission" + id,
    appendTo: "#test" + id, 
    html: "antal svar",
  })

  $("<span>", {
    appendTo: "#testSubmission" + id
  })

  //element för test
  $("<div>", {
    class: "testContent",
    appendTo: "#test" + id, 
    html: content,
  }) 

  //Createform {
  let form = $("<form>", {
    appendTo: "#test" + id,
  })

  let input = $("<input>", {
    type: "text",
    name: "answer",
    value: "Svar",
    appendTo: "#test" + id + " form"
  })
  
  // .blur(()=>{
  //   input.val("Svar")
  // })
  
  let textarea = $("<textarea>", {
    rows: "3",
    cols: "30",
    html: "Hur kom du på svaret?",
    appendTo: "#test" + id + " form"
  }).css({display: "none"}).click(()=>{
    textarea.val("")
  })
  
  // .blur(()=>{
  //   textarea.val("hur kom du på svaret?")
  // })

  let submit = $("<input>", {
    type: "submit",
    value: "Skicka",
    appendTo: "#test" + id + " form"
  }).css({display: "none"})
  
  input.click(()=>{
    input.val("")
    $("#test" + id +" input[type='submit']").css({display: "block"})
    $("#test" + id +" textarea").css({display: "block"})
  })

  // input.focusout(()=>{
  //   input.val("svar")
  //   $("#test" + id +" input[type='submit']").css({display: "none"})
  //   $("#test" + id +" textarea").css({display: "none"})
  // })


  form.submit((e)=>{
    event.preventDefault()

    answer = input.val()
    solution = textarea.val()
    
    if (!loggedIn) {
      alert("Registerar dig för att Svara")
      //länka till login/reg
    } else {

      $.get('../PHP/submitAnswer.php', {answer: input.val(), solution: textarea.val(), teamId: player.teamId, testId: id})
      .done((data)=>{
        console.table(data)

        if(data="Success"){
          
          form.html("")
    
          let feedback = $("<div>", {
            class: "uploadFeedback",
            appendTo: form
          })
          
        }
        
  
        // setTimeout(()=>{
        //   $(".uploadFeedback").addClass("answerFeedback")
        //   $(".uploadFeedback").removeClass("uploadFeedback")
        //   $(".answerFeedback").html = answer + "<br>" + solution
        // }, 2000).bind(this)

      })
      .fail(error)
      .always(()=>{

      })



    }

    
  })
}

function getTests() {
  $.get("../PHP/getTests.php")
  .done((data)=>{
    data= JSON.parse(data)

    data.forEach((obj)=>{
      createTest(obj.testId, obj.content)
      updateSubmissions()
    })
  })
  .fail(()=>{
    //take away when launching
    error()
    $("<p>", {
      appendTo: "#sec" + menyActions[0],
      html: "Ops... något vill inte att ni ska se innehållet..."
    }).css({margin: "10vw"})
  })
}

function updateSubmissions() {
  //fix
}



//test
$("#navMeny > div:first-child").click()

getTests()

let submissions = setInterval(() => {
  updateSubmissions()
}, 10000);

//update submissions
