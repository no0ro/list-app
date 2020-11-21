const listFormFields = `
    <label for="list-title">List Title:</label>
    <input type="text" name="title" value="" placeholder="List Title" class="input-text"/>
 `

class List {
    constructor(title) {
        // this.item = new Item(name)
        this.title = title;
        this.items = [];
        this.lists = [];
    }
        static newListForm() { 
            let newFormDiv = document.getElementById('test-list-form')
            newFormDiv.innerHTML = `
            <form onsubmit="makeList();">` + 
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
            renderListHtml(data)
            List.newListForm()
        } )
            // console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
            // console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"
        .catch(console.error)
}

// called after form is submitted -- create a new List
// inside static new/edit
function makeList(){

}

// render Lists ALREADY IN DB
function renderListHtml(listObjects){
    // iterate through List Objects, 
    let allLists = document.getElementById("lists-index")

    listObjects.forEach((listObj) => {
        console.log(listObj)

    // Grab title
        let title = listObj.attributes.title // "Grocery List"
        
    // <h3> Grocery List </h3>
        let h3 = document.createElement('h3')
        h3.innerText = title 
        allLists.append(h3)


    // <ul id="items"> </ul> 
        let ul = document.createElement('ul')
        ul.className = "items"
        // get all Items from the List Obj, save in arr
        ul.innerHTML = makeArrOfItems(listObj) //taskList.renderTask() // userinput pull from Taskrender
            // append to <li> ^
        allLists.append(ul)

        //   // <ul id="items"> </ul> 
        //   let ul = document.getElementById('x')
        // //   ul.className = "items"
        //   // get all Items from the List Obj, save in arr
        //   ul.innerHTML = makeArrOfItems(listObj) //taskList.renderTask() // userinput pull from Taskrender
        //       // append to <li> ^
        //   //allLists.append(ul)


        let input1 = document.createElement('input')
        input1.setAttribute('type', 'text')
        input1.setAttribute('id', 'newItemText')

        let inputButton = document.createElement('input')
        inputButton.setAttribute('type', 'button')
        inputButton.setAttribute('value', 'Add an Item')
        inputButton.addEventListener('click', addItemFromButton)

        allLists.append(input1)
        allLists.append(inputButton)


        // <input type="text" id="newItemText">
        // <input type="button" value="Add an Item" onclick="addItem()">
    
    })
}


function addItemFromButton(e){
    console.log("inside addItemFromButton")
    console.log(e)
    let input = document.getElementById("newItemText");
    if (input.value.length === 0) {
        return;
    }
    let text = input.value;
    let newLi = document.createElement("li");
    newLi.textContent = text;
    document.getElementById("lists-index").appendChild(newLi);
    input.value = "";

}
function renderItems() {
    return this.items.map(item => console.log(item))
}

// createNewItem("")
function makeArrOfItems(listObjects){
    console.log(listObjects)
    itemArray = []
    listObjects.attributes.items.map( item => {
        itemArray.push(item.name)
    })
    return itemArray
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
