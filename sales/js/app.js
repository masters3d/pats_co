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
    if (this[eaIndex].name === store.name &&
    this[eaIndex].minCustomer === store.minCustomer &&
    this[eaIndex].maxCustomer === store.maxCustomer &&
    this[eaIndex].avgCookieSale === store.avgCookieSale) {
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

function renderTableHeader(parent, singleArray, caption){
  parent.appendChild(creatingElementNameWithContent('caption', caption));

  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  thead.appendChild(tr);
  for (var each in singleArray) {
    tr.appendChild(creatingElementNameWithContent('th', singleArray[each]));
  }
  parent.appendChild(thead);
}

function providingHeaders(first, last){
  var headers = hours.slice();
  headers.push(first);
  headers.unshift(last);
  return headers;
}

function providingSumRow() {
  var totals = [];
  var mainTotal = 0;
  for (var eachF in stores ) {
    mainTotal += (stores[eachF]).totalCookiesSold ? (stores[eachF]).totalCookiesSold : 0;
    var statsForStore = (stores[eachF]).locationsStats;
    for (var each in statsForStore) {
      totals[each] = totals[each] ? totals[each] : 0;
      totals[each] += statsForStore[each];
    }
  }
  console.log('This is the total: ' + mainTotal);

  totals.unshift('Total Sum');;
  totals.push(mainTotal);
  console.log('This is the total: ' + mainTotal);
  return totals;
}

function renderTableFooter(parent, arrayToRender){
  var tfoot = document.createElement('tfoot');
  var tr = document.createElement('tr');
  tfoot.appendChild(tr);

  for (var eachTotal in arrayToRender) {
    tr.appendChild(creatingElementNameWithContent('td', arrayToRender[eachTotal]));
  }
  parent.appendChild(tfoot);
}

function processLocationStats(){
  for (var i = 0; i < stores.length; i += 1){
    var locationsStats = [];
    var store = stores[i];
    var totalCookiesSold = 0;
    for (var j = 0; j < hours.length; j += 1){
      var flooredNumber = Math.floor(store.avgCookieSale * store.customersPerHour());
      locationsStats.push(flooredNumber);
      totalCookiesSold += flooredNumber;
    }
    console.log(locationsStats);
    store.locationsStats = locationsStats;
    store.totalCookiesSold = totalCookiesSold;
  }
}

function processTossersNeed(){
  for (var i = 0; i < stores.length; i += 1){
    var tossersNeed = [];
    var store = stores[i];
    var totalTossersNeeded = 0;
    for (var j = 0; j < store.locationsStats.length; j += 1){
      var flooredNumber = Math.ceil(store.locationsStats[j] / 20);
      flooredNumber = flooredNumber >= 2 ? flooredNumber : 2 ;
      tossersNeed.push(flooredNumber);
      totalTossersNeeded += flooredNumber;
    }
    store.tossersNeed = tossersNeed;
    store.totalTossersNeeded = totalTossersNeeded;
  }
}

function creatingElementNameWithContent(node, content){
  var nodeElement = document.createElement(node);
  nodeElement.textContent = content;
  return nodeElement;
}

function renderRow(parent, rowItems){
  for(var statKey in rowItems){
    parent.appendChild(creatingElementNameWithContent(
        'td', rowItems[statKey]
      ));
  }
}

Store.prototype.renderStatsAsRow = function(){
  var stats = this.locationsStats.slice();
  stats.unshift(this.name);
  stats.push(this.totalCookiesSold);
  return stats;
};

Store.prototype.renderTossersAsRow = function(){
  var stats = this.tossersNeed.slice();
  stats.unshift(this.name);
  stats.push(this.totalTossersNeeded);
  return stats;
};


function renderTableBody(parent, bodyElements, subArrayName){
  var tbody = document.createElement('tbody');
  parent.appendChild(tbody);
  for (var each = 0; each < bodyElements.length; each += 1){
    var eachStore = bodyElements[each];
    var row = document.createElement('tr');
    tbody.appendChild(row);
    renderRow(row, eachStore[subArrayName]());
  }
}

function renderTables(){
  // Cookies table
  processLocationStats();
  var parentMyElement = document.getElementById('mylistsOfStats');
  var table = document.createElement('table');
  parentMyElement.appendChild(table);

  renderTableHeader(table,
    providingHeaders('Daily Location Total','Store Name'), 'Cookie Sales');
  renderTableBody(table, stores, 'renderStatsAsRow');
  renderTableFooter(table, providingSumRow());

  // Tossers Table
  processTossersNeed();
  var table2 = document.createElement('table');
  parentMyElement.appendChild(table2);
  renderTableHeader(table2,
    providingHeaders('Total Tosser Hours','Store Name'), 'Tossers Per Hour');
  renderTableBody(table2, stores, 'renderTossersAsRow');
}

function unloadElementWithId(elementId){
  var tableToUnload = document.getElementById(elementId);
  tableToUnload.textContent = '';
}

renderTables();
function newStoreHandler (event) {
  event.preventDefault();
  var val1 = event.target.name.value;
  var val2 = parseFloat(event.target.minCustomer.value);
  var val3 = parseFloat(event.target.maxCustomer.value);
  var val4 = parseFloat(event.target.avgCookieSale.value);
  var storeToAdd = new Store(val1, val2, val3, val4);

  if (stores.containsStore(storeToAdd)){
    // Present Error
    alert('This store has already been included');
    return;
  }
  stores.push(storeToAdd);
  unloadElementWithId('mylistsOfStats');
  renderTables();
}

var newStore = document.getElementById('newStoreForm');
newStore.addEventListener('submit', newStoreHandler);
