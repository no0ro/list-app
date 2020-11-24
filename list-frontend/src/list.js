class List {
    constructor(title, id) {
        this.title = title
        this.id = id
        this.items = [] 
        this.lists = []
        // this.addItemBtn = document.getElementById("#add-item-button")
        
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
    // postList() {
    //     console.log("inside postList()")
    //     let formatInputData = {
    //         title: document.getElementById('title-input').value,
    //         name: document.getElementById('name-input').value
    //     }


    //     const form = event.target.parentElement
    //     const items = form[1].value.split(', ') // turns into Arr of strings ["hello", "there"]
    //     const list = form[0].value
        
    //     console.log(items)
    //     console.log(list)
    //     let configObj = {
    //         method: "POST",
    //         headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //         },
    //         body: JSON.stringify(formatInputData) 
    //     }

    //     console.log("before fetch")
    //     fetch('http://localhost:3000/lists', configObj) 
    //         .then( response => response.json())
    //         .then(json => (json.data))
    //         .then( data => {
    //             console.log(typeof data) //object
    //             console.log(data) // data fetch sends back is CORRECT!!
    //             let newList = this.createOneListAndItemObject(data)

    //             let whereToAppend = document.getElementById("lists-index")
    //             let div = document.createElement('div')

    //             let htmlList = this.createListCardHtml(newList) 
    //             div.innerHTML = htmlList
    //             whereToAppend.appendChild(div)
    //             document.getElementById("list-form").reset()

    //             console.log(newList)
    //             console.log("inside .then(data => { ")
    //         })
    //         .catch(console.error)
    // } // end postList() 





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
                <div class="card" style="width: 25rem; border-color: black;"">
                    <div class="card-body">
                        <h5 class="card-title">${list.title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">`
                        + checkItemsLength() + 
                    `
                    </ul>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <input class="form-control form-control-sm" type="text" placeholder="add an item..."><br>
                                <input type="submit" name="submit"  value="Add an Item" id="add-item-submit"  class="add-item-button btn btn-info" />
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

        let listLength = listObj.attributes.items.length

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


    // this.OnEvent = OnEvent.bind(this);

    // bindEventListeners() {
    //     this.formSubmit.addEventListener("click", function() {
    //         event.preventDefault()
    //         this.postList()
    //     }.bind(this))
    //     // if i had a general "Lists class" this would be better bc then I wouldnt have alll my attributes/List obj, etc involved 
    // }


    // -----------------------------------------------

     // bindEventListeners() {
    //     let listsIndex = document.getElementById("lists-index") 
    //     console.log("inside bindEventListeners")
        
    //     listsIndex.addEventListener( "click", function(e)  {
    //         var element = event.target;
      
    //         if (element.tagName == 'INPUT' && element.classList.contains("add-item-button")){
    //             event.preventDefault();
    //             console.log("hi");
    //         }
    //         console.log(element)
    //         // this.addNewItem() 
    //         // const newLocal = this.addNewItem()
    //         console.log("hey")
         
    //     });
    // } // end bindEventKisteners()
    // -----------------------------------------------



// CLOSURE Idea For new items obj

// make this a closure with reference to outter listobj/List info 
// createNewItem(items){
//     let itemsArr = []
//     this.items.map(newItem => {
//         //index [0]
//         let newItem = new Item()
//         newItem.name = listObj.attributes.items[0].name
//         newItem.id = listObj.attributes.items[0].id 
//         newItem.list_id = listObj.attributes.items[0].list_id 
//         newItem.created_at = listObj.attributes.items[0].created_at
//         console.log(newItem)
//         itemsArr.push(newItem)
//     })
//     return items 
// }

// -----------------------------------------------------------------------


// -----------------------------------------------------------------------


// htmlButton() {
//     // onclick="this.addNewItem(); return false;"
//     let div = document.createElement("div")
//     div.innerHTML = "this is a testttt"
//     div.setAttribute("class", "form-grouuuuppp")
//     return div
//     // let x = document.getElementById("add-item-submit")
//     // x.appendChild(div)
// }

// -----------------------------------------------------------------------


// addClickListeners() {
//     // document.querySelectorAll(".add-item-button")
//     // document.querySelector("button").onclick = function(event) { … }.
//     document.querySelectorAll(".form-group").forEach(el => {
//         el.addEventListener("submit", function() {
//             e.preventDefault()    
//             alert('I was clicked')
//             console.log(e.target)
//             //this.addNewItem()
//     }).bind(this)

//     })
// } // end addClickListeners()


// -----------------------------------------------------------------------

// grab button by specific id when clicked so only one item returns. 
    // make it a button though 
    // when <ul> aka getElementById('lists-index") innerHtml != null , trigger the event listener on 
    // add event listener when its created!! bc whole card will re render once submitted
// on submit, grab input, 
// fetch call 
// trick will be to add just 1 new item to obj. 
        // newItem = Item....grab code from when make obj by hand 
        // this.list.push(newItem)
        // now list item has alllll its list items in its collections now! 
//
// pass list Obj to   createListCardHtml(list) 
        // follow similar steps to POST aftermath
        // re-render whole card -- pass into -->  and will be business as usual! createListCardHtml(list)

   
    // same as createListObjects - but for when sent from POST - aka will have only one obj. no need to iterate

//-----------------------------------------------------
// addNewItem(e) {
//     // console.log(e.target)
//     console.log("inside addNewItem")

//     let formatInputData = {
//         name: "Chocolate"
//     }
//     let configObj = {
//         method: "PATCH",
//         headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//         },
//         body: JSON.stringify(formatInputData) 
//     }

// } // end addNewItem()

// -------------------------------------------------------------

    // ------------------
    // $(document).on("click","a.someBtn",function(e){
    //     console.log("hi");
    // });

    // (function () {
    //     "use strict";
    //         document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
    //         if (e.target.tagName == 'A' && e.target.classList.contains("someBtn")) {
    //           alert('Clicked');
    //         }
    //       }, false);
    // })();


    // someListener(event){
    //     var element = event.target;
    //      if(element.tagName == 'INPUT' && element.classList.contains("add-item-button")){
    //     console.log("hi");
    //     }
    // }
    // ----------------------
        //  if ( $('#lists-index').children().length > 0 ) {
    // if ( $('div#lists-index')[0].hasChildNodes()) {
   // if ( $('div#lists-index').children('div.card').length > 1) {
       //--------------------------------------------------------------------------
           
        // const form = event.target.parentElement
        //      const item = form[1].value
        //      const list = form[0].value
            // let addItemBtn = document.getElementById(".add-item-button")
            //     addItemBtn.addEventListener("submit", function() {
            //          event.preventDefault()
            //         this.addNewItem()    
            // }).bind(this)
    //    }
