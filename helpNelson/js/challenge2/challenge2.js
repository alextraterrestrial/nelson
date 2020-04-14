let cooldownTime = 30;
let updateChallengeId;
console.log(updateChallengeId);

//Code for puzzle
class challenge2 {
  constructor(id, contentHTML) {
    //sparar idet behöv egentligen inte.
    this.id = id;

    //(2 WAY)
    this.isAnswered = false;
    //give css class and display none as default

    //inehåller hela frågan med content och forn etc
    this.container = $("<div>", {
      class: "puzzleContainer",
      id: "questionId" + this.id, // questionId24
      appendTo: "#game"
    });

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
      fontSize: "40px",
      color: "#34be34"
    });

    //container innehåller frågan. innerHTML(contentHTML)
    //set css to relative om cooldown ska visas över
    this.contentContainer = $("<div>", {
      class: "puzzleContent",
      appendTo: this.container,
      html: contentHTML
    });

    //form for the answer
    this.form = $("<form>", {
      id: "questionForm" + this.id,
      appendTo: this.container
    });

    this.textField = $("<input>", {
      class: "textField",
      type: "text",
      placeholder: "Svar",
      appendTo: this.form
    });

    this.submit = $("<input>", {
      class: "inputClass button",
      type: "submit",
      value: "Skicka in",
      appendTo: this.form
    }).css({ display: "none" });

    this.textField.focus(() => {
      this.submit.css({ display: "block" });
    });

    this.form.submit(e => {
      e.preventDefault();
      if (!loginToken) {
        //if user isn't logged in
        this.cooldownElement.css({ display: "flex" });
        this.contentContainer.css({ filter: "blur(2px)" });
        this.cooldownElement.html(
          "logga in eller skapa en användare för att kunna svara."
        );
        toggleMenu();
        $("#menuOptionContainer").removeClass("flashy");
        setTimeout(function() {
          $("#menuOptionContainer").addClass("flashy");
        }, 20);
        setTimeout(
          function() {
            this.cooldownElement.css({ display: "none" });
            this.contentContainer.css({ filter: "blur(0px)" });
          }.bind(this),
          3000
        );
      } else if (loginToken.status == "pending" || !loginToken.teamId) {
        this.cooldownElement.css({ display: "flex" });
        this.contentContainer.css({ filter: "blur(0px)" });
        this.cooldownElement.html(
          "Skapa ett team eller gå med i ett för att kunna svara."
        );
        toggleMenu();
        $("#teamWrapper").removeClass("flashy");
        setTimeout(function() {
          $("#teamWrapper").addClass("flashy");
        }, 20);
        setTimeout(
          function() {
            this.cooldownElement.css({ display: "none" });
          }.bind(this),
          3000
        );

        //create a team or join one to answer
      } else {
        let rule = /.[^\s]/;
        if (this.textField.val().search(rule) != -1) {
          this.submitAnswer(this.textField.val(), this.id, loginToken.teamId);
        }
      }

      this.textField.val("");
    });
  }

  //send submit request
  submitAnswer(ans, questionId, teamId) {
    console.log(ans);
    console.log(questionId);
    console.log(teamId);

    let data = { teamId: teamId, questionId: questionId, answer: ans };
    JSON.stringify(data);

    $.ajax({
      url: "php/challenge2/submitAnswer.php",
      type: "POST",
      data: data
    })
      .done(res => {
        console.log("ok");
        console.log(res);

        if (res.response == "correct") {
          let nrOfPoints = 1;
          // toggleMenu(); depends on the way of showing points
          $(".playerPoints").removeClass("flashy");
          setTimeout(function() {
            $(".playerPoints").addClass("flashy");
          }, 20);
          this.cooldownElement.css({ display: "flex" });
          this.contentContainer.css({ filter: "blur(2px)" });
          this.cooldownElement.html("Rätt svar!");
          // this.cooldownElement.css({color: 'var(--colorCorrect)'})
          this.cooldownElement.css({ color: "#34be34" });

          setTimeout(
            function() {
              this.container.remove();
            }.bind(this),
            3000
          );

          loginToken.score = parseInt(loginToken.score) + nrOfPoints;
          $(".playerPoints span").html(parseInt(loginToken.score));
        } else if (res.response == "incorrect") {
          this.setCooldown(cooldownTime);
        } else {
          this.cooldownElement.html("Något hann svara före!");
          setTimeout(
            function() {
              this.container.remove();
            }.bind(this),
            3000
          );
        }
      })
      .fail(e => {
        console.log(e);
        console.log("fail");
      });
  }

  setCooldown(s) {
    this.cooldownElement.css({ display: "flex" });
    this.textField.attr("readonly", "readonly");
    this.contentContainer.css({ filter: "blur(" + s + "px)" });
    this.form.css({ filter: "blur(" + s + "px)" });
    this.cooldownElement.html(s);

    let interval = setInterval(
      function() {
        s--;

        this.contentContainer.css({ filter: "blur(" + s + "px)" });
        this.form.css({ filter: "blur(" + s + "px)" });
        this.cooldownElement.html(s);

        if (!s) {
          clearInterval(interval);
          this.cooldownElement.css({ display: "none" });
          this.textField.removeAttr("readonly");
        }
      }.bind(this),
      1000
    );
  }
}

//(2 WAY)
let challenge2Array = [];

function getChallenge2(teamId) {
  let data = null;

  if (teamId) {
    data = { teamId: teamId };
  }

  //clear #game container
  $("#game").empty();

  $.ajax({
    url: "php/challenge2/getQuestions.php",
    type: "POST",
    data: data,
    contenType: "application/json; charset=utf-8"
  })
    .done(res => {
      if (updateChallengeId) {
        clearInterval(updateChallengeId);
      }
      console.log(res);
      // JSON.parse(res);
      res.forEach(item => {
        let q = new challenge2(item.questionId, item.contentHTML);
        challenge2Array.push(q);

        if (item.submissionTimestamp) {
          let timeSinceSubmission = Math.round(
            (Date.now() - Date.parse(item.submissionTimestamp)) / 1000
          );
          let timeLeft = cooldownTime - timeSinceSubmission;
          console.log(Date.now() / 1000);
          console.log(Date.parse(item.submissionTimestamp) / 1000);
          console.log(timeLeft);

          // Set the cooldown time
          q.setCooldown(timeLeft);
        }
      });

      updateChallengeId = setInterval(() => {
        updateChallenge2Answers();
      }, 10000);
    })
    .fail(e => {
      console.log(e);
      console.log("fail");
    });
}

function updateChallenge2Answers(teamId) {
  $.get("php/challenge2/answeredQuestions.php").done(data => {
    data = JSON.parse(data);
    // console.log(data)

    data.forEach(item => {
      //if item. is answered is 1 and challengeArray. is answered is 0 --> remove(
      challenge2Array.forEach(item2 => {
        if (
          item.questionId == item2.id &&
          Boolean(parseInt(item.isAnswered)) != item2.isAnswered
        ) {
          item2.container.remove();
        }
      });
    });
  });

  //get an array of challenge2 {id: x, isAnswered: 1/0} (remeber parseInt)
  //data.forEach match by id -->  challenge2.find(item.id) --> if !parseInt(item.IsAnswered) --> remove challenge2.content
}

//udate team points/ score
