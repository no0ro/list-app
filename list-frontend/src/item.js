class Item {
    constructor(name) {
        this.name = name
    }


 render() {
        // render <li> element. NOTE back ticks
        return `
        <li class="item">
            ${this.name}
            <button data-description="${this.name}">X</button>
        </li>
        `;
           // later, for delete add <button>
    }
}

/*

   <div id="all-lists">
        <h3> Grocery List </h3>
        <ul id=items> 
            <li> "Banana" </li>
            <li> "Pizza" </li>
            <li> "Ice Cream" </li>
            <li> "Mustard" </li>
        </ul>
    </div>  



*/