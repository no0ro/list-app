# README

# List App

## Description

List App is a Javascript/Rails web app that keeps track of all your lists in one spot. 
## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


## Installation
1. Clone this repo
2. Install dependencies:
   ```
   $ bundle install
   ```
3. Set up the database with 
    ```
    $ rake db:migrate
    ```
4. Seed the database: 
    ```
    rake db:seed
    ```

6. Run the rails server:
    ```
    $ rails s
    ```
7. open `index.html`
8. 
9.  Press `ctrl+C` to shut it down the rails server

## Usage
A user can create a new list and add multiple tasks at once by simply adding a comma. A user can delete a list once they are through with it. 


## Development 
In addition to the web interface, you can interact with the app via command line by using rails console. 

## Contributing 
Bug reports and pull requests are welcome at [https://github.com/no0ro/list-app](https://github.com/no0ro/list-app). This project as well as all other content on my GitHub are intended to be safe, welcoming, and open for collaboration. Users are expected to adhere to the [Contributor Covenant code of conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct) code of conduct. 

## License
Licensed under the [MIT License](https://opensource.org/licenses/MIT).
