class List {
    constructor(title) {
        this.adapter = new ListAdapter()
        this.title = title
    }

    getFetchAndMakeLists() {
        console.log("inside getfetchWndmakelists - list component")
         let json = this.adapter.getAllLists()
            .then(lists => {
                lists.forEach(list => {
                this.renderList(list) 
        })
    })

    // console.log(json)
    return json
    }

    // RENDER List Container 
    // Next, call & iterate addItems() + add listener to delete button
    // addItems / renderItems should be in Item component
    renderList(list) {
        console.log("inside renderList- list component")
        let li = document.createElement('li')
        li.innerText = list.title
        li.setAttribute('class', 'list-group-item')
    
        let ul = document.createElement('ul')
        ul.setAttribute('class', 'list-group')
        ul.setAttribute('class', 'list-group-flush')

        let divListCollection = document.getElementById('all-lists')
        // console.log(li)
        ul.append(li) 
        divListCollection.append(ul)
        // Append "add Item"  button with listener on button of List / divListCollection.
    }
}


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