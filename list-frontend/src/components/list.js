class List {
    // static formHTML(list){
    //     return()
    // }
    // get formHTML(){
    //     return Location.formHTML(this)
    // }

    constructor(title) {
        this.adapter = new ListAdapter();
        this.title = title;
    }



    getFetchAndMakeLists() {
        console.log("inside getfetchWndmakelists - list component")
        this.adapter.getLists()
            .then(lists => {
                lists.forEach(list => {
                this.renderList(list)
        })
    })
    }

    // RENDER List Container 
    renderList(list) {
        let li = document.createElement('li')
        li.innerText = list.title
        li.setAttribute('class', 'list-group-item')
    
        let ul = document.createElement('ul')
        ul.setAttribute('class', 'list-group')
        ul.setAttribute('class', 'list-group-flush')

        let divListCollection = document.getElementById('list-collection')
       
        ul.append(li ) // change to TitleLi / chnge formatting so li is diff than title via bootstrap
        divListCollection.append(ul)
        
        // Append "add Item"  button with listener on button of List / divListCollection.
    }




    // create Item 
            // description 
            // X  button to delete 

    // Render Items
            // createNewItem() {

            //}
  
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