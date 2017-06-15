'use strict';

function TableRender() {};

TableRender.renderTableBody = renderTableBody;
TableRender.renderTableHeader = renderTableHeader;
TableRender.renderTableFooter = renderTableFooter;

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

function renderTableFooter(parent, arrayToRender){
  var tfoot = document.createElement('tfoot');
  var tr = document.createElement('tr');
  tfoot.appendChild(tr);

  for (var eachTotal in arrayToRender) {
    tr.appendChild(creatingElementNameWithContent('td', arrayToRender[eachTotal]));
  }
  parent.appendChild(tfoot);
}

// Helper Functions

function renderRow(parent, rowItems){
  for(var statKey in rowItems){
    parent.appendChild(creatingElementNameWithContent(
        'td', rowItems[statKey]
      ));
  }
}

function creatingElementNameWithContent(node, content){
  var nodeElement = document.createElement(node);
  nodeElement.textContent = content;
  return nodeElement;
}
