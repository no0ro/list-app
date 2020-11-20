console.log('index.js - FIRST LINE')

document.addEventListener('DOMContentLoaded', () =>  {
    getLists();
    
  

    const list = new List()
    // list.title = "HI" // an object of, that has ListAdapter{} obj in it. so skips the List{} step up above. 
    console.log(list)

 
    list.getFetchAndMakeLists()
    // console.log(list.getFetchAndMakeLists()) // if try to replace "list" with "app" says getFetchAndMakeLists() is not a fn 
        // NOTE: when getLists returns the Response Object from fetch, it gets saved in Promise Obj's `value:` property. this is what triggers Promise's onFulfilled:[ `aka .then(fn)`] to move to microqueue 
        // so now that have data back from fetch, js calls it on list... then iterate from "inside RenderList" to "hi"..5 times
        console.log('back in listener')
   
}) 








/*  
WORKS SAME, BUT HAD TO CHANGE A LITTLE
--> 1st way:  index.js way 
function getLists() {
    return fetch('http://localhost:3000/lists')
        .then( response => response.json())
        // .then( jsonObj => {
        //     return console.log(jsonObj) // returns array of objects
        // })  
}

getLists().then(lists => {
    lists.forEach(list => {
    this.renderList(list)
    })
})


--> 2nd Way: 

# ListAdapter.js 
    getLists() {
        return fetch(this.baseURL)
          .then( response => response.json()) // returns array of objects
          // .then( data => data) // returns array of objects
    }

# List.js - Component
    constructor(title) {
        this.adapter = new ListAdapter()
        // this.title = title
    }

    getFetchAndMakeLists() {
        let json = this.adapter.getLists() // returns arr of list obj's
          .then(arrOfListObjects => {  
              arrOfListObjects.forEach(listObject => {
              this.renderList(listObject) 
      })
    })

- @ .then(arrOfList...) is when i called getLists() in first way 
-  dont think i need the line .then( data => data) // returns array of objects
*/