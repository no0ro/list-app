const listFormFields = `
    <label for="list-title">List Title:</label>
    <input type="text" name="title" value="" placeholder="List Title" class="input-text" id="title-input"/>
    <br>
    <label for="new-item-name">Item:</label>
    <input type="text" name="new-item-name" value="" placeholder="new item" class="input-text" id="name-input"/>
    `


class List {
    constructor(title, id, created_at ) {
        this.title = title
        this.id = id
        this.created_at = created_at
        this.items = [] 
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
 
function getLists() {
    console.log("inside getLists()")
    fetch("http://localhost:3000/lists")
        // .then puts our responcefn inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
        .then(response => response.json()) 
        .then(json => (json.data))
        .then(data => {
            // console.log(data)
            // createAList(data) // CREATE JS LIST OBJ - for each list obj, instanciate newList and push to list arr?
            // renderListHtml // MAKE ^^ HTML AND ADD TO DOM - list.createListCard()
            renderListHtml(data)
            List.newListForm() // render static
        } )
            // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
            // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
        .catch(console.error)
}

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

function deleteList() {
    console.log("inside deleteList()")
    let listId 
    fetch(`http://localhost:3000/lists/${listId}`)
        // .then puts our responcefn inside the hidden onFulfilled:[] Array Property, which gets triggered when we get a value back  
        .then(response => response.json()) 
        .then(json => (json.data))
        .then(data => {
            // console.log(data)
            // createAList(data) // CREATE JS LIST OBJ - for each list obj, instanciate newList and push to list arr?
            // renderListHtml // MAKE ^^ HTML AND ADD TO DOM - list.createListCard()
            renderListHtml(data)
            List.newListForm() // render static
        } )
            // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
            // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
        .catch(console.error)

}

List.prototype.addEventButton = function() {
    let newButton =  document.createElement('button')
    newButton.className = 'add-button'
    newButton.id =  this.id 
    newButton.innerText = "Add"

    return newButton
}

List.prototype.listHtml = function() {
    return ` <div class="list-card" data-list-id="${this.id}" >
        <h3>${this.title}<h3>
        <ul class="items-container">
            <li>${this.items} </li>
        </ul>
        <div id="button-box-div>
            <input id="newItemInput" type="text">
            <input type="button" value="Add an Item>
        </div>
    </div>
    `
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
        // allLists.innerHTML = newList.listHtml()

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
       
    // ---------Button Box----------------
     // <div id="button-box-div"> </div
      let buttonBoxDiv = document.createElement('div')
      buttonBoxDiv.setAttribute('id', 'button-box-div')
      emptyCardDiv.appendChild(buttonBoxDiv)

    // ---------Input----------------
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
       

      // ---------Listen on WHOLE button box----------------
     // change to submit/form and listen on whole button box 
    })
}


// Add Patch!! 
//function addItemFromButton()
function addItemFromButton(e){
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
}








