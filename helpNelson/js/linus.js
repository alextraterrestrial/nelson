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
            html: "<span>SUBS</span> team har skickat in en lösning.", 
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
                console.log(message)
                $("#puzzleForm" + this.id).empty()
                $("#puzzleForm" + this.id).append("<div>" + message + "</div>")
                $(".logoButton").click()
            }
        })



    }

}




