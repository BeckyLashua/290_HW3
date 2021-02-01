// You are not permitted to change this in any way
function Student(name, major, yearInSchool, club) {
  this.name = name; // string, (e.g. "Jim", "Pam", "Michael")
  this.major = major; // string, (e.g. "Computer Science", "Art", "Business")
  this.yearInSchool = yearInSchool; // int, (e.g. 1, 2, 3, 4)
  this.club = club; // string, (e.g. "Improv", "Art")
}
  
var students = [
  new Student("Pam", "Art", 2, "Art"),
  new Student("Michael", "Business", 4, "Improv"),
  new Student("Dwight", "Horticulture", 1, "Karate"),
  new Student("Jim", "Sports Science", 2, "Guitar"),
  new Student("Angela", "Accounting", 4, "Cat"),
  new Student("Toby", "Human Resources", 3, "Photography")
];
  
/* This function sorts arrays using an arbitrary comparator. You pass it a comparator 
and an array of objects appropriate for that comparator and it will return a new array 
which is sorted with the largest object in index 0 and the smallest in the last index
Source: Used bubble sort method inspired by this article:
https://medium.com/javascript-algorithms/javascript-algorithms-bubble-sort-3d27f285c3b2*/
function sortArr(comparator, array) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length - 1; j++) {
      if (comparator(array[j], array[j+1]) == false) {
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }
  return array;
}

/* This member function takes in a bool for including club
affiliation, and prints the student data, including club
affiliation if true was passed. */
Student.prototype.logMe = function(clubIncluded) {
  var outputStr = this.name + ' - ' 
                + this.major + ' - ' 
                + this.yearInSchool;
  if (clubIncluded) {
    outputStr += ' - ' + this.club;
  }
  console.log(outputStr);
};


/* A comparator takes two arguments and uses some algorithm to compare them. If the first 
argument is larger or greater than the 2nd it returns true, otherwise it returns false.
Here is an example that works on integers*/
function exComparator( int1, int2){
  if (int1 > int2){
    return true;
  } else {
    return false;
  }
}
  
/* For all comparators if students are 'tied' according to the comparison rules then the order of 
those 'tied' students is not specified and either can come first*/
  
/* This compares two students based on their year in school. Sort in descending order.*/
function yearComparator(student1, student2) {
  // your code here
  if (student1.yearInSchool >= student2.yearInSchool) {
    return true;
  } else {
    return false;
  }
}
  
/* This compares two students based on their major. It should be case insensitive and 
makes which are alphabetically earlier in the alphabet are "greater" than ones that 
come later (from A-Z).*/
function majorComparator(student1, student2) {
  if (student1.major.toLowerCase() <= student2.major.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}
  
/* This compares two students based on the club they're in. The ordering from "greatest" 
to "least" is as follows: improv, cat, art, guitar, (types not otherwise listed). 
It should be case insensitive. If two clubs are of equal type then the student who
has the higher year in school should be "greater."*/
function clubComparator(student1, student2) {
  // your code here
  var clubs = ["improv", "cat", "art", "guitar"];
  var index1 = getIndex(clubs, student1.club);
  var index2 = getIndex(clubs, student2.club);
  // compare index
  if (index1 == index2) { // same type return greater year
    return yearComparator(student1, student2);
  } else if (index1 < index2) { // first is greater
    return true;
  } else {  // second is greater
    return false;
  }
}
  
/* This function returns the index of an element in an array
If it doesn't exist in the array, it just returns the length
of the array*/
function getIndex(arr, elem) {
  // search for element in array 
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].toLowerCase() == elem.toLowerCase()) {
      return i;
    }
  }
  // element not found, so return index num of length
  return arr.length;
}


  /* Your program should output the following to the console.log, including each of the opening and closing 
  stars. All values in parenthesis should be replaced with appropriate values. To accomplish this, you will 
  have to sort the array of students using each comparator and then loop through the array and and call logMe
  on each student of the now-sorted array. If the argument is 'true' then it prints the student's name, major, 
  year in school, and club affiliation. If the argument is 'false' then the club affiliation is ommited and 
  just the student's name, major and year in school is logged. Please carefully note which sorted results require
  the club to be displayed and which do not.
  
  **********
  The students sorted by year in school are:
  (Name - Major - Year) // of the "greatest" student
  ...
  (Name - Major - Year) // of the "least" student
  
  **********
  The students sorted by major are:
  (Name - Major - Year) // of the "greatest" student
  ...
  (Name - Major - Year) // of the "least" student
  
  **********
  The students sorted by club affiliation are:
  (Name - Major - Year - Club) // of the "greatest" student
  ...
  (Name - Major - Year - Club) // of the "least" student
  
  **********
  
  As an example of what is expected to be printed to the console with logMe being sent True for a single student:
  Jim - Sports Science - 2 - Guitar
  
  */

function displaySortedStudents(arr) {
  // generate array from sorting by year
  var yearArr = sortArr(yearComparator, arr);
  console.log('**********');
  console.log("Students sorted by year in school are:");
  for (var i = 0; i < yearArr.length; i++) {
    yearArr[i].logMe(false);  
  }

  // generate array from sorting by major
  var majorArr = sortArr(majorComparator, arr);
  console.log('**********');
  console.log("Students sorted by major are:");
  for (var i = 0; i < majorArr.length; i++) {
    majorArr[i].logMe(false);  
  }

  // generate array form sorting by club
  var clubArr = sortArr(clubComparator, arr);
  console.log('**********');
  console.log("Students sorted by club affiliation are:");
  for (var i = 0; i < clubArr.length; i++) {
    clubArr[i].logMe(true);  
  }
  console.log('**********');
}

displaySortedStudents(students);