//Code for puzzle

class PuzzleGame1 {
    constructor(puzzleId, contentHTML) {
        //properties
        this.id = puzzleId

        //elements
        this.puzzleContainer = $("<div>", {
            class: "puzzleContainer",
            "id": "puzzle" + this.id,
            appendTo: "#game"
        })


        //nr of submissions
        $('<div>', {
            "id": "nrOfSub" + this.id,
            html: "<span></span> svar har skickats in",
            class: "puzzleSubmission",
            appendTo: this.puzzleContainer
        })

        //content
        $("<div>", {
            class: "puzzleContent",
            appendTo: this.puzzleContainer,
            html: contentHTML,
        })

        //form for answer
        $("<form>", {
            "id": "puzzleForm" + this.id,
            appendTo: this.puzzleContainer
        })

        //default form button (without team or not logged in)
        $("<input>", {
            type: "button",
            class: "button",
            value: "Svara",
            appendTo: "#puzzleForm" + this.id,
            click: function() {
                let message
                if (!loginToken) {
                    message = "Logga in eller registrera dig för att kunna svara"
                } else if (!loginToken.teamId) {
                    message = "Skapa ett team för att skicka in svar"
                }
                console.log(this.id)
                $("#puzzleForm" + this.id).empty()
                $("#puzzleForm" + this.id).append("<div>" + message + "</div>")
                setTimeout(() => { $(".logoButton").click() }, 1000)
            }.bind(this)
        })
    }

    createSubmissionFormInput() {
        let input = $("<input>", {
            class: "inputClass",
            type: "text",
            placeholder: "Svar",
            appendTo: "#puzzleForm" + this.id,
        })

        let submit = $("<input>", {
            class: "inputClass",
            type: "submit",
            value: "Skicka in",
            appendTo: "#puzzleForm" + this.id
        }).css({ display: "none" })

        input.focus(() => {
                submit.css({ display: "block" })
            })
            // input.focusout((e)=>{
            //     console.log(e.currentTarget)
            //     submit.css({display: "none"})
            // })

        $("#puzzleForm" + this.id).submit((e) => {
            e.preventDefault()
            console.log(input.val())

            $.get('php/submitAnswer.php', { submission: input.val(), teamId: loginToken.teamId, puzzleId: this.id })
                .done((data) => {
                    console.log(data)
                    this.getPuzzleSubmissions()
                })
                .fail(() => {
                    $("#puzzleForm" + this.id).append("<div>Något gick fel, försök skicka in igen</div>")
                })
        })
    }

    getPuzzleSubmissions() {
        $.get('php/getPuzzleSubmissions.php', { teamId: loginToken.teamId, puzzleId: this.id })
            .done((data) => {
                data = JSON.parse(data)

                $("#puzzleForm" + this.id).empty()
                if (data[0]) {
                    $("#puzzleForm" + this.id).append("<div>Ni har svarat " + data[0].submission + " på denna.</div>")
                } else {
                    this.createSubmissionFormInput()
                }
            })
            .fail(error)
    }

    countSubmissions() {
        $.get('php/countSubmissions.php', { puzzleId: this.id })
            .done(function(data) {
                data = JSON.parse(data)
                $("#nrOfSub" + this.id + " span").html(data[0].submissions)
            }.bind(this))
    }
}

function getPuzzles() {

    $.get('php/getGame1.php')
        .done((data) => {
            let pArr = []

            data = JSON.parse(data)
            data.forEach(item => {
                let p = new PuzzleGame1(item.puzzleId, item.contentHTML)

                pArr.push(p)
                p.countSubmissions()
                setInterval(() => {
                    p.countSubmissions()
                }, 30000);
            })

            window.updatePuzzles = () => {
                console.log(pArr)
                pArr.forEach((obj) => {
                    if (loginToken.teamId) {
                        obj.getPuzzleSubmissions()
                    }
                })
            }
        })
}