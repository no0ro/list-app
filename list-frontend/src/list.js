class List {
    constructor(title, id) {
        this.title = title
        this.id = id
        this.items = [] 
    }

    // 1. 
    fetchAndLoadLists() {
        this.getLists()
        console.log("inside fetchAndLoacd")

    }

    // 2. --- fetch ALL lists from db
    getLists() {
        console.log("inside getLists()")
        return fetch("http://localhost:3000/lists")
            // .then puts our responce obj inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
            .then(response => response.json())
            .then(json => (json.data))
            .then(data => {  
                // 3. --- make js obj with data
                let arr =  this.createListObjects(data)
                // 4. Add HTML Lists to DOM
               let x =  this.addListsToDom(arr)
            //    console.log(x)
            }) 
            .catch(console.error)
    }

    // 9.
    postList() {
            // console.log("inside postList()")
            const form = event.target.parentElement
            const items = form[1].value.split(', ') // COMMA -  turns into Arr of strings ["hello", "there"]
            console.log(items)
            const listTitle = form[0].value

            let configObj = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
                body: JSON.stringify({
                    "title": listTitle, // COMMA 
                    "name": items
                }) 
            }

            // 10.
            // console.log("before fetch")
            fetch('http://localhost:3000/lists', configObj) 
                .then( response => response.json())
                .then(json => (json.data))
                .then( data => {
                    // console.log(data)
                    // create new List obj in JS 
                    // 11.
                    let newList = this.createOneListAndItemObject(data) // 231

                    let whereToAppend = document.getElementById("lists-index")
                    let div = document.createElement('div')
                    
                    // 12
                    // create new List card in HTML
                    let htmlList = this.createListCardHtml(newList) 
                    div.innerHTML = htmlList
                    whereToAppend.appendChild(div)
                    document.getElementById("list-form").reset()
                    // console.log(newList)
                })
                .catch(console.error)
    } // END --- postList() 

        // 13
    static deleteList() {
        console.log("inside deleteList()")
        let listId = event.target.getAttribute(`data-list-id`)
        let slicedListId = listId.slice(1, -1)

        fetch(`http://localhost:3000/lists/${slicedListId}`, {
        method: 'DELETE'})
        .then(response => response.json())
        .then(json => {
            // grag list with jQuery
           // console.log(json)
        // use ListId to grav dom display list card and delete it from view, items array is alreay deleted from db
                // console.log(list.id) // lst.id doesnt exist - obvi bc this doesnt exist anymore
                let selectedList = document.querySelector(`.card[data-list-id="${listId}"]`)    
                selectedList.remove()
  
        })
    } // static is class level, applies to alllll instances. listener work around w/ id


    // 3 --- take data and turn it into List Objects
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
                // console.log(newList)
                // console.log("inside arrrr")           
            newListObjArr.push(newList)       
        })
        return newListObjArr
    } // end createListObjects()


    // 4. 
    // dont call this fn for post, go straight to createListCardHTML
    addListsToDom(listArr) {
        console.log("inside addListsToDom")
        let listsIndex = document.getElementById("lists-index")

         // What I want:
            // sort list titles alphabetically BEFORE turn into HTML
            // i want to sort by obj's property value, and return those sorted objects back into an arr
        listArr.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }, {ignorePunctuation: true}))  

        let htmlList = listArr.map((list) => list.createListCardHtml(list) + `<br>`)
        listsIndex.innerHTML = htmlList
    }
    
    // 5.  --- MAKE/RENDER HTML CARDS 
    // 12.
    createListCardHtml(list) {
        // 6. --- Add in 1 Item or Iterate items array 
        // 7. --- ADD ITEMS 
        function checkItemsLength() {
            let itemsLength = list.items.length 
            if (itemsLength == 1) {
                console.log(list.items[0])
                return list.items[0].renderItem()
            } else {
            return list.items.map(item => {
                    let newItem = item.renderItem()
                    return newItem
                })
            }
        }

        // return to addListsToDOM() fn
        return `
            <div class="card" data-list-id="[${list.id}]"  border-color: black;"">
                <div class="card-body text-center">
                    <h5 class="card-title">${list.title}</h5>
                </div>
                <ul class="list-group list-group-flush" id="ul-id">
                    ${checkItemsLength()} 
                </ul>
                <div class="card-body text-center">
                    <button data-list-id="[${list.id}]" class="deleteButton btn btn-dark btn-sm" onclick="List.deleteList()" > Delete List </button>
                </div>
            </div>
        `
    }


    // 11
     // instanciate List, add attributes
    createOneListAndItemObject(data) {
        //console.log(data)
        let newList = new List() 
        newList.title = data.attributes.title
        newList.id = data.attributes.id // non string id. -- string version is listObj.id 

        let listLength = data.attributes.items.length

        // Instanciate Item, add attributes
        if (listLength == 1) {
            let newItem = new Item()
            newItem.name = data.attributes.items[0].name
            newItem.id = data.attributes.items[0].id 
            newItem.list_id = data.attributes.items[0].list_id 
            newList.items.push(newItem)

        } else {
            data.attributes.items.map( (item) => {
                let newItem = new Item()
                newItem.name = item.name
                newItem.id = item.id 
                newItem.list_id = item.list_id 
                newList.items.push(newItem)
                    //console.log("iteratinggggg")
            })
           
        }
        // console.log(newList)
        // console.log("this is new list ^^")
        return newList
    } // END -- createOneListAndItemObject(data)


} // END -- class 


