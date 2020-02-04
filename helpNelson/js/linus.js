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
        }).css({display: "none"})

        this.iconContainer.click(function() {
            $("#menuOptionContent > div").css({display: "none"})
            this.content.css({display: "block"})
        }.bind(this))
    } 
}




