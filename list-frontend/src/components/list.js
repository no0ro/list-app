class List {
    constructor(title) {
        this.adapter = new ListAdapter()
        this.title = title
        this.items = []
    }

    createNewItem(name){
        const newItem = new Item(name); // instanciate new Ite.],
        this.items.push(newItem) // push item into items array
    }

    // JUST making lots of <li> -- call this inside of renderList?
    renderItems() {
        return this.items.map((item) => item.render()).join("");
    }

    getFetchAndMakeLists() {
        console.log("inside getfetchWndmakelists - list component")
         
        let json = this.adapter.getAllLists() // returns arr of list obj's
            .then(arrOfListObjects => { // .then puts the responce fn inside the onFulfilled:[] array property. promise obj is stored in let json
                this.renderList(arrOfListObjects)
                // arrOfListObjects.forEach(listObject => {
                // this.renderList(listObject) 
                // console.log("hi")
        // })
    })

    // console.log(json)
    // return json
    }

    // RENDER List Container 
    // ^^ goal? render the card skeleton - div card / ul
            // Next, call & iterate addItems() + add listener to delete button
            // addItems / renderItems should be in Item component
    renderList(arrOfListObjects) {
        console.log("inside renderList- list component")

        arrOfListObjects.forEach(listObject => {
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
}

// // <div class="card-body">
//         let cardBodyDiv = document.createElement('div')
//         cardBodyDiv.setAttribute('class', 'card-body')

//     // <h5 class="card-title">Card title</h5>
//         let cardTitle = document.createElement('h5')
//         cardTitle.setAttribute('class', 'card-title')
//         cardTitle.innerText = listObject.title
//     // append ^ 
//         cardBodyDiv.append(cardTitle)


// // <ul class="list-group list-group-flush">
//         // Item Display - Ul container 
//         let itemUl = document.createElement('ul')
//         itemUl.setAttribute('class', 'list-group')
//         itemUl.setAttribute('class', 'list-group-flush')

//     // <li class="list-group-item">Cras justo odio</li>
//         // Item Display - Li
//         let itemLi = document.createElement('li')
//         itemLi.innerText = ?listObject?.name
//         itemLi.setAttribute('class', 'list-group-item')

//     // append them 
//         itemUl.append(itemLi)

// // append all 







// Think it through
// renderItems() {
        // pass in Array of items, then iterate over and call 
        // render() (defined in items component) on each arr item. 
        // aka turn user input into html/bootstrap
    // }
    // insert Item here
    
    // delete button (for each item )
        // let btn = document.createElement('button')
        // btn.setAttribute('class', 'delete-btn')
        // btn.setAttribute('id', item.id)
        // btn.innerText = "Delete"
        // btn.addEventListener('click', (e) => {
        //   console.log(e.target.dataset);
        //   delete_meth(e)
        // })

// the name is in the same place as the behavior 
// - list.title // Grocery Shopping 
// - list.push(newItem) // list can add more items to itself  via button after its alrady been created 
// - item.hightlight() // can be highlighted 

// - item.description
// - item.deleted
// - marked urgent! aka change color
// // - has a title & description 
// - 



// possible Functions

    // static formHTML(list){
    //     return()
    // }
    // get formHTML(){
    //     return Location.formHTML(this)
    // }

    // create Item 
        // description 
        // X  button to delete 

    // Render Items
            // createNewItem() {

            //}
  
         
// _______________________________________
// differemt way to render HTML
    // html(){
    //     return(`
    //         <div class="card-body">
    //           <h5 class="card-title">${this.title}</h5>  
    //             <ul class="list-group list-group-flush">
    //                 ${this.createItemLis()}
    //             </ul>
    //         </div>
    //     `)
    // }

    // EXPERIMENTING with ^
    // renderList(lists) {
    //     console.log("inside renderList- list component")
    //     // console.log(lists)
    //     // let test = document.getElementById('app-container')
    //     let divListCollection = document.getElementById('all-lists')
        
    //     let html = ""
    //     let x = lists.forEach(list => {
    //         console.log(list)

    //         return html +=
    //             (`
    //                 <div class='card' style="width: 18rem;"> 
    //                 <div class="card-body">
    //                 <h5 class="card-title">${this.list.title}</h5>  
    //                     <ul class="list-group list-group-flush">
    //                         <li> Example Item </li
    //                     </ul>
    //                 </div>
    //                 </div>
    //             `)
    //     })
    //     // test.parentNode.insertBefore(html, test.nextSibling)
          
    //     divListCollection.innerHTML = html
    // }