class MenuOption {
    constructor(label, content, icon) {

        this.label = label;

        this.target = content;



        this.iconContainer = $('<div>', {
            appendTo: "#menuOptionContainer",
        })

        this.icon = $('<div>', {
            class: "menuOptionButton",
            appendTo: this.iconContainer
        }).css("backgroundImage", `url('content/graphicResources/${icon}')`)

        this.iconLabel = $('<div>', {
            html: label,
            class: "flexCenter",
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