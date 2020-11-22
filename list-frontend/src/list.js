class List {
    constructor(title, id, created_at ) {
        this.title = title
        this.id = id
        this.created_at = created_at
        this.items = [] 
        // this.lists = [];
    }

    fetchAndLoadLists() {
        this.getLists()
        console.log(data)
        
    }
    getLists() {
        // fetch
        console.log("inside getLists()")
        return fetch("http://localhost:3000/lists")
            // .then puts our responcefn inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
            .then(response => response.json()).then(json => (json.data))
            .then(data => {
                console.log(data)
                return data
            })
                // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
                // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
            .catch(console.error)
    
    
        // 2. createListObjects()
        // 3. addListsToDom()
    }
    
    
    createNewItem(name){
        const newItem = new Item()

    }
    // 1.
    

    fetchAndRenderListsToDom() {

    }
    // 2 . take data and turn it into List Objects, 
    //      push to lists array -- will return back to getLists when done
    createListObjects(){
        // called from inside fetch 
        // take in fetch data, pick through hash, assign values
        // return out  1 list object 

         // if items.length > 1 -- iterare, else, call 

    }


    // 3. 
    addListsToDom() {

    } 

   
}


