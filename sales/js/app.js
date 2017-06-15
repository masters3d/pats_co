'use strict';

var locationsInfo = [
['1st and Pike' , 23 , 65 ,6.3],
// ['SeaTac Airport', 3 ,24 , 1.2],
// ['Seattle Center', 11, 38 , 3.7],
// ['Capitol Hill', 20,38 , 2.3],
// ['Alki', 2 ,16 , 4.6],
];

function Store (name, minCustomer, maxCustomer, avgCookieSale) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookieSale = avgCookieSale;
}

Store.prototype.customersPerHour = function() {
  return Math.random() * (this.maxCustomer - this.minCustomer) + this.minCustomer;
};

var stores = [];

stores.containsStore = function(store) {
  for (var eaIndex in this ) {
    if (this[eaIndex].name === store.name) {
      return true;
    }
  }
  return false;
  console.log(this);
};

var hours = [ '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

for(var ea in locationsInfo){
  stores.push(
    new Store(
            locationsInfo[ea][0],
            locationsInfo[ea][1],
            locationsInfo[ea][2],
            locationsInfo[ea][3]
            )
  );
}

// functionProcess(store, index)
function processRandomArrayMember( nameOfArrayMember,functionProcess) {
  for (var i = 0; i < stores.length; i += 1){
    var locationsStats = [];
    var store = stores[i];
    var runingSubTotal = 0;
    for (var j = 0; j < hours.length; j += 1){
      var flooredNumber = functionProcess(store, j);
      locationsStats.push(flooredNumber);
      runingSubTotal += flooredNumber;
    }
    console.log(locationsStats);
    store[nameOfArrayMember] = locationsStats;
    store[nameOfArrayMember + 'Total'] = runingSubTotal;
  }
}

function processCookiesSales(){
  processRandomArrayMember('cookiesSold',
    function(store){ // we are ommiting index here
      return Math.floor(store.avgCookieSale * store.customersPerHour());
    });
}

function processTossersNeed(){
  processRandomArrayMember('tossersNeed',
    function(store, index){
      var people = Math.ceil(store.cookiesSold[index] / 20);
      people = people >= 2 ? people : 2;
      return people;
    });
}

// add a head and tail to an array. concat(head, array, tail)
function concatingAsNewArray(head, array, tail) {
  var newArray = array.slice();
  newArray.push(tail);
  newArray.unshift(head);
  return newArray;
}

function providingCompleteRows ( nameColPropetyName, arrayProperyName, lastColProperyName) {
  var rowsToReturn = [];
  for (var eachItem in stores){
    rowsToReturn.push(concatingAsNewArray(eachItem[nameColPropetyName],eachItem[arrayProperyName], eachItem[lastColProperyName]));
  }
}

Store.renderCookiesSalesAsRows = function(){
  return providingCompleteRows('name', 'cookiesSold', 'cookiesSoldTotal');
};

Store.renderTossersNeedAsRows = function(){
  return providingCompleteRows('name', 'tossersNeed', 'tossersNeedTotal');
};

function providingHeaders(first, last){
  return concatingAsNewArray(first, hours, last);
}

function providingSumRow(nameOfArrayOnStore, nameOfSubTotalOnStore, titleOfTotalSumIn) {
  var titleOfTotalSum = titleOfTotalSumIn ? titleOfTotalSumIn : 'Total Sum';
  var totals = [];
  var mainTotal = 0;
  for (var eachF in stores ) {
    mainTotal += (stores[eachF])[nameOfSubTotalOnStore] ? (stores[eachF])[nameOfSubTotalOnStore] : 0;
    var statsForStore = (stores[eachF])[nameOfArrayOnStore];
    for (var each in statsForStore) {
      totals[each] = totals[each] ? totals[each] : 0;
      totals[each] += statsForStore[each];
    }
  }
  return concatingAsNewArray(titleOfTotalSum, totals, mainTotal);
}

function renderTables(){

  // Cookies table
  processCookiesSales();
  var parentMyElement = document.getElementById('mylistsOfStats');
  var table = document.createElement('table');
  parentMyElement.appendChild(table);

  TableRender.renderTableHeader(table,
    providingHeaders('Store Name', 'Daily Location Total'), 'Cookie Sales'
  );
  TableRender.renderTableBody(table, Store.renderCookiesSalesAsRows);
  TableRender.renderTableFooter(table, providingSumRow('cookiesSold', 'cookiesSoldTotal'));

  // Tossers Table
  processTossersNeed();
  var table2 = document.createElement('table');
  parentMyElement.appendChild(table2);
  TableRender.renderTableHeader(table2,
    providingHeaders('Store Name', 'Total Tosser Hours'), 'Tossers Per Hour'
  );
  TableRender.renderTableBody(table2, Store.renderTossersNeedAsRows());
  TableRender.renderTableFooter(table2, providingSumRow('tossersNeed', 'tossersNeedTotal', 'Sub Total People needed'));
}

function unloadElementWithId(elementId){
  var tableToUnload = document.getElementById(elementId);
  tableToUnload.textContent = '';
}

renderTables();
function newStoreHandler(event) {
  event.preventDefault();
  var val1 = event.target.name.value;
  var val2 = parseFloat(event.target.minCustomer.value);
  var val3 = parseFloat(event.target.maxCustomer.value);
  var val4 = parseFloat(event.target.avgCookieSale.value);
  var storeToAdd = new Store(val1, val2, val3, val4);

  if (stores.containsStore(storeToAdd)){
    alert('This store has already been included');
    return;
  }

  if (val3 < val2) {
    alert('Max customers needs to be bigger than Min Customer');
    return;
  }

  if (val2 === 0 && val3 === 0 || val4 === 0) {
    alert('A store must have a purpose. 0 cookies or 0 customers = No Store');
    return;
  }
  stores.push(storeToAdd);
  unloadElementWithId('mylistsOfStats');
  renderTables();
}

var addNewStore = document.getElementById('newStoreForm');
addNewStore.addEventListener('submit', newStoreHandler);
