
//Create variables for API key and API
const url = 'https://api.thecatapi.com/v1/images/search?size=full';
const api_key = 'live_1DNFApdVrqLqnErkEImWHx0Cyy2ZZayNyjOQdJeYHXcH65z72dvwQdU0ZPiQILt3';
let imagesData;
let currentImageIndex = 0;
let currentImage;

//Fetching cat images https://jsfiddle.net/adenF/njf4vts0/ last accessed on 14/04/2023
//Uses cat api to receve cat image and text atributes in json format
async function loadCatImage() {
  const response = await fetch(url, {
    headers: { 'x-api-key': api_key }
  });
  //Setting image variable names so they can be called in the ionic site
  imagesData = await response.json();
  currentImage = imagesData[currentImageIndex];
  updateImage();
}

//Using data from above function to display the cat image,
// Will also then loop back to begining for a new random cat
function updateImage() {
  currentImageIndex++;
  //If image extends longer then data array length reset back to 0
  if (currentImageIndex === imagesData.length) {
    currentImageIndex = 0;
  }
  //Grabs the image from the now updated image index
  currentImage = imagesData[currentImageIndex];
  document.getElementById('cat-image').src = currentImage.url;
}

//Navigation-sets page to go forward to
function navigateToPage(page) {
  window.location.href = page;
}
//Data input and clearing based off of https://blog.logrocket.com/localstorage-javascript-complete-guide/#:~:text=of%20a%20localStorage-,Storing%20data%20with%20setItem(),the%20value%20attached%20to%20it. Last accessed on 13/04/2023

//Stores user inputted feelings and current date/time as an object in local storage to be used later
function saveFeelings() {
  var feelingsInput = document.getElementById('feelings');
  var feelings = feelingsInput.value;
  var currentDate = new Date();
  var dateTime = currentDate.toLocaleString();
  var existingFeelings = JSON.parse(localStorage.getItem('feelings')) || [];

  existingFeelings.push({ feelings: feelings, dateTime: dateTime });
  localStorage.setItem('feelings', JSON.stringify(existingFeelings));
}

//DOMContentLoaded triggers whenever webpage has been fully loaded 
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the stored array of feelings from localStorage
  var feelingsArray = JSON.parse(localStorage.getItem('feelings'));
  
  // If the array is not empty, display the feelings and date/time on the page
  if (feelingsArray && feelingsArray.length > 0) {
    var displayFeelings = document.getElementById('displayFeelings');
    
    for (var i = 0; i < feelingsArray.length; i++) {
      displayFeelings.innerHTML += 'You Felt: ' + feelingsArray[i].feelings + '<br>On: ' + feelingsArray[i].dateTime + '<br>';
    }
  }
});

function clearData() {
  // Clear the stored array of feelings from localStorage
  localStorage.removeItem('feelings');

  // Redirect to page1 after clearing data
  window.location.href = 'page1.html';
}


