class List {
    constructor(title, id, created_at ) {
        this.title = title
        this.id = id
        this.created_at = created_at
        this.items = [] 
        this.lists = [];
        // this.fetchAndLoadLists()
        this.formSubmit = document.getElementById("form-submit")
        this.bindEventListeners()
    }

    fetchAndLoadLists() {
        this.getLists()
        console.log("inside fetchAndLoacd")
      
        // this.addListsToDom(this.lists)
    }
    
    // 1.
    getLists() {
        // fetch
        console.log("inside getLists()")
        return fetch("http://localhost:3000/lists")
            // .then puts our responcefn inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
            .then(response => response.json())
            .then(json => (json.data))
            .then(data => {  
                this.createListObjects(data)}) // 2. 
            .then(() => {
                console.log(".then call to addListsToDom")
                this.addListsToDom() // 3. 
                // data = array of objects //console.log(data)
            })
            
                // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
                // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
            .catch(console.error)
    }

    // 5. 
    postList() {
        const form = event.target.parentElement
        console.log(form)
    }

    bindEventListeners() {
        this.formSubmit.addEventListener("click", function() {
            event.preventDefault()
            this.postList()
        }).bind(this)
    }

    // 3.
    addListsToDom() {
            console.log("inside addListsToDom")
        let listsIndex = document.getElementById("lists-index")
        let htmlList = this.lists.map((list) => list.createListCardHtml(list) + `<br>`)

        listsIndex.innerHTML = htmlList
            // console.log("thisis x")
            //console.log(x)
    }
    
    // 4.
    createListCardHtml(list) {
        console.log("inside renderListsToDom") 
        // TO DO - refactor with recursion
        function checkItemsLength() {
            let itemsLength = list.items.length 
                 // console.log(itemsLength)
            if (itemsLength == 1) {
                 return list.items[0].renderItem()
            } else {
               return list.items.map(item => {
                    let newItem = item.renderItem()
                        // console.log(x)
                    return newItem
                })
            }
        }

            return `
                <div class="card" style="width: 25rem; border-color: black;"">
                    <div class="card-body">
                        <h5 class="card-title">${list.title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">`
                        + checkItemsLength() + 
                    `
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Add Item</a>
                        <a href="#" class="card-link">Delete Item</a>
                    </div>
                <br>
                </div>
                <hr>
            `;
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
                            //console.log("iteratinggggg")
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
