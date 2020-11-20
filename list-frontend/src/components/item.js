class Item {
    constructor(name) {
        this.name = name
    }


 render() {
        // render <li> element. NOTE back ticks
        return `
        <li>
            ${this.name}
            <button data-description="${this.name}">X</button>
        </li>
        `;
           // later, for delete add <button>
    }

}