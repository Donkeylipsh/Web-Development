/***********************************************************************************
 * Author: Colin Van Overschelde
 * Date: 2/5/2018
 * Description: Higher-Order Functions and Objects demonstrates sorting an array of
 *							Automobile objects by various comparators.
 ***********************************************************************************/

/********************************************************************
 * Description: Object representing an Automobile
 ********************************************************************/
function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    
}

/********************************************************************
 * Description: Accepts a boolean parameter and prints the Automobile to the console,
 * includeType: Specifies the formating of the output
 ********************************************************************/
Automobile.prototype.logMe = function(includeType){
			if(includeType){
				console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
    	} else{
    	console.log(this.year + " " + this.make + " " + this.model);
    }
};

// Array of automobiles to be sorted
var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    
    var sortedArr = [];				// Array of sorted Automobiles to be returned
    var nextIndex = 0;				// Sorting variable which holds the index of the element containing the greatest value
    var someValue;						// Placeholder for swapping element values
    
    // Loop through each index storing the greatest remaining value
    for(var i = 0; i < array.length; i++){
    	// Reset nextIndex
    	nextIndex = i;
      
      // Loop through the remaining unsorted array to find the greatest value remaining
    	for(var j = i; j < array.length; j++){
      	// Use the function passed to comparator to compare the value of current index to value of nextIndex
      	if(!comparator(array[nextIndex], array[j])){
        	// If greater, assign current index to nextIndex
        	nextIndex = j;
        }
      }
      // Swap the value in index i with the value in index nextIndex and add it to the sortedArr
      someValue = array[i];
      sortedArr[i] = array[nextIndex];
      array[nextIndex] = someValue;
    }
    return sortedArr;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    // Compare the year values of each parameter
    if (auto1.year >= auto2.year){
    	// auto1.year is greater, i.e. newer, so return true
    	return true;
    } else {
    	// auto2.year is greater so return false
    	return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    // Noramlize case
    
    // Compare the make values of each parameter
    if (auto1.make.toUpperCase() < auto2.make.toUpperCase()){
    	// auto1.make is less than, i.e. comes before auto2.make in the alphabet
    	return true;
    } else if(auto1.make.toUpperCase() == auto2.make.toUpperCase()){
    	return yearComparator(auto1, auto2);
    }else {
    	// auto1.make is less than, so return false
    	return false;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    // Normalize the type values for easy comparison
    var rank1 = normalizeType(auto1);
    var rank2 = normalizeType(auto2);
    
    // Compare the resulting values
    if(rank1 < rank2){
    	// auto1.type has higher priority, so return true
    	return true;
    }
    else if(rank1 == rank2){
    	// Priority is equal, compare model year
      return yearComparator(auto1, auto2);
    }
    else{
    	// auto2.type has higher priority, so return false
      return false;
    }
    
}

/********************************************************************
 * Description: Returns an integer value based on the Automobile type for easier comparisons
 * someCar: Is the Automobile object who's type value is to be evaluated
 ********************************************************************/
function normalizeType(someCar){

	if(someCar.type.toUpperCase() == "ROADSTER"){
  	return 1;
  }
  else if(someCar.type.toUpperCase() == "PICKUP"){
  	return 2;
  }
  else if(someCar.type.toUpperCase() == "SUV"){
  	return 3;
  }
  else if(someCar.type.toUpperCase() == "WAGON"){
  	return 4;
  }
  else{
  	return 5;
  }
}

/********************************************************************
 * Description: Prints all Automobile objects in array someArray to the console
 * someArray: Array of Automobile objects to be printed to console
 * full: boolean value that controls output format
 ********************************************************************/
function printArr(someArray, full){
	for(var i = 0; i < someArray.length; i++){
  	someArray[i].logMe(full);
  }
}

console.log("*****");

console.log("The cars sorted by year are:");
automobiles = sortArr(yearComparator, automobiles);
printArr(automobiles, false);

console.log(" ");

console.log("The cars sorted by make are:");
automobiles = sortArr(makeComparator, automobiles);
printArr(automobiles, false);

console.log(" ");

console.log("The cars sorted by type are:");
automobiles = sortArr(typeComparator, automobiles);
printArr(automobiles, true);


/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */