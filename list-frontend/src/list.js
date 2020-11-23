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
            }) // 2. 
            // .then((arr) => {
            //     console.log(".then call to addListsToDom")
            //     console.log(arr)
            //     this.addListsToDom(this.arr) // 3.
            // })
            .catch(console.error)
    }

    // TO DO - Refactor to be on class
    // 5. 
    postList() {
        console.log("inside postList()")
        // another way to grab input
        //      const form = event.target.parentElement
        //      const item = form[1].value
        //      const list = form[0].value
        // console.log(listTitle)
        // console.log(itemName)
        
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
                console.log(typeof data)
                console.log(data) // data fetch sends back is CORRECT!!
                let newList = this.createOneListAndItemObject(data)
               
                console.log(newList)
                    console.log("inside .then(data => { ")
            })
            .then(() => {
                console.log(".then call to addListsToDom")
                // console.log(this.list)
                 this.addListsToDom() // x3. 
                // data = 1 List Obj to add to dom //console.log(data)
            })
                // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
                // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
            .catch(console.error)
               
    // end postList()        
    } 

    // addOneListToDom() {
    //     // createListCardHtml(list) 
    //     console.log(this.list)
    //     let listsIndex = document.getElementById("lists-index")
    //     let htmlList = createOneListCardHtml(list)
    // }

    // createOneListCardHtml(list) {

    //     return `
    //     <div class="card" style="width: 25rem; border-color: black;"">
    //         <div class="card-body">
    //             <h5 class="card-title">${list.title}</h5>
    //         </div>
    //         <ul class="list-group list-group-flush">`
    //             + list.items.renderItem() + 
    //         `
    //         </ul>
    //         <div class="card-body">
    //             <a href="#" class="card-link">Add Item</a>
    //             <a href="#" class="card-link">Delete Item</a>
    //         </div>
    //     <br>
    //     </div>
    //     <hr>
    // `;
    // }


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
                        //console.log(item)
                        //console.log("iteratinggggg")
                })
            }
            console.log(newList)
            console.log("inside arrrr")
            // finished making the list, so push to this.lists
           
        newListObjArr.push(newList)         // push to lists to array -- will return back to getLists when done

    })
    return newListObjArr
  

    // console.log(newListObjArr)
}


    // 3.
    addListsToDom(listArr) {
            console.log("inside addListsToDom")
            console.log(listArr) // arr of arr's rn 
        let listsIndex = document.getElementById("lists-index")
        let htmlList = listArr.map((list) => list.createListCardHtml(list) + `<br>`)

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
      
        // Add this List to the Lists arr
        // this.lists.push(newList)  // this is pushing to the list arr for the current DOM. not an overarching list arr
        // console.log(this.lists)
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


