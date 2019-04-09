"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 4

 Author: Trent Peterson
       Date:   4.5.19  
   
   Filename: gi_sort.js
   
   Global Variables:
   tableData
      An 2-dimensional array of the data found in the body of the web table
      
   dataCategories
      An array of the column titles found the head of the web table
      
   sortIndex
      The index number of the column by which the web table should be
      sorted where 0 = 1st column, 1 = 2nd column, etc.
      
   sortDirection
      A value indicating direction of the sorting where a value of 1 sorts 
      the data in ascending order and a value of -1 sorts the data in descending order
	
   
   
   Functions List:   
   defineDataArray()
      Extracts values from the body of the web table and stores them in the
      tableData array
      
   writeTableData()
      Writes the sorted data into the table rows and cells       
      
   defineColumns()
      Extracts values form the column heads of the web table and stores 
      them in the dataCategories array; also sets up the onclick event
      handlers for the column heads so that the table can be sorted by
      clicking a table heading cell.
           
   columnSort(e)
      Event handler function that sorts the table data when a column
      heading is clicked  
   
   dataSort2D(a, b)
      Compare function used to sort numeric and alphabetical data from
      a 2-dimensional array 
    

*/
// This is the gloabl arrays and variables used many times
var tableData = [];
var dataCategories = [];
var sortIndex = 0;
var sortDirection = 1;
//this loads my functions on load
window.addEventListener("load", function () {
      defineDataArray();
      writeTableData();
      defineColumns();
});



function defineDataArray() {
      //creates a like array with the table rows
      var tableRows = document.querySelectorAll("table.sortable tbody tr");
      for (var i = 0; i < tableRows.length; i++) {
            //this gets the text content of the table cells and puts them in to a new array that is created and then switches it into a global variable
            var rowCells = tableRows[i].children;
            var rowValues = new Array(rowCells.length);
            for (var j = 0; j < rowCells.length; j++) {
                  rowValues[j] = rowCells[j].textContent;
            }
            tableData[i] = rowValues;
      }
      //this sorts the gloal array with the textcontent of the cells
      tableData.sort(dataSort2D);
}


function writeTableData() {
      //this creates all a new table body with the sorted text content of the global var
      var newTableBody = document.createElement("tbody");
      for (var i = 0; i < tableData.length; i++) {
            var tableRow = document.createElement("tr");
            for (var j = 0; j < tableData[i].length; j++) {
                  var tableCell = document.createElement("td");
                  tableCell.textContent = tableData[i][j];
                  tableRow.appendChild(tableCell);
            }
            newTableBody.appendChild(tableRow);
      }
      //this replaces the old table
      var sortTable = document.querySelector("table.sortable");
      var oldTableBody = sortTable.lastElementChild;
      sortTable.replaceChild(newTableBody, oldTableBody);
}


function defineColumns() {
      //this creates a new style element in the head and gives it these rules
      var style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet.insertRule(
            //these rules change the pointer
            "table.sortable thead tr th {\
                  cursor: pointer;\
            }", 0);
      style.sheet.insertRule(
            //These rules change the margin content and font family
            "table.sortable thead tr th::after {\
                  content: '\\00a0';\
                  font-family: monospace;\
                  margin-left: 5px;\
            }", 1);
      style.sheet.insertRule(
            //These rule just change the content
            "table.sortable thead tr th:nth-of-type(1)::after {\
                  content: '\\25b2';\
            }", 2);
      //this gets all of the table header cells 
      var tableHeadCell = document.querySelectorAll("th");
      for (var i = 0; i < tableHeadCell.length; i++) {
            //puts the table header cells in to one of the global arrays
            dataCategories += tableHeadCell;
            //this makes it so you can click any of the head cells call column sort
            tableHeadCell[i].onclick = columnSort;
      }
}

function columnSort(e) {
      //this gets the text content of the clicked item
      var columnText = e.textContent;
      //this gets the index of the clicked item according to the text content of the clicked item
      var columnIndex = dataCategories.indexOf(columnText);
      //This changes it from accending or decending
      if (columnIndex == sortIndex) {
            sortDirection = sortDirection * -1;
      } else {
            sortIndex = columnIndex;
      }
      //this changes it back to accending
      var columnNumber = columnIndex + 1;
      //this gets the last stylesheet
      var columnStyles = document.styleSheets[document.styleSheets.length - 1];
      //this deletes the third rule
      columnStyles.deleteRule(2);
      //this changes the arrow according to accending or decending
      if (sortDirection == 1) {
            columnStyles.insertRule(
                  "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after {\
                   content: '\\25b2';\
      }", 0)
      } else {
            columnStyles.insertRule(
                  "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after {\
      content: '\\25bc';\
      }", 1);
      }
      //this sorts the new table that is made
      tableData.sort(dataSort2D);
      writeTableData();
}



function dataSort2D(a, b) {
      if (isNaN(parseFloat(a[sortIndex])) === false) {
            return (a[sortIndex] - b[sortIndex]) * sortDirection;
      } else {
            var astring = a[sortIndex].toLowerCase();
            var bstring = b[sortIndex].toLowerCase();

            if (bstring > astring) return -sortDirection;
            if (bstring < astring) return sortDirection;
            return 0;
      }
}