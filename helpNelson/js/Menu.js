import MenuOption from "./MenuOption.js"

export default class Menu {
    constructor() {
        this.options = [];
        this.$menuContainer = $("#menuOptionContainer");
    }

    addOption(optionLabel, optionContent) {
        const option = new MenuOption(optionLabel, optionContent);
        options.push(option);
    }

    render() {
        this.$menuContainer.empty();

    }
}