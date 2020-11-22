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
        // console.log(data)
        
    }
    
    getLists() {
        // fetch
        console.log("inside getLists()")
        return fetch("http://localhost:3000/lists")
            // .then puts our responcefn inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
            .then(response => response.json()).then(json => (json.data))
            .then(data => { // data = array of objects //console.log(data)
                this.createListObjects(data)
                return data
            })
                // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
                // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
            .catch(console.error)
        // 2. createListObjects()
        // 3. addListsToDom()
    }
    
    
 

    fetchAndRenderListsToDom() {

    }

    createNewItem(name){
        const newItem = new Item()
    }
    // 1.
    


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

    // 2 . take data and turn it into List Objects, 
    createListObjects(data){
        // create list vari to save new obj to
        let listsArr = [];
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
                    //console.log(newItem)
                    // itemsArr.push(newItem)
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
                console.log(newList)
                listsArr.push(newList)
        })
        // push to lists array -- will return back to getLists when done
        console.log(listsArr)
        return listsArr
    }
    
    // 3. 
    addListsToDom() {

    } 


// end of class
}


