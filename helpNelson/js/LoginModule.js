class LoginModule {

    constructor() {
        // Create the login form
        const container = $('div', {
            html: "content"
        })

        const element = $('<div>', {
            html: "<div>",
            class: "menuOptionButton flexCenter"
        })

        this.content = $('<div>', {
            html: content,
            appendTo: "#menuOptionContent"
        }).css({ display: "none" })
    }

}

const test = new LoginModule();