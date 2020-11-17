class ListAdapter {
    // implements the interface that the client expects or knows
    constructor() {
        this.baseURL = "http://localhost:3000/lists"
    }

    // Add Header

    // fetch call to return List.all
    getLists() {
        return fetch(this.baseURL)
            .then( response => response.json())
            .then(jsonObj => console.log(jsonObj))
            

    }

    // to create
    postList() {

    }

    showList() {

    }
}