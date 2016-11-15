
const fs = require('fs');
var parks = require('./park-data');
var linking = require('./linking');
var amenities = require('./amenities');
var latlong = require('./latlong');

for (let i = 0; i < parks.length; i++) {
  // 1:1 park to lat long
  parks[i].geo = [latlong[i].long, latlong[i].lat];
  // 1:many park to amenities

  for (let j = 0; j < linking.length; j++) {
    if (parks[i].PropertyID === linking[j].PropertyId) {
      parks[i].AmenityID.push(linking[j].AmenityTypeId);
    }
  }
}


for (let i = 0; i < amenities.length; i++) {
  for (let j = 0; j < parks.length; j++) {
    if ( parks[j].AmenityID.indexOf( amenities[i].AmenityTypeId ) > -1 ) {
      parks[j].Amenities.push( amenities[i].Amenity );
    }
  }
}

var newArray = [];

for (let i = 0; i < parks.length; i++) {
  var newData = new Object();
  newData.property = parks[i].property;
  newData.type = parks[i].type;
  newData.address = parks[i].address;
  newData.zip = parks[i].zip;
  newData.subArea = parks[i].subArea;
  newData.hours = parks[i].hours;
  newData.amenities = parks[i].Amenities;
  newData.geo = parks[i].geo;
  newData.childFriendly = true;
  newData.stars = [];
  newData.reviews = [];

  newArray.push(newData);
}

fs.writeFileSync('geo-park-data.json', JSON.stringify(newArray));