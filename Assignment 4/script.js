/****************************************************************************************
 * Author: Colin Van Overschelde
 * Date: 2/10/2018
 * Description: script.js demonstrates using JavaScript to create a table on an HTML page
 *				and using events to capture input and manipulate the table cells
 ****************************************************************************************/

// Get a handle to the document body
var someDoc = document.body;
var currentCol = 0;
var currentRow = 0;
var someTableBody;
var selectedElement;

// Initialize the Table
createTable();

// Initialize the buttons
createButtons();

// Initialize Cell Selection
var someTableBody = someDoc.children[1].firstElementChild.children[1];
var selectedElement = someTableBody.firstElementChild.firstElementChild;
selectedElement.style.borderWidth = "medium";


/*****************************************************************************************
 * Description: createTable() creates a 4x4 table including the header row within a div 
 *				and adds the div to the document
 *****************************************************************************************/
 function createTable(){
	var tableWidth = 4;
	var tableHeight = 3;

	// Create div to hold table
	var tableDiv = document.createElement("div");

	// Create the table
	var someTable = document.createElement("table");

	// Create the table heading row
	var tableHead = document.createElement("thead");
	var headRow = document.createElement("tr");

		//debugger;
	// Create the heading cells
	for(var i = 1; i <= tableWidth; i++){
		var newCell = document.createElement("th");
		newCell.textContent = "Heading " + i;
		newCell.style.borderStyle = "solid";
		newCell.style.borderWidth = "thin";
		headRow.appendChild(newCell);
	}

	// Add heading row to table
	tableHead.appendChild(headRow);
	someTable.appendChild(tableHead);

	// Create the table body
	var tableBody = document.createElement("tbody");

	// Create table data rows
	for(var i = 1; i <= tableHeight; i++){
		var newRow = document.createElement("tr");
		for(var j = 1; j <= tableWidth; j++){
			var newCell = document.createElement("td");
			newCell.textContent = j + ", " + i;
			newCell.style.borderStyle = "solid";
			newCell.style.borderWidth = "thin";
			newRow.appendChild(newCell);
		}
		tableBody.appendChild(newRow);
	}

	// Add data rows to the table
	someTable.appendChild(tableBody);

	tableDiv.appendChild(someTable);

	// Add the div to the document body
	someDoc.appendChild(tableDiv);
}

/*****************************************************************************
 * Description: createButtons() creates the control buttons within and div and adds it to the document
 *****************************************************************************/

 function createButtons(){
 	console.log("Create Buttons started...");
 	// Create button div
 	var buttonDiv = document.createElement("div");

	// Create buttons
	var buttonLeft = document.createElement("button");
	buttonLeft.textContent = "left";
	buttonLeft.addEventListener("click", moveLeft);
	buttonDiv.appendChild(buttonLeft);

	var buttonUp = document.createElement("button");
	buttonUp.textContent = "up";
	buttonUp.addEventListener("click", moveUp);
	buttonDiv.appendChild(buttonUp);

	var buttonDown = document.createElement("button");
	buttonDown.textContent = "down";
	buttonDown.addEventListener("click", moveDown);
	buttonDiv.appendChild(buttonDown);

	var buttonRight = document.createElement("button");
	buttonRight.textContent = "right";
	buttonRight.addEventListener("click", moveRight);
	buttonDiv.appendChild(buttonRight);

	// Add buttonDiv to the document
	someDoc.appendChild(buttonDiv);

	// Create the marker button
	var markerDiv = document.createElement("div");
	var buttonMarker = document.createElement("button");
	buttonMarker.textContent = "Mark Cell";
	buttonMarker.addEventListener("click", markCell);
	markerDiv.appendChild(buttonMarker);

	// Add the marker button to the document
	someDoc.appendChild(markerDiv);
	
}

/*****************************************************************************
 * Description: moveLeft() is an event that moves the selected cell to the cell to the left of selectedElement
 *****************************************************************************/
function moveLeft(){
	if (currentCol > 0) {
		currentCol--;
		selectedElement.style.borderWidth = "thin";
		selectedElement = someTableBody.children[currentRow].children[currentCol];
		selectedElement.style.borderWidth = "medium";
	};
}

/*****************************************************************************
 * Description: moveUp() is an event that moves the selected cell to the cell above the selectedElement
 *****************************************************************************/
function moveUp(){
	if (currentRow > 0) {
		currentRow--;
		selectedElement.style.borderWidth = "thin";
		selectedElement = someTableBody.children[currentRow].children[currentCol];
		selectedElement.style.borderWidth = "medium";
	};
}

/*****************************************************************************
 * Description: moveDown() is an event that moves the selected cell to the cell below the selectedElement
 *****************************************************************************/
function moveDown(){
	if (currentRow < 2) {
		currentRow++;
		selectedElement.style.borderWidth = "thin";
		selectedElement = someTableBody.children[currentRow].children[currentCol];
		selectedElement.style.borderWidth = "medium";
	};
}

/*****************************************************************************
 * Description: moveRight() is an event that moves the selected cell to the cell to the right of selectedElement
 *****************************************************************************/
function moveRight(){
	if (currentCol < 3) {
		currentCol++;
		selectedElement.style.borderWidth = "thin";
		selectedElement = someTableBody.children[currentRow].children[currentCol];
		selectedElement.style.borderWidth = "medium";
	};
}

/*****************************************************************************
 * Description: markCell() is an event that sets the backgroundColor of selectedElement to yellow
 *****************************************************************************/
function markCell(){
	selectedElement.style.backgroundColor = "yellow";
}

