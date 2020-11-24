class List {
    constructor(title, id) {
        this.title = title
        this.id = id
        this.items = [] 
        this.lists = []
        // this.addItemBtn = document.getElementById("#add-item-button")
        // this.deleteBtn = 
             //dont want to bind for EVERY instance. just need to add listener for page document as a whole
        //  this.bindEventListeners()   
    }

    fetchAndLoadLists() {
        this.getLists()
        console.log("inside fetchAndLoacd")
        
        // this.addClickListeners()
        // console.log("inside fetchAndLoacd - after addClickListeners()")
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
                console.log("get list arr")
            }) 
            .catch(console.error)
    }


// TO DO - Refactor to be on class
    // 5.
    postList() {
            console.log("inside postList()")
            // let formatInputData = {
            //     title: document.getElementById('title-input').value,
            //     name: document.getElementById('name-input').value
            // }
            const form = event.target.parentElement
            const items = form[1].value.split(', ') // turns into Arr of strings ["hello", "there"]
            const listTitle = form[0].value
            
            // console.log(items)
            // console.log(listTitle)

            let configObj = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
                body: JSON.stringify({
                    title: listTitle,
                    name: items
                }) 
            }

            console.log("before fetch")
            fetch('http://localhost:3000/lists', configObj) 
                .then( response => response.json())
                .then(json => (json.data))
                .then( data => {
                    let newList = this.createOneListAndItemObject(data) // 231

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

    // console.log(data)
                    // console.log(typeof data) //object
                    // console.log(data) // data fetch sends back is CORRECT!!

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
            <div class="card" data-list-id="[${list.id}]" style="width: 25rem; border-color: black;"">
                <div class="card-body">
                    <h5 class="card-title">${list.title}</h5>
                </div>
                <ul class="list-group list-group-flush">`
                    + checkItemsLength() + 
                `
                </ul>
                <div class="card-body">
                    <button data-list-id="[${list.id}]" class="deleteButton btn btn-info" onclick="dl()" > Delete List </button>
                    <br>
                    <form>
                        <div class="form-group">
                            <input class="form-control form-control-sm" type="text" placeholder="add an item..."><br>
                            <input type="submit" name="submit"  value="Add an Item" id="add-item-submit"  class="add-item-button btn btn-info"/>
                        </div>
                    </form>
                </div>
            <br>
            </div>
            <hr>
        `;
    }
    
    createOneListAndItemObject(data) {
        // instanciate List, add attributes
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
        console.log(newList)
        console.log("this is new list ^^")
        return newList

    }

// end of class
}

function dl() {
    console.log("inside deleteList()")
    let listId = event.target.getAttribute(`data-list-id`)
    let slicedListId = listId.slice(1, -1)
    console.log(listId)

    fetch(`http://localhost:3000/lists/${slicedListId}`, {
        method: 'DELETE'})
        .then(response => response.json())
        .then(json => {
            // grag list with jQuery
            console.log(json)
  
           
        })
}