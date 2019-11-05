//när spelaren loggat in engång så sparas inloggning och vi sparar "player Id"? som vi i sin tur hämtar namn, team och poäng med.

function updatePlayer(id) {
  //kolla session/ cookies efter id och behöver i så fall inte ges som ett argument?
  
  let data = {name: "LinusGrahn", teamName: "teamLinus", points: 74}
  //get player info from db
  // in .done() --> 

  $(".playerName").html(data.name)
  
  if(data.teamName) {
    $(".teamName").html(data.teamName)
  } else {
    console.log(data.teamName)
  }

  $(".playerPoints").html(data.points)
  

}

function countDown(time, endAction) {
  let timeLeft = getHourMinSecArray(time)
  $(".countDown").html(timeLeft[0] + ":" + timeLeft[1] + ":" + timeLeft[2])

  let count = setInterval(() => {
    time--
    timeLeft = getHourMinSecArray(time)
    
    if(!time){
      clearInterval(count)
      endAction()
    }
    $(".countDown").html(timeLeft[0] + ":" + timeLeft[1] + ":" + timeLeft[2])
  }, 1000);
}

function createMenyAction(action){
  let div = $("<div>")
  div.html(action)

  div.click(()=>{
    $("section").css({display: "none"})
    $("#sec" + action).css({display: "flex"})
    
    // if(screen.width< 600) {
    //   $("#navMeny").toggle(200)
    // }
  })

  $("#navMeny").append(div)
}

function createMeny(arr){
  for (let i=0; i<arr.length; i++) {
    createMenyAction(arr[i])
  }
}













//Variables
let menyActions = ["Spelet","Team", "Spellogg", "Logga ut"]
let timeLeft = 14644




//Events
$(".circuit img").click(()=> {
  if(screen.width< 600) {
    $("#navMeny").toggle(200)
  } else {
    $("#navMeny").css({display: "flex"})
    //vad används den till i desktop?
  }
  
})


//directCode
updatePlayer()

createMeny(menyActions)
countDown(timeLeft, function(){test("works")})