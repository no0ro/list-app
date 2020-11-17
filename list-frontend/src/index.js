console.log('FIRST LINE Hit index.js')


document.addEventListener('DOMContentLoaded', function () {
    const app = new App()
    // console.log(app)
}) 


function getLists() {
    return fetch('http://localhost:3000/lists')
        .then( response => response.json())
        // .then( jsonObj => {
        //     return console.log(jsonObj)
        // })  
}

getLists().then(lists => {
    lists.forEach(list => {
    this.renderList(list)
    })
})

//   render the card skeleton - div card / ul
  function renderList(list) {
    let li = document.createElement('li')
    li.innerText = list.title
    li.setAttribute('class', 'list-group-item')

    let ul = document.createElement('ul')
    ul.setAttribute('class', 'list-group')
    ul.setAttribute('class', 'list-group-flush')

    let divListCollection = document.getElementById('list-collection')
   
    ul.append(li ) // change to TitleLi / chnge formatting so li is diff than title via bootstrap
    divListCollection.append(ul)
  }


// // insert Item here

// // delete button (for each item )
//     // let btn = document.createElement('button')
//     // btn.setAttribute('class', 'delete-btn')
//     // btn.setAttribute('id', item.id)
//     // btn.innerText = "Delete"
//     // btn.addEventListener('click', (e) => {
//     //   console.log(e.target.dataset);
//     //   delete_meth(e)
//     // })

//   }



// test that we can get data from the backend
    // const BACKEND_URL = 'localhost:3000';
    // fetch(`${BACKEND_URL}/test`)
    //   .then(response => response.json())
    //   .then(parsedResponse => console.log(parsedResponse));

 