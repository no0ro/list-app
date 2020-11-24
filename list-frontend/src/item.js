class Item {
    constructor(name, id, list_id) {
        this.name = name
        this.id = id
        this.list_id = list_id
    }

    renderItem() {
        return `
        <li class="list-group-item"> - ${this.name}</li>
        `;    
    }
}
