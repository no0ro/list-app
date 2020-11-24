// console.log('index.js - FIRST LINE')
document.addEventListener('DOMContentLoaded', () =>  {
  const container = document.querySelector('#app-container')
  new App(container)

  let list = new List()
  list.fetchAndLoadLists()
    // console.log("back in index.js")
})
