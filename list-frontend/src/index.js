// test that we can get data from the backend
// const BACKEND_URL = 'localhost:3000';
// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

const BACKEND_URL = 'localhost:3000';


function getLists() {
    return fetch('http://localhost:3000/lists')
      .then(res => res.json())
  } 

  // render the card skeleton - div card / ul
  function renderList(list) {
    let li = document.createElement('li')
    li.innerText = list.title
    li.setAttribute('class', 'list-group-item')

    let ul = document.createElement('ul')
    ul.setAttribute('class', 'list-group')
    ul.setAttribute('class', 'list-group-flush')


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
    let divListCollection = document.getElementById('list-collection')
   
    ul.append(li ) // change to TitleLi / chnge formatting so li is diff than title via bootstrap
    divListCollection.append(ul)
  }
  

getLists().then(lists => {
    lists.forEach(list => {
        renderList(list)
    })
})
