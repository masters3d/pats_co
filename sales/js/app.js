'use strict';

var store0 = {'name':'1st and Pike','minCustomer':23,'maxCustomer':65,'avgCookieSale':6.3,'customersPerHour':customersPerHourRandom};
var store1 = {'name':'SeaTac Airport','minCustomer':3,'maxCustomer':24,'avgCookieSale':1.2,'customersPerHour':customersPerHourRandom};
var store2 = {'name':'Seattle Center','minCustomer':11,'maxCustomer':38,'avgCookieSale':3.7,'customersPerHour':customersPerHourRandom};
var store3 = {'name':'Capitol Hill','minCustomer':20,'maxCustomer':38,'avgCookieSale':2.3,'customersPerHour':customersPerHourRandom};
var store4 = {'name':'Alki','minCustomer':2,'maxCustomer':16,'avgCookieSale':4.6,'customersPerHour':customersPerHourRandom};

function customersPerHourRandom(min, max) {
  return Math.random() * (max - min) + min;
}

var stores = [store0,store1,store2,store3,store4];
var hours = [ '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

for (var i = 0; i < stores.length; i += 1){
  var locationsStats = [];
  var store = stores[i];
  var totalCookiesSold = 0;
  for (var j = 0; j < hours.length; j += 1){
    var flooredNumber = Math.floor(store.avgCookieSale * store.customersPerHour(store.minCustomer, store.maxCustomer));
    // | Int Value of average sold | String description
    locationsStats.push( [flooredNumber, hours[j] + ': ' + flooredNumber + ' cookies']);
    totalCookiesSold += flooredNumber;
  }
  console.log(locationsStats);
  store.locationsStats = locationsStats;
  store.totalCookiesSold = totalCookiesSold;
}

// This expects an erray of elements with two object.
// |Int|String description|
function dualArrayToList(array) {
  for (var each = 0; each < array.length; each += 1){
  }

}
