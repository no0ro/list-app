class Item {
    constructor(name, id, list_id, created_at) {
        // this.item = new Item(name)
        this.name = name
        this.id = id
        this.list_id = list_id
        this.created_at = created_at
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