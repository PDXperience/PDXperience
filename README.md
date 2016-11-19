# PDXperience
A data API for experiences in PDX: written in ES6 JavaScript, using Node, Express, and MongoDB.

## App Usage
This app enables users to find attractions in Portland that they would like to experience.
The app maintains information about parks, museums, gardens, and natural areas.

All visitors to the app are able to see lists of all attractions, narrow down the list by type,
or be shown a list of attractions within a half mile of where they are.

If a visitor to the app signs up as a user, they are then able to add attractions to an itinerary.
Once an attraction is in a user's itinerary, a review and star rating for the attraction can be
added by the user. Also, users can remove attractions from their itinerary list as they visit them.

## Data API RESTful Requests

The following GET requests can be made without a token:

PDXperience.herokuapp.com/api
  Returns a list of all attractions. For each attraction you are given property(name), type,
  address, zip, hours, and \_id.
  
PDXperience.herokuapp.com/api/type/:type
  Returns a list all the attractions of that type. The type specified in the URL of the RESTful request
  is the type value of the desired attractions. Types maintained are parks, museums, gardens,
  and natural areas. For each attraction you are given property(name), address, zip, hours, subArea,
  stars, avgStars, and \_id.
  
PDXperience.herokuapp.com/api/id/:id
  Returns the information for the specific attraction requested. The id specified in the URL of the
  RESTful request is the \_id value of the attraction. For the attraction returned you are given
  property(name), type, address, zip, subArea, hours, amenities, childFriendly, avgStars, stars, reviews,
  and \_id.
  
PDXperience.herokuapp.com/api/area/:area
  Returns a list of all attractions within the requested area. The area specified in the URL of the
  RESTful request is the subArea of the attractions desired. For each attraction you are given property,
  type, address, zip, hours, and \_id.
  
PDXperience.herokuapp.com/api/location/:lat/:long

  


  


