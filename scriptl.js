var employee = [
	{
	 "Name": "Jaykrishnan",
	 "Salary": "30,000"
	}, 
	{
	 "Name": "Ann Mary",
	 "Salary": "27,500"
	},
	{
	 "Name": "Arjun Narayan",
	 "Salary": "20,150"
	},
	{
	 "Name": "Meera Reghu",
	 "Salary": "30,000"
	}, 
	{
	 "Name": "Ann Jose",
	 "Salary": "27,500"
	},
	{
	 "Name": "Tony Thomas",
	 "Salary": "20,150"
	},
	{
	 "Name": "Total",
	 "Salary": "0"
	}
];

var col = [], i, j, salaryValue, salaryTotal = 0;

function setCol () {
  var key;
  for (i = 0; i < employee.length; i++) {
    for (key in employee[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
}

function generateTable () {
  var table, tr, th, tabCell, dvTable, row;
 	
  setCol();
  table = document.createElement("table");

  //Add header rows
  tr = table.insertRow(-1);     
  tr.setAttribute("id","headrow");              
  for (i = 0; i < col.length; i++) {
    th = document.createElement("th");      
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  //Add the data rows.
  for (i = 0; i < employee.length; i++) {
    tr = table.insertRow(-1);
    tr.setAttribute("id","row" + i);
    for (j = 0; j < col.length; j++) {
      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = employee[i][col[j]];
      if (i != employee.length-1 && col[j] == "Salary") {
        salaryValue = employee[i][col[j]].replace(/\,/g,'');  //remove comma from salary string
        salaryTotal += Number(salaryValue);
      }
      if (i == employee.length-1 && col[j] == "Salary") {
        tabCell.innerHTML = salaryTotal.toLocaleString('hi-IN');  //convert to hindi-india language code
      }
    }
  }
  
  dvTable = document.getElementById("display-table");
  dvTable.innerHTML = "";
  dvTable.appendChild(table);
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
  for (i = 0; i < employee.length-1; i++) {
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
    row.cells[1].innerHTML = salaryTotal.toLocaleString('hi-IN'); //convert to hindi-india language code
  }
  row.style.display = 'table-row';
  alignSalaryCol(row);
}

function alignSalaryCol (rows) {
  rows.cells[1].style.textAlign = 'right';
}