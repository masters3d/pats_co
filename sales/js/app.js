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

var hours = [ '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

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
  parentElement.appendChild(creatingElementNameWithContent('li', this.name));
  // appends All Hours
  for(var statKey in this.locationsStats){
    parentElement.appendChild(creatingElementNameWithContent(
        'li', this.locationsStats[statKey]
      ));
  }
  // appends the total sold per store
  parentElement.appendChild(creatingElementNameWithContent('li', this.totalCookiesSold));
};


var parentMyElement = document.getElementById('mylistsOfStats');
console.log(document);
console.log(parentMyElement);

for (var each = 0; each < stores.length; each += 1){
  var eachStore = stores[each];
  var article = document.createElement('article');
  parentMyElement.appendChild(article);
  var title = document.createElement('h2');
  title.textContent = eachStore.name;
  article.appendChild(title);
  var ul = document.createElement('ul');
  article.appendChild(ul);
  eachStore.renderStats(ul);
  var liLast = document.createElement('li');
  liLast.textContent = 'Total: ' + eachStore.totalCookiesSold + ' cookies';
  ul.appendChild(liLast);

}
