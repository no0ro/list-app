console.log('index.js - FIRST LINE')

document.addEventListener('DOMContentLoaded', () =>  {
    //  TEST
    // let newMovieList = new List("Movies") // creates movie normally!
    // console.log(newMovieList) 
    // let newMovie= new Item("Harry Potter") // ERROR: Uncaught Reference Error Item is not defined
    // let newMovie2= new Item("Superman")

    // console.log(newMovie) 
    
    // newMovieList.items.push(newMovie)
    // newMovieList.items.push(newMovie2)
    // console.log(newMovieList)
    // --- TEST END -----


    const container = document.querySelector('#app-container')
    new App(container)

    // TO DO - How do i start the app w/o next lines?
  let list = new List()
  list.fetchAndLoadLists()

    console.log("back in index.js")
})

// handleFormSubmit(e)

// i dont want the class itself to be listening for the event. 
// the submit form isnt class specific. its to be used by the app as a whole 
// the form itself inst in list.js, its in index.html...



// Form Submit Button Listener.
// let formSubmitButton = document.getElementById("form-submit")
// formSubmitButton.addEventListener('click', function (e) {
//     // `this` = submit ... aka e.target
//     // inside event listener callback, `this` will be the element that fired the event
//     e.preventDefault()
//     console.log(e.target)

//     tempList = new List()
//     tempList.postList()
// })
