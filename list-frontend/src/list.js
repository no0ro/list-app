const listForm = ` 
    <label for="list-title">List Title:</label>
    <input type="text" name="list-title" placeholder="List Title" value=""  class="input-text"/>
`

class List {
    constructor(title) {
        this.title = title
        this.items = [] 
        this.lists = []
    }


}

function getLists() {
    console.log("inside getLists()")

    fetch("http://localhost:3000/lists")
        .then(response => response.json()) // .then puts the responce fn inside the onFulfilled:[] array property. thats it! 
        .then(json => (json.data))
        .then(data => {
            console.log(data)
            renderList(data)
        } )
            // .then(data => {
            //     console.log(data[1].attributes.title) // "Faith's Wedding: MOH"
            //     console.log(data[1].attributes.items[0].name) // "Plan Bachelorette"

            // })
            // ^ returns array of objects
        .catch(console.error)
}

   

// JUST making lots of <li> -- call this inside of renderList?
function renderItems() {
        return this.items.map((item) => item.render()).join("");
}


    function renderAList(){

    }

    function appendLists(){
        for (let list of lists){
            console.log("append list")
        }
    }



    function makeArrOfItems(items){
        let itemsArr = []
        for (let item of items){
            itemsArr.push(item.name)
        }
        return itemsArr
    }

    function createNewItem(name){
        const newItem = new Items(); // instanciate new Ite.],
        this.items.push(newItem) // push item into items array
    }

    function renderLists(lists){
        console.log("in renderLists")
        for (let list of lists){
            //let title = this.attributes.title
            let items = this.makeArrOfItems(list.attributes.items)
            // (WHERE LEFT OFF) this.createNewItem(items)
            console.log(items) // 0: "Plan Bachelorette" 1: "Speech"
            console.log(title) // 0: "Plan Bachelorette" 1: "Speech"


            //this.lists.push(new List(list.attributes.title, items))
            //console.log(this.lists)
        }
    }


    // RENDER List Container 
    // ^^ goal? render the card skeleton - div card / ul
            // Next, call & iterate addItems() + add listener to delete button
            // addItems / renderItems should be in Item component
function renderList(arrOfListObjects) {
        console.log("inside renderList- list component")
        console.log(arrOfListObjects)

        arrOfListObjects.map(listObject => {
            console.log("hi")
            let allListsDiv = document.getElementById('card-shell')
            let br =  document.createElement('br')

        // <div class="card-body">
                let cardBodyDiv = document.createElement('div')
                cardBodyDiv.setAttribute('class', 'card-body')
            // <h5 class="card-title">Card title</h5>
                let cardTitle = document.createElement('h5')
                cardTitle.setAttribute('class', 'card-title')
                cardTitle.innerText = listObject.title
            // append ^ 
                cardBodyDiv.append(cardTitle)
                allListsDiv.append(cardBodyDiv)

        // start items
            // <ul class="list-group list-group-flush">
                    // Item Display - Ul container 
                    let itemUl = document.createElement('ul')
                    itemUl.setAttribute('class', 'list-group')
                    itemUl.setAttribute('class', 'list-group-flush') 
                    
                // <li class="list-group-item">Cras justo odio</li>
                    // Item Display - Li
                    let itemLi = document.createElement('li')
                    itemLi.setAttribute('class', 'list-group-item')
                    itemLi.innerText = listObject.id // index[0]

            // append ^
                    itemUl.append(itemLi)
                    allListsDiv.append(itemUl)
                    allListsDiv.append(br)
    
    })
} 


