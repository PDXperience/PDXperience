const parkData = require('./park-data');
const fs = require('fs');

for (let i = 0; i < parkData.length; i++){
  let temp = parkData[i].Geometry.coordinates[0];
  parkData[i].Geometry.coordinates[0] = parkData[i].Geometry.coordinates[1];
  parkData[i].Geometry.coordinates[1] = temp;
}

fs.writeFileSync('park-data2.json', JSON.stringify(parkData));