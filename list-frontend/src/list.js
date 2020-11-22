class List {
    constructor(title, id, created_at ) {
        this.title = title
        this.id = id
        this.created_at = created_at
        this.items = [] 
        // this.lists = [];
    }


    createNewItem(name){
        const newItem = new Item()

    }
    // 1.
    getLists() {
        // fetch


        // 2. createListObjects()
        // 3. addListsToDom()
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