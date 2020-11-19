console.log('FIRST LINE - index.js')


document.addEventListener('DOMContentLoaded', () =>  {
    const app = new App()
    // console.log(app)
    const list = new List()
    console.log(list.getFetchAndMakeLists())
    console.log('back in listener')
}) 





// function getAllLists() {
//     return fetch('http://localhost:3000/lists')
//         .then( response => response.json())
//         // .then( jsonObj => {
//         //     return console.log(jsonObj) // returns array of objects
//         // })  
// }

// getAllLists().then(lists => {
//     lists.forEach(list => {
//     this.renderList(list)
//     })
// })

//   render the card skeleton - div card / ul
  function renderList(list) {
    let li = document.createElement('li')
    li.innerText = list.title
    li.setAttribute('class', 'list-group-item')

    let ul = document.createElement('ul')
    ul.setAttribute('class', 'list-group')
    ul.setAttribute('class', 'list-group-flush')

    let divListCollection = document.getElementById('all-lists')
   
    ul.append(li ) // change to TitleLi / chnge formatting so li is diff than title via bootstrap
    divListCollection.append(ul)
  }


