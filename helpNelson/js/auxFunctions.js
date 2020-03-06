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
    days = days + " Days ";
  } else if (days == 1) {
    days = days + " Day ";
  } else {
    days = "";
  }
  return [hour, min, sec, days];
}

function countDown() {
  let time = Math.round(
    (Date.parse("March 12, 2020 08:00:00") - Date.now()) / 1000
  );

  let timeLeft = getHourMinSecArray(time);
  $(".countDown").html(
    timeLeft[3] + timeLeft[0] + ":" + timeLeft[1] + ":" + timeLeft[2]
  );

  let count = setInterval(() => {
    time--;
    timeLeft = getHourMinSecArray(time);

    if (!time) {
      clearInterval(count);
      console.log("GO GO GO!");
    }
    $(".countDown").html(
      "<p>Nästa challenge startar om: " +
        timeLeft[3] +
        timeLeft[0] +
        ":" +
        timeLeft[1] +
        ":" +
        timeLeft[2]
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
