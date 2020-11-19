class ListAdapter {
    // implements the interface that the client expects or knows
            // that contain everything the application needs to work properly. The UI is rendered entirely client-side, so no reloading is required. 
    // fetch calls 

    constructor() {
        this.baseURL = "http://localhost:3000/lists"
    }

    // fetch - return List.all - array of List obejcts
    // static??
     getAllLists() {
        console.log("inside getAllLists() - ListAdapter ")

         return fetch(this.baseURL)
            .then( response => response.json()) // .then puts the responce fn inside the onFulfilled:[] array property. thats it! 
            // ^ returns array of objects
            .catch(console.error)
    }
}




// TO DO

    // Add Header

    // // to create
    // postList() {

    // }

    // showList() {

    // }