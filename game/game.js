//variables
let testIdArray = []


//functions

function createTest(id, content) {
  testIdArray.push(id)

  let testContainer = $("<div>", {
    class: "test",
    "id": "test" + id,
    appendTo: "#secSpelet"
  })

  //element för att visa hur många som svarat
  $("<div>", {
    class: "testSubmission",
    "id": "testSubmission" + id,
    appendTo: "#test" + id, 
    html: "antal svar ",
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
    class: "inputClass",
    type: "text",
    name: "cc" + id,
    placeholder: "Svar",
    appendTo: "#test" + id + " form"
  })
  
  let textarea = $("<textarea>", {
    name: "cc" + id,
    rows: "3",
    cols: "30",
    html: "Hur kom du på svaret?",
    appendTo: "#test" + id + " form"
  }).css({display: "none"}).click(()=>{
    textarea.val("")
  })
  
  let submit = $("<input>", {
    name: "cc" + id,
    class: "inputClass",
    type: "submit",
    value: "Skicka",
    appendTo: "#test" + id + " form"
  }).css({display: "none"})
  
  testContainer.click((e)=>{
    console.log(e.target )

    console.log(e.target.name != "cc" + id)


    if($("#test" + id +" input[type='submit']").css("display")== "none") {
      input.val("")
      $("#test" + id +" input[type='submit']").toggle(130)
      $("#test" + id +" textarea").toggle(130)
    } else if(e.target.name != "cc" + id){
      console.log(e.target.name != "cc" + id)
      $("#test" + id +" input[type='submit']").toggle(130)
      $("#test" + id +" textarea").toggle(130)
    }
  })


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

        if(data=="Success"){
          
          form.html("")
    
          $("<div>", {
            class: "uploadAnimation",
            appendTo: form,
            html: "Ert svar: " + answer 
          })
          
        } else if (data=="answered") {
          form.html("")
    
          $("<div>", {
            class: "uploadAnimation",
            appendTo: form,
            html: "Ert lag har redan svarat. Ert svar:" + answer
          })
        }
        
  
        // setTimeout(()=>{
        //   $(".uploadAnimation").addClass("answerFeedback")
        //   $(".uploadAnimation").removeClass("uploadAnimation")
        //   $(".answerFeedback").html("Ert svar: " + answer).css({fontSize: "var(--fontSize)"})
        // }, 1000).bind(this)

      })
      .fail(()=>{
        error()
        let message = $("<div>", {
          appendTo: form,
          html: "Svaret skickade ej."
        }).css({fontSize: "var(--fontSize)", textAlign: "center"}).click(()=>{message.remove()})
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
    })
    updateSubmissions(testIdArray)

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

function updateSubmissions(arr) {
  arr.forEach((item)=>{
    $.get('../PHP/getSubmissions.php', {testId: item})
    .done((data)=>{
      data = JSON.parse(data)

      // $("#testSubmission" + item + " span").html(data[0].submissions)
    })
    .fail(error)
  })
}



//test


getTests()


setInterval(() => {
  updateSubmissions(testIdArray)
}, 10000)
