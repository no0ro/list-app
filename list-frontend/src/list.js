class List {
    constructor(title, id) {
        this.title = title
        this.id = id
        this.items = [] 
        this.lists = []
    }

    fetchAndLoadLists() {
        this.getLists()
        console.log("inside fetchAndLoacd")
        // this.addListsToDom(this.lists)
    }
    
    // 1.
    getLists() {
        console.log("inside getLists()")
        return fetch("http://localhost:3000/lists")
            // .then puts our responcefn inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
            .then(response => response.json())
            .then(json => (json.data))
            .then(data => {  
                let arr =  this.createListObjects(data)
                this.addListsToDom(arr)
                console.log(arr)
            }) 
            .catch(console.error)
    }

    // TO DO - Refactor to be on class
    // 5. 
    postList() {
        console.log("inside postList()")

        let formatInputData = {
            title: document.getElementById('title-input').value,
            name: document.getElementById('name-input').value
        }
        let configObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(formatInputData) 
        }

        console.log("before fetch")
        fetch('http://localhost:3000/lists', configObj) 
            .then( response => response.json())
            .then(json => (json.data))
            .then( data => {
                console.log(typeof data) //object
                console.log(data) // data fetch sends back is CORRECT!!
                let newList = this.createOneListAndItemObject(data)

                let whereToAppend = document.getElementById("lists-index")
                let div = document.createElement('div')

                let htmlList = this.createListCardHtml(newList) 
                div.innerHTML = htmlList
                whereToAppend.appendChild(div)
                document.getElementById("list-form").reset()

                console.log(newList)
                console.log("inside .then(data => { ")
            })
            .catch(console.error)
               
        
    } // end postList() 

   
    // this.OnEvent = OnEvent.bind(this);

    // bindEventListeners() {
    //     this.formSubmit.addEventListener("click", function() {
    //         event.preventDefault()
    //         this.postList()
    //     }.bind(this))
    //     // if i had a general "Lists class" this would be better bc then I wouldnt have alll my attributes/List obj, etc involved 
    // }

    // 2 . take data and turn it into List Objects, 
    createListObjects(data){
        // take in fetch data, pick through hash, assign values
        let newListObjArr = []
        data.forEach((listObj) => {
            let newList = new List() 
            newList.title = listObj.attributes.title
            newList.id = listObj.attributes.id // non string id. -- string version is listObj.id 
            let listLength = listObj.attributes.items.length

                if (listLength == 1) {
                    let newItem = new Item()
                    newItem.name = listObj.attributes.items[0].name
                    newItem.id = listObj.attributes.items[0].id 
                    newItem.list_id = listObj.attributes.items[0].list_id 
                    newList.items.push(newItem)
                } else {
                    listObj.attributes.items.map( (item) => {
                        let newItem = new Item()
                        newItem.name = item.name
                        newItem.id = item.id 
                        newItem.list_id = item.list_id 
                        newList.items.push(newItem)
                            //console.log("iteratinggggg")
                    })
                }
                console.log(newList)
                console.log("inside arrrr")           
            newListObjArr.push(newList)       
        })
        return newListObjArr
    } // end createListObjects()


    // 3.
    // dont call this fn for post, go straight to createListCardHTML
    addListsToDom(listArr) {
            console.log("inside addListsToDom")
            console.log(listArr) // arr of arr's rn 
        let listsIndex = document.getElementById("lists-index")
        let htmlList = listArr.map((list) => list.createListCardHtml(list) + `<br>`)

        listsIndex.innerHTML = htmlList
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
        

   
    // same as createListObjects - but for when sent from POST - aka will have only one obj. no need to iterate
    createOneListAndItemObject(data){
        // instanciate List, add attributes
        //console.log(data)
        let newList = new List() 
        newList.title = data.attributes.title
        newList.id = data.attributes.id // non string id. -- string version is listObj.id 

        // Instanciate Item, add attributes
        let newItem = new Item()
        newItem.name = data.attributes.items[0].name
        newItem.id = data.attributes.items[0].id 
        newItem.list_id = data.attributes.items[0].list_id 
        newList.items.push(newItem)
        return newList
        // console.log(newList)

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


