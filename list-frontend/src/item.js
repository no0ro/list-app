class Item {
    constructor(name, id, list_id) {
        this.name = name
        this.id = id
        this.list_id = list_id
    }

    // 7. --- ADD ITEMS  
    renderItem() {

        return `<li class="list-group-item"> <span>&#10162;</span> ${this.name}</li>
        `
    }
}

