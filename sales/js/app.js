'use strict';


var locationsInfo = [
['1st and Pike' , 23 , 65 ,6.3],
['SeaTac Airport', 3 ,24 , 1.2],
['Seattle Center', 11, 38 , 3.7],
['Capitol Hill', 20,38 , 2.3],
['Alki', 2 ,16 , 4.6],
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
function renderTableHeader(parent){
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  thead.appendChild(tr);
  tr.appendChild(creatingElementNameWithContent('th', 'Store Name'));
  for (var each in hours) {
    tr.appendChild(creatingElementNameWithContent('th', hours[each]));
  }
  tr.appendChild(creatingElementNameWithContent('th', 'Daily Location Total'));

  parent.appendChild(thead);
}

function renderTableFooter(parent){
  var tfoot = document.createElement('tfoot');
  var tr = document.createElement('tr');
  tfoot.appendChild(tr);
  tr.appendChild(creatingElementNameWithContent('td', 'Total Sum'));

  var totals = [];
  var mainTotal = 0;
  for (var eachF in stores ) {
    mainTotal += (stores[eachF]).totalCookiesSold;
    var statsForStore = (stores[eachF]).locationsStats;
    for (var each in statsForStore) {
      totals[each] = totals[each] ? totals[each] : 0;
      totals[each] += statsForStore[each];
    }
  }
  for (var eachTotal in totals) {
    tr.appendChild(creatingElementNameWithContent('td', totals[eachTotal]));
  }

  tr.appendChild(creatingElementNameWithContent('td', mainTotal));

  parent.appendChild(tfoot);
}



for (var i = 0; i < stores.length; i += 1){
  var locationsStats = [];
  var store = stores[i];
  var totalCookiesSold = 0;
  for (var j = 0; j < hours.length; j += 1){
    var flooredNumber = Math.floor(store.avgCookieSale * store.customersPerHour());
    // | Int Value of average sold | String description
    locationsStats.push(flooredNumber);
    totalCookiesSold += flooredNumber;
  }
  console.log(locationsStats);
  store.locationsStats = locationsStats;
  store.totalCookiesSold = totalCookiesSold;
}

function creatingElementNameWithContent(node, content){
  var li = document.createElement(node);
  li.textContent = content;
  return li;
}

Store.prototype.renderStats = function(parentElement){
  // appends Name
  parentElement.appendChild(creatingElementNameWithContent('td', this.name));
  // appends All Hours
  for(var statKey in this.locationsStats){
    parentElement.appendChild(creatingElementNameWithContent(
        'td', this.locationsStats[statKey]
      ));
  }
  // appends the total sold per store
  parentElement.appendChild(creatingElementNameWithContent('td', this.totalCookiesSold));
};

var parentMyElement = document.getElementById('mylistsOfStats');
var table = document.createElement('table');
renderTableHeader(table);
parentMyElement.appendChild(table);

for (var each = 0; each < stores.length; each += 1){
  var eachStore = stores[each];
  var row = document.createElement('tr');
  table.appendChild(row);
  eachStore.renderStats(row);
}
renderTableFooter(table);
