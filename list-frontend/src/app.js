class App{
// constructor: provide any custom initialization that must be done before any 
// other methods can be called on an instantiated object

    constructor(container){
        this.container = container
        this.list = new List()
        this.item = new Item()
        this.formSubmit = document.getElementById("form-submit") // dont want to bind for EVERY instance. just need to add listener for page document as a whole
            // ^ before anything else, grab this el 
        this.bindFormSubmit()
    }   

    bindFormSubmit() {
        this.formSubmit.addEventListener("click", function(e) {
            e.preventDefault()
            console.log(e.target)
            this.list.postList()
        }.bind(this))
    }
}