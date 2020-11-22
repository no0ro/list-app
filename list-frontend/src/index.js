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

    // TO DO - How do i start the app w/o next lines?
  let list = new List()
  list.fetchAndLoadLists()

    console.log("back in index.js")
}) 
