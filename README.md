# PDXperience
A data API for experiences in PDX: written in ES6 JavaScript, using Node, Express, and MongoDB.

## App Usage
This app enables users to find attractions in Portland that they would like to experience.
The app maintains information about parks, museums, gardens, and natural areas.

All visitors to the app are able to see lists of all attractions, narrow down the list by type,
or be shown a list of attractions within a half mile(800 meters) of where they are.

If a visitor to the app signs up as a user, they are then able to add attractions to an itinerary.
Once an attraction is in a user's itinerary, a review and star rating for the attraction can be
added by the user. Also, users can remove attractions from their itinerary list as they visit them.

## Data API RESTful Requests

### The following GET requests can be made without a token:

**https://&lt;i&gt;&lt;/i&gt;PDXperience.herokuapp.com/api**

Returns an array of all the attractions maintained in our database. For each attraction you are given
property(name), type, address, zip, hours, and \_id.
  
**https://&lt;i&gt;&lt;/i&gt;PDXperience.herokuapp.com/api/type/:type**

Returns an array of all the attractions of that type. The type specified in the URL of the RESTful request
is the type value of the desired attractions. Types maintained are parks, museums, gardens,
and natural areas. For each attraction, you are given property(name), address, zip, hours, subArea,
stars, avgStars, and \_id.
  
**ht&#8203;tps://PDXperience.herokuapp.com/api/id/:id**

Returns an object for the specific attraction requested. The id specified in the URL of the
RESTful request is the \_id value of the attraction. For the attraction returned, you are given
property(name), type, address, zip, subArea, hours, amenities, childFriendly, avgStars, stars, reviews,
and \_id.

**ht&#8203;tps://PDXperience.herokuapp.com/api/zip/:zip**

Returns an array of all attractions with the requested zip code. The zip specified in the URL of the
RESTful request is the zip code for which you are searching. For each attraction, you are given
property(name), type, address, zip, hours, and \_id.
 
**https://PDXperience.herokuapp.com/api/area/:area**

Returns an array of all attractions within the requested area. The area specified in the URL of the
RESTful request is the subArea of the attractions desired. For each attraction, you are given property(name),
type, address, zip, hours, and \_id.
  
**https://PDXperience.herokuapp.com/api/location/:lat/:long**

Returns an array of all attractions within a half mile(800 meters) of the specified location. The lat
and long specified in the URL of the RESTful request correspond to the latitude and longitude of the
center point of the 800 meter search radius. For each attraction, returned you are given property(name),
type, address, zip, hours, and \_id.

### User Account Management

In order to maintain personal itinerary lists and submit reviews of attractions, you need to create an
account.

#### Signing Up

**https://PDXperience.herokuapp.com/api/auth/signup**

To sign up, send a POST request to the URL above with JSON containing your email, firstName, and password.
All three of these fields are required. You will receive a token in the response.

#### Signing In

**https://PDXperience.herokuapp.com/api/auth/signin**

If your token has been lost or invalidated, you will need to sign in again to receive a new token. To sign in,
send a POST request to the URL above with JSON containing your email and password. A new token will be sent
in the response.

### RESTful Requests Requiring a User Account

The following RESTful requests require a valid token to be sent in the headers. It should be formatted as
Authorization: \<token\>.

#### Adding an Iten to Your Itinerary






  


  


