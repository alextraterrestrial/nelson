

$("#puzzleFormIntro input[type='button']").click(() => {
    let sub = $("#puzzleFormIntro input[type='text']").val().toLowerCase()


   if(sub == "hyllie") {
    //save in cookie?
    //message create a user to join the real challange
    $("#puzzleFormIntro").empty()
    $("<div>", {
        html: "Rätt Svarar! Du är Kvalificerad till att anta nästa utmaning!. Skapa ett <strong>konto</strong> och samla ditt team för att delta och vinna priser. Utmaningen släpps på fredag kl. ",
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