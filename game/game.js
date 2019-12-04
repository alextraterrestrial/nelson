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
        appendTo: "#test" + id + " form",
        spellcheck: "false"
    }).css({ display: "none" }).click(() => {
        textarea.val("")
    })

    $("<input>", {
        name: "cc" + id,
        class: "inputClass",
        type: "submit",
        value: "Skicka",
        appendTo: "#test" + id + " form"
    }).css({ display: "none" })

    testContainer.click((e) => {


        if ($("#test" + id + " input[type='submit']").css("display") == "none") {
            input.val("")
            $("#test" + id + " input[type='submit']").toggle(130)
            $("#test" + id + " textarea").toggle(130)
        } else if (e.target.name != "cc" + id) {
            console.log(e.target.name != "cc" + id)
            $("#test" + id + " input[type='submit']").toggle(130)
            $("#test" + id + " textarea").toggle(130)
        }
    })


    form.submit((e) => {
        event.preventDefault()

        answer = input.val()
        solution = textarea.val()
        console.log(input.val().length)

        if (!loginToken.loggedIn) {
            alert("Registerar dig för att Svara")
                //länka till login/reg
        } else if (input.val()) {
            prepareAnswer(input.val())

            console.log(player.teamId)
                //db and request names have been changed
            $.get('../PHP/submitAnswer.php', { submission: prepareAnswer(input.val()), solution: textarea.val(), teamId: player.teamId, puzzleId: id })
                .done((data) => {
                    console.table(data)
                    let div
                    if (data == "Success") {

                        form.html("")

                        div = $("<div>", {
                            class: "uploadAnimation",
                            appendTo: form,
                        })

                        typeAnimation("Ert svar: " + submission, div)

                    } else {
                        form.html("")

                        div = $("<div>", {
                            class: "uploadAnimation",
                            appendTo: form,
                        })

                        data = JSON.parse(data)

                        typeAnimation("Ert lag har redan svarat. Ert svar är: " + data[0].submission, div)
                    }
                })
        } else {
            console.log("no submission")
        }
    })
}

//db och request changed for the new database.
function getTests() {
    $.get("../PHP/getTests.php")
        .done((data) => {
            data = JSON.parse(data)

            data.forEach((obj) => {
                createTest(obj.puzzleId, obj.contentHTML)
            })
            updateSubmissions(testIdArray)

        })
        .fail(() => {
            //take away when launching
            error()
            $("<p>", {
                appendTo: "#sec" + menyActions[0],
                html: "Ops... något vill inte att ni ska se innehållet..."
            }).css({ margin: "10vw" })
        })
}

function updateSubmissions(arr)  {
    arr.forEach((item) => {
        $.get('../PHP/getSubmissions.php', { puzzleId: item })
            .done((data) => {
                data = JSON.parse(data)

                $("#testSubmission" + item + " span").html(data[0].submissions)
            })
            .fail(error)
    })
}




//test


getTests()


setInterval(() => {
    updateSubmissions(testIdArray)
}, 10000)