// code for meny
function checkTeamSubmition(puzzleid) {
    if(!loginToken.teamId) {
        return false
    }
    console.log("am I running?")
}



class MenuOption {
    constructor(label, content) {
        this.iconContainer = $('<div>', {
            appendTo: "#menuOptionContainer",
        })

        this.icon = $('<div>', {
            html: label,
            class: "menuOptionButton flexCenter",
            appendTo: this.iconContainer

        })

        this.content = $('<div>', {
            html: content,
            appendTo: "#menuOptionContent"
        }).css({ display: "none" })

        this.iconContainer.click(function() {
            $("#menuOptionContent > div").css({ display: "none" })
            this.content.css({ display: "block" })
        }.bind(this))
    }
}


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
            html: "<span>SUBS</span> svar har skickats in", 
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
            appendTo: "#puzzleForm" + this.id,
            click: function() {
                let message
                if(!loginToken) {
                    message = "Logga in eller registrera dig för att kunna svara"
                } else if (!loginToken.teamId) {
                    message = "Skapa ett team för att skicka in svar"
                }
                console.log(this.id)
                $("#puzzleForm" + this.id).empty()
                $("#puzzleForm" + this.id).append("<div>" + message + "</div>")
                setTimeout(()=>{$(".logoButton").click()}, 1000)
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
        }).css({display: "none"})

        input.focus(()=>{
            submit.css({display: "block"})
        })
        // input.focusout((e)=>{
        //     console.log(e.currentTarget)
        //     submit.css({display: "none"})
        // })

        $("#puzzleForm" + this.id).submit((e)=>{
            e.preventDefault()
            console.log(input.val())

            $.get('php/submitAnswer.php', { submission: input.val(), teamId: loginToken.teamId, puzzleId: this.id })
            .done((data)=>{
                console.log(data)
                this.getPuzzleSubmissions()
            })
            .fail(()=>{
                $("#puzzleForm" + this.id).append("<div>Något gick fel, försök skicka in igen</div>") 
            })
        })
    }

    getPuzzleSubmissions() {
        $.get('php/getPuzzleSubmissions.php', {teamId: loginToken.teamId, puzzleId: this.id})
        .done((data)=>{
            data = JSON.parse(data)
            console.log(data)
            
            $("#puzzleForm" + this.id).empty()
            if(data[0]) {
                $("#puzzleForm" + this.id).append("<div>Ni har skickat in " + data[0].submission + " som svar</div>")
            } else {
                this.createSubmissionFormInput()
            }
        })
        .fail(error)
    }
}


function getPuzzles() {
    
    $.get('php/getGame1.php')
    .done((data)=>{
        let pArr = []
        
        data = JSON.parse(data)
        data.forEach(item => {
            let p = new PuzzleGame1(item.puzzleId, item.contentHTML)
            
            pArr.push(p) 
        })
 
        window.updatePuzzles = ()=>{
            console.log(pArr)
            pArr.forEach((obj)=>{
                if(loginToken.teamId) {
                    obj.getPuzzleSubmissions()
                } 
            })
        }
    })
}





