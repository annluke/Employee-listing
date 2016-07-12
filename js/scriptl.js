var col = [], i, j, options, employee, response, totLength, salaryValue, salaryTotal = 0;
options = {style: "currency", currency: "INR", minimumFractionDigits: 0};

function getEmployeeData() {
  ajaxJsonReq( 'js/data.json' );
}

function ajaxJsonReq( url )
{
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.open( "GET", url, true );
  ajaxReq.setRequestHeader("Content-type", "application/json");
 
  ajaxReq.onreadystatechange = function()
  {
    if( ajaxReq.readyState == 4 && ajaxReq.status == 200 )
      {
        employee = JSON.parse( ajaxReq.responseText );            
        generateTable(employee);
      }
  }
  ajaxReq.send();
}

function setCol (employee, totLength) {
  var key;
  for (i = 0; i < totLength; i++) {
    for (key in employee[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  return col;
}

function generateTable (employee) {
  var table, tr, th, tabCell, dvTable, row;
 	totLength = employee.length;
  col = setCol(employee, totLength);
  table = document.getElementById("display-table");

  //Add header rows
  tr = table.insertRow(-1);     
  tr.setAttribute("id","headrow");              
  for (i = 0; i < col.length; i++) {
    th = document.createElement("th");      
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  
  //Add the data rows.
  for (i = 0; i < totLength; i++) {
    tr = table.insertRow(-1);
    tr.setAttribute("id","row" + i);
    for (j = 0; j < col.length; j++) {
      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = employee[i][col[j]];
    }
  }

  //Calculate total salary
  for (i = 0; i < totLength - 1; i++) {
    salaryValue = employee[i][col[1]].replace(/\,/g,'');  //remove comma from salary string
    salaryTotal += Number(salaryValue);
  }
  row = document.getElementById("row" + i);
  row.cells[1].innerHTML = salaryTotal.toLocaleString('hi-IN',options);
  
  row = document.getElementById("headrow");
  alignSalaryCol(row);
  for (var i = 0; i < employee.length; i++) {
    row = document.getElementById("row" + i);
    alignSalaryCol(row);
  }
}

function filter () {
  var searchString, checkString, row, cell, rowCount = 0;  

  searchString = new RegExp(document.getElementById("search-id").value,"i");
  salaryTotal = 0;
  for (i = 0; i < totLength-1; i++) {
    row = document.getElementById("row" + i);
    checkString = employee[i][col[0]];
    if (!searchString.test(checkString)) {
      row.style.display = 'none';
    }
    else {
      row.style.display = 'table-row'; 
      alignSalaryCol(row);
      rowCount ++; 
      salaryValue = employee[i][col[1]].replace(/\,/g,'');  //remove comma from salary string
      salaryTotal += Number(salaryValue);
    }
  }
  row = document.getElementById("row" + i);
  if (rowCount == 0) {
    row.cells[0].innerHTML = "No records found";
    row.cells[1].innerHTML = "0";
  }
  else {
    row.cells[0].innerHTML = "Total";
    row.cells[1].innerHTML = salaryTotal.toLocaleString('hi-IN',options); //convert to hindi-india language code
  }
  row.style.display = 'table-row';
  alignSalaryCol(row);
}

function alignSalaryCol (rows) {
  rows.cells[1].style.textAlign = 'right';
}