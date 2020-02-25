

$("#puzzleFormIntro input[type='button']").click(() => {
    let sub = $("#puzzleFormIntro input[type='text']").val().toLowerCase()

    console.log(sub)

   if(sub == "hyllie") {
    //save in cookie?
    //message create a user to join the real challange
    $("#puzzleFormIntro").empty()
    $("<div>", {
        html: "Rätt Svarar! Du är Kvalificerad till att anta nästa utmaning!. skapa ett konto och samla ditt team för att delta. Utmaningen släpps på fredag kl.",
        appendTo: "#puzzleFormIntro",
        class: "message"
    })
    
   } else {
       console.log("wrong")
   }
})



$("#puzzleFormIntro input[type='text']").val("")