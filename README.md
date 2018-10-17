# restaurant-search-service

## 1. description
- A restaurant search service to make finding a place for gatherings much more simpler.
- Using RoR as the server-side language to serve the pages.
- A client-side rendered React application.


## 2. setup
Be sure to first install Bundler and Yarn.
### install dependencies
- `bundle install` 
    - Install the dependencies specified in the Gemfile.
- `yarn install`
    - Install the dependencies specified in the package.json


## 3. start the server
- `rails s`
- it's running on http://0.0.0.0:3000


## 4. pages, routes, and features
- check app/javascript/pages/App.jsx for more client-side routing information
### 4.1. Home Page
- the path of Homepage is `/`
- it prove restaurant information cards to help users to quickly see what restaurants are open.
- it will show "Closed" on the card if the restaurant is unavailable at the time
    - ![](https://i.imgur.com/y0etdlD.png)
- it have a datetime search input and a submit button to fire the search
    - ![](https://i.imgur.com/yj8d8BC.png)
    - <a href="https://cl.ly/22d5a93a26e5" target="_blank"><img src="https://duaw26jehqd4r.cloudfront.net/items/1i3Y122b2N3o1V3U0J0J/Screen%20Recording%202018-10-18%20at%2001.29%20AM.gif" style="display: block;height: auto;width: 100%;"/></a>

### 4.2. Search Result Pag
- the path of Homepage is `/search? time=$HHmm & weekday=$weekdayNumber & datetimeMs = $ms`
- it have a list of restaurants which meets the search criteria, each of the item contains necessary and enough information for users to decide if they want to explore more

### 4.3. Restaurant Detail Page
- the path of Homepage is `/restaurant/:restaurantId`
- it contains all the necessary information for the specific restaurant
