class Item {
    constructor(name, id, list_id, created_at) {
        // this.item = new Item(name)
        this.name = name
        this.id = id
        this.list_id = list_id
        this.created_at = created_at
    }

    renderItem() {
        return `
        <li class="list-group-item"> - ${this.name}</li>
        `;    
    }
}

//<button data-description="${this.name}">X</button>
