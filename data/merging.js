
const fs = require('fs');
var parks = require('./parks');
var linking = require('./linking');
var amenities = require('./amenities');
var latlong = require('./latlong');

for (let i = 0; i < parks.length; i++) {
  // 1:1 park to lat long
  parks[i].Lat += latlong[i].lat;
  parks[i].Long += latlong[i].long;
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

fs.writeFileSync('park-data.json', JSON.stringify(parks));