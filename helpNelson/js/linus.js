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


let menuOptionLoggedOff = [
    { label: "Logga in", content: $("<div>").load("html/login.html") },
    { label: "Skapa konto", content: $("<div>").load("html/signupform.html") }
]

//creates the menu from the passed in array of objects
function loadMenu(arr) {
    arr.forEach((item) => {
        let o = new MenuOption(item.label, item.content)
        if (item.label == "Logga in" || item.label == "Team") {
            o.iconContainer.click()
        }
    })
}

loadMenu(menuOptionLoggedOff)