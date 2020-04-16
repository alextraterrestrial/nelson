function getHourMinSecArray(s) {
  let days;
  let hour;
  let min;

  days = Math.floor(s / 3600 / 24);

  let h = Math.floor(s / 3600 - days * 24);
  if (h < 10) {
    hour = "0" + String(h);
  } else {
    hour = h;
  }

  let m = Math.floor((s / 3600 - h - days * 24) * 60);
  if (m < 10) {
    min = "0" + String(m);
  } else {
    min = m;
  }

  let sec = Math.floor(s - m * 60 - h * 3600 - days * 24 * 3600);
  if (sec < 10) {
    sec = "0" + String(sec);
  }

  if (days > 1) {
    days = days + " Dagar ";
  } else if (days == 1) {
    days = days + " Dag ";
  } else {
    days = "";
  }
  return [hour, min, sec, days];
}

function countDown() {
  let time = Math.round((Date.parse("March 12, 2020 10:00:00") - Date.now()) / 1000);

  let timeLeft = getHourMinSecArray(time);
  $(".countDown").html(
    timeLeft[3] + timeLeft[0] + ":" + timeLeft[1] + ":" + timeLeft[2]
  );

  let count = setInterval(() => {
    time--;
    timeLeft = getHourMinSecArray(time);

    if (!time) {
      clearInterval(count);
      // console.log("GO GO GO!");
    }
    $(".countDown").html(
      "<p>Utmaningen startar om:<br> <strong>" +
        timeLeft[3] +
        timeLeft[0] +
        ":" +
        timeLeft[1] +
        ":" +
        timeLeft[2] + "</strong></p>"
    );
  }, 1000);
}
function error(jqXHR, textStatus, errorThrown) {
  console.log(textStatus);
  console.log(errorThrown);
}

//testfunctions

// function that animate typing the "string" into the "element"
function typeAnimation(string, element) {
  let count = 1;
  let type = setInterval(() => {
    element.html(string.substr(0, count));
    count++;
    if (count > string.length) {
      clearInterval(type);
    }
  }, 60);
}

// changes string t lower case letters and removes specific characters
function prepareAnswer(string) {
  string = string.toLowerCase();

  let pattern = /[\s;:_,.-]/g;

  string = string.replace(pattern, "");

  return string;
}








//welcome messages
let challenge2MessageBefore = ""
let challenge2MessageGame = "Lycka till med utmaningen! Ni har till kl 18.00 på er att lösa gåtorna"
let challenge2MessageEnd16th = "Nu är alla quizfrågor slut, tack för er kunskap!<br>Ny tävling imorgon med ett nytt tema: Serier och filmer! Start 15.00<br>Varje fråga är då värd 3 poäng/st.<br>Start 17.00 - Lycka till!"
let challenge2MessageEnd17th = "Bra jobbat! Nu är frågorna slut. Välkommen tillbaka imorgon för temat Mytologi! Quizet startar 15.00.<br>Varje fråga är då värd 4 poäng/st.<br>Start 13.00 - Lycka till!"
let challenge2MessageEnd18th = "Det var sista omgången, tack för er kunskap.<br>På återseende, Athena."
let challenge2MessageEndCH2 = "Avslutande Tackmeddelande för medverkan under CH2<br>(från Erik)<br>Wow, så roligt att se att så många har deltagit i Athenas spel! Tack för att ni har varit med och tillsammans har vi samlat in gott om kunskap till Athena.<br>Grattis till vinnarna XXX och XXX!<br>Första pris går alltså till team AAA, ni fick flest rätt sammanlagt under alla speldagar.<br>En hederlig andra plats går till team BBB, bra jobbat YYY och YYY!<br>Vinnarna kontaktas återigen via mejl inom kort!<br>/Erik"
