'use strict';

function creatingObject(name, minCustomer, maxCustomer, avgCookieSale ) {
  var toReturn = {
    name: name,
    minCustomer: minCustomer,
    maxCustomer: maxCustomer,
    avgCookieSale: avgCookieSale,
  };
  return toReturn;
}

var locationsInfo = [
['1st and Pike' , 23 , 65 ,6.3],
['SeaTac Airport', 3 ,24 , 1.2],
['Seattle Center', 11, 38 , 3.7],
['Capitol Hill', 20,38 , 2.3],
['Alki', 2 ,16 , 4.6],
];

var locations = [];

for (var i = 0; i < locationsInfo.length; i += 1) {
  var toAdd = creatingObject(
      locationsInfo[i][0],
      locationsInfo[i][1],
      locationsInfo[i][2],
      locationsInfo[i][3]
    );
  console.log(toAdd);
  locations.push(toAdd);
}
console.log(locations);
