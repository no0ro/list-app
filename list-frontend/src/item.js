class Item {
    constructor(name) {
        // this.item = new Item(name)
        this.name = name;
        this.items = [];
    }
}


function render() {
    return `
    <li class="item">
        ${this.name}
        <button data-description="${this.name}">X</button>
    </li>
    `;    
}

// function createItem(name){
//     this.name = new Item(name)
// }

/*
# GOAL List Structure
   <div class="lists">
        <h3> Grocery List </h3>
        <ul id=items> 
            <li> "Banana" </li>
            <li> "Pizza" </li>
            <li> "Ice Cream" </li>
            <li> "Mustard" </li>
        </ul>
    </div>  
*/