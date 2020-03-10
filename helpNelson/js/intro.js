

$("#puzzleFormIntro input[type='button']").click(() => {
    let sub = $("#puzzleFormIntro input[type='text']").val().toLowerCase()


   if(sub == "hyllie") {
    //save in cookie?
    //message create a user to join the real challange
    $("#puzzleFormIntro").empty()
    $("<div>", {
        html: "Rätt Svarat, Du har vad som krävs! Hjälp mig på torsdag",
        appendTo: "#puzzleFormIntro",
        class: "message"
    })
    
   } else if(sub){
      let elem = $("<div>", {
        html: "Fel svar!",
        appendTo: "#puzzleFormIntro"   
      })

      setTimeout(() => {
          elem.remove()
      }, 1500);
   }
})



$("#puzzleFormIntro input[type='text']").val("")