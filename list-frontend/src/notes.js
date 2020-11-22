const listFormFields = `
    <label for="list-title">List Title:</label>
    <input type="text" name="title" value="" placeholder="List Title" class="input-text" id="title-input"/>
    <br>
    <label for="new-item-name">Item:</label>
    <input type="text" name="new-item-name" value="" placeholder="new item" class="input-text" id="name-input"/>
    `

    const addItemFormFields = `
    <label for="new-item-name">Item:</label>
    <input type="text" name="new-item-name" value="" placeholder="new item" class="input-text" id="name-input"/>
    `

// `
// <${this.title}>
//     <id=`"items ${list.id}"`>
//         display/render current this.items (aka items array)
// <${this.addItemForm}> 

// // addItemForm issues a patch that displays inside the 
// `

class List {
    constructor(title, id, created_at ) {
        // this.item = new Item(name)
        this.title = title
        this.id = id
        this.created_at = created_at
        this.items = [] // collection of item objects
        // this.lists = [];
    }

    // return false aka preventDefault
    static newListForm() { 
        let newFormDiv = document.getElementById('test-list-form')
        newFormDiv.innerHTML = `
        <form onsubmit="postList(); return false;">` + 
            listFormFields + 
        `
        <input type="submit" name="submit" value="CreatList" />
        </form>
        <br>
        `
    }

}
    // renderItems() {
    //     return this.attributes.items.map(item => item.render()).join('');
    // }


function getLists() {
    console.log("inside getLists()")
    fetch("http://localhost:3000/lists")
        // .then puts our responcefn inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
        .then(response => response.json()) 
        .then(json => (json.data))
        .then(data => {
            // console.log(data)
            //createAList(data)
            renderListHtml(data)
            List.newListForm() // render static
        } )
            // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
            // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
        .catch(console.error)
}


// called after form is submitted -- create a new List
// inside static new/edit
function makeList(){}

function postList() {
    // event.preventDefault()  -- Happened in form via false
    console.log("post")
    // pass body JSON srting, 
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
      .then ( data => {
        // createAListObj(data)

        console.log("inside fetch")
        console.log(data)
        renderListHtml(data) // renderItem
        // CLEAR LIST - e.target.reset(), but not this
        // renderToy(listObj) // render List to DOM
        // divToyCollection.appendChild(newToy)
      })
  }

// render Lists ALREADY IN DB - AKA this would apply to POST too!
function renderListHtml(listObjects){
    // iterate through List Objects, 
    let allLists = document.getElementById("lists-index")

    listObjects.forEach((listObj) => {
// -------Make New List/Item Start----------------------------------

        console.log("inside renderListHtml")
        console.log(listObj)

        // let title = listObj.attributes.title // "Grocery List"
        let newList = new List(listObj.attributes.title) 
        newList.id = listObj.attributes.id // non string id. -- string version is listObj.id 
        newList.created_at = listObj.attributes.created_at
        
        let newItem = new Item()
        newItem.name = listObj.attributes.items[0].name
        newItem.id = listObj.attributes.items[0].id 
        newItem.list_id = listObj.attributes.items[0].list_id 
        newItem.created_at = listObj.attributes.items[0].created_at

        newList.items.push(newItem)
        console.log(newItem)
       
        console.log(newList)
        console.log("just created newList")
    // ------------------------------------------

    // -----Make Empty Div Card To Hold Each List Obj----
    let emptyCardDiv = document.createElement('div')
    emptyCardDiv.className = "list-card"
    allLists.appendChild(emptyCardDiv)
   

    // ----Append HTML Elements to List Card ----
        
    // <h3> Grocery List </h3>
        let h3 = document.createElement('h3')
        h3.innerText = newList.title  // Grab title
        emptyCardDiv.append(h3)

    // <ul id="items"> </ul> 
        let ul = document.createElement('ul')
        ul.className = "items-container" // where we want to append
        emptyCardDiv.append(ul)
  
    // <li> Bananas </li>
        let li = document.createElement('li')
        li.innerText = newList.items[0].name
        ul.appendChild(li)
       

                // ul.innerHTML = makeArrOfItems(listObj) //taskList.renderTask() // userinput pull from Taskrender
                    // append to <li> ^
                    // emptyCardDiv.append(ul)

    // dif way to write input
    // <input type="text" name="new-item-name" value="" placeholder="New Item" class="input-text"/>
    //       <br>
    //       <input type="submit" name="submit" value="Create List" class="submit"/>

    // ---------Button Box----------------
     // <div id="button-box-div"> </div
      let buttonBoxDiv = document.createElement('div')
      buttonBoxDiv.setAttribute('id', 'button-box-div')
      emptyCardDiv.appendChild(buttonBoxDiv)

    // input
    // <input type="text" id="newItemText">
        let input1 = document.createElement('input')
        input1.setAttribute('type', 'text')
        input1.setAttribute('id', 'newItemInput')
        buttonBoxDiv.appendChild(input1)
    
    // <input type="button" value="Add an Item" onclick="addItem()">
        let inputButton = document.createElement('input')
        inputButton.setAttribute('type', 'button')
        inputButton.setAttribute('value', 'Add an Item')
        buttonBoxDiv.appendChild(inputButton)
        // inputButton.setAttribute('onClick', 'addItemFromButton()')
        inputButton.addEventListener('click', addItemFromButton)
        //     console.log(e.target.value)
        // })

        //newFunction(inputButton)

       // emptyCardDiv.append(input1)
        //emptyCardDiv.append(inputButton)
         //\\ buttonBoxDiv.appendChild(inputButton)

      // ---------Listen on WHOLE button box----------------
          // ---------Listen on WHOLE button box----------------
       // change to submit/form and listen on whole button box 
    })
}


// Add Patch!! 
//function addItemFromButton()
function addItemFromButton(e){
    // issue is cant append to floating uL and making an empty ul in document is considered null. maybe could add text in a different way 
    // clear form after click, and reset listener so dont need to refresh the page. 
    // - !! save input to that List as Item. 
    console.log("inside addItemFromButton")
    console.log(e.target.value)
    
 
// CAPTURE USER INPUT
    let input = document.getElementById("newItemInput");
   console.log(input)
    if (input.value.length === 0) {
        return;
    }
    let text = input.value // empty string rn
      
    console.log(text)
    let newLi = document.createElement("li");
    newLi.textContent = text;
    console.log(newLi)
    document.getElementById("add-items").appendChild(newLi)
    input.value = "";

    // let x = document.getElementById("emptyCardDiv")
    // x.appendChild(newLi)
}


// PAST DIDNT WORK BUT WHERE LEFT OFF
// function addItemFromButton(e){
//     // issue is cant append to floating uL and making an empty ul in document is considered null. maybe could add text in a different way 
//     // clear form after click, and reset listener so dont need to refresh the page. 
//     // - !! save input to that List as Item. 
//     console.log("inside addItemFromButton")
//     console.log(e.target.value)
    
 
// // CAPTURE USER INPUT
//     let input = document.getElementById("newItemInput");
//     console.log(input)
//     let text = input.value // empty string rn
//     console.log(text)
//     // if (input.value.length === 0) {
//     //     return;
//     // }
//     let newLi = document.createElement("li");
//     newLi.innerText = text;
//     console.log(newLi)
//     document.getElementById("add-items").appendChild(newLi)


//     // let x = document.getElementById("emptyCardDiv")
//     // x.appendChild(newLi)
// }


List.prototype.addItemButton = function () {
    let 
    
}


function renderItems() {
    return this.items.map(item => console.log(item))
}



// createNewItem("")
function makeArrOfItems(listObjects){
    //console.log(listObjects)
    itemArray = []
    listObjects.attributes.items.map( item => {
        itemArray.push(item.name)
    })
    return itemArray
}






// // from post?
// function createAListObj(data){
//     console.log(data)
  
//     let list = new List(data.attributes.title)
//     console.log(list)
//     let item = new Item(data.attributes.items[0].name, list.id)
//     console.log(" below is item")
//     console.log(item)

   
//     let newList = list.items.push(item) 
//     console.log("below is newList")
//     console.log(newList)
//     console.log(newList.items)
// }


function clearFormInput() {
    
}

function createNewItem(existingList, name){
    console.log(existingList)
    name = event.target.value // grab user item input
    let newItem = new Item(name); // instanciate new Item with user input
    existingList.items.push(newItem) // push this new item onto the List we passed in 
    // return updated List Object
    // then should pass to an HTML render to take it from JSON to HTML
    // so then for update, just render
}


















    // RENDER List Container 
    // ^^ goal? render the card skeleton - div card / ul
            // Next, call & iterate addItems() + add listener to delete button
            // addItems(?)/ renderItems should be in Item component
// function renderList(arrOfListObjects) {
//     console.log("inside renderList- list component")
//     console.log(arrOfListObjects)

//     arrOfListObjects.map(listObject => {
//         console.log("hi")
//         let allListsDiv = document.getElementById('card-shell')
//         let br =  document.createElement('br')

//     // <div class="card-body">
//             let cardBodyDiv = document.createElement('div')
//             cardBodyDiv.setAttribute('class', 'card-body')
//         // <h5 class="card-title">Card title</h5>
//             let cardTitle = document.createElement('h5')
//             cardTitle.setAttribute('class', 'card-title')
//             cardTitle.innerText = listObject.title
//         // append ^ 
//             cardBodyDiv.append(cardTitle)
//             allListsDiv.append(cardBodyDiv)

//     // start items
//         // <ul class="list-group list-group-flush">
//                 // Item Display - Ul container 
//                 let itemUl = document.createElement('ul')
//                 itemUl.setAttribute('class', 'list-group')
//                 itemUl.setAttribute('class', 'list-group-flush') 
                
//             // <li class="list-group-item">Cras justo odio</li>
//                 // Item Display - Li
//                 let itemLi = document.createElement('li')
//                 itemLi.setAttribute('class', 'list-group-item')
//                 itemLi.innerText = listObject.id // index[0]

//         // append ^
//                 itemUl.append(itemLi)
//                 allListsDiv.append(itemUl)
//                 allListsDiv.append(br)
//     })
// } 



// createNewItem("")
// function makeItemInstances(listObjects){
//     console.log(listObjects)
//     itemArray = []
//     listObjects.attributes.items.map( item => {
//         const newItem = new Item(item.name); // create item 
//         let x = LISTITEM.items.newItem // assign it to List
//         console.log(x)
//         let x = createNewItem(item.name) // maybe could call this fn if list.item.length < . aka user submitted only one task so wont need to iterate

//         // calls new Item, 
//     function createNewItem(name){
//         const newItem = new Item(name);
//         console.log(name)
//         console.log(newItem)
//         this.items.push(newItem);
//     }
//     })
// }


// // createNewItem("")
// function makeArrOfItems(listObjects){
//     console.log(listObjects)
//     itemArray = []
//     listObjects.attributes.items.map( item => {
//         console.log(item)
//         let x = createNewItem(item.name)
//         itemArray.push(x)
//         // itemArray.push(item.name)

//     })
//     return itemArray
// }
