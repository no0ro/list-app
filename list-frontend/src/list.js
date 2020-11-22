class List {
    constructor(title, id, created_at ) {
        this.title = title
        this.id = id
        this.created_at = created_at
        this.items = [] 
        this.lists = [];
    }

    fetchAndLoadLists() {
        this.getLists()
        console.log("inside fetchAndLoacd")
      
        this.addListsToDom(this.lists)
        console.log("her!!e")
    }
    
    getLists() {
        // fetch
        console.log("inside getLists()")
        return fetch("http://localhost:3000/lists")
            // .then puts our responcefn inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
            .then(response => response.json())
            .then(json => (json.data))
            .then(data => {  
                this.createListObjects(data)})
            .then(() => {
                console.log("sup")
                this.addListsToDom()
                // data = array of objects //console.log(data)
            })
            
                // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
                // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
            .catch(console.error)
    }

    // 3.
    addListsToDom() {
        console.log("inside addListsToDom")
        console.log(this.lists) // arr of list objects
        // for (let list of this.lists) {
        let listsIndex = document.getElementById("lists-index")
        let x = this.lists.map((list) => list.createListCardHtml(list)).join('')
            
        listsIndex.innerHTML = x
            console.log("thisis x")
            console.log(x)
    }
    
    createListCardHtml(list) {
        console.log("inside renderListsToDom")
        let listsIndex = document.getElementById("lists-index")
      
            return `
                <h3> ${list.title}</h3>
            `;
    }
        
    fetchAndRenderListsToDom() {
    }

    
    createNewItem(name){
        const newItem = new Item()
    }
    
    // 2 . take data and turn it into List Objects, 
    createListObjects(data){
        // take in fetch data, pick through hash, assign values
         data.forEach((listObj) => {
            let newList = new List() 
            newList.title = listObj.attributes.title
            newList.id = listObj.attributes.id // non string id. -- string version is listObj.id 
            newList.created_at = listObj.attributes.created_at
            let listLength = listObj.attributes.items.length

                if (listLength == 1) {

                    let newItem = new Item()
                    newItem.name = listObj.attributes.items[0].name
                    newItem.id = listObj.attributes.items[0].id 
                    newItem.list_id = listObj.attributes.items[0].list_id 
                    newItem.created_at = listObj.attributes.items[0].created_at
                    newList.items.push(newItem)
                } else {
                    listObj.attributes.items.map( (item) => {
                    
                        let newItem = new Item()
                        newItem.name = item.name
                        newItem.id = item.id 
                        newItem.list_id = item.list_id 
                        newItem.created_at = item.created_at
                        newList.items.push(newItem)
                        //console.log(item)
                        console.log("iteratinggggg")
                    })
                }
                //console.log(newList)
                // finished making the list, so push to this.lists
                this.lists.push(newList)         // push to lists to array -- will return back to getLists when done
        })
    }
    


// end of class
}




// CLOSURE Idea For new items obj

// make this a closure with reference to outter listobj/List info 
// createNewItem(items){
//     let itemsArr = []
//     this.items.map(newItem => {
//         //index [0]
//         let newItem = new Item()
//         newItem.name = listObj.attributes.items[0].name
//         newItem.id = listObj.attributes.items[0].id 
//         newItem.list_id = listObj.attributes.items[0].list_id 
//         newItem.created_at = listObj.attributes.items[0].created_at
//         console.log(newItem)
//         itemsArr.push(newItem)
//     })
//     return items 
// }
