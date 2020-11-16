// DOM selectors 
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// initialize data and we will store all names heres which will be an array of objects.
let data = [];

getRandomUser(); // Calling 3 times
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api'); // Use fetch API
  const data = await res.json(); // returns a promise 

  const user = data.results[0]; // set results array for the first index

  const newUser = { // creating an object for newUsers
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000) // giving random amount money for the user
  };

  addData(newUser); // Add new object to data array
}

// Double everyone money
function doubleMoney() {
  data = data.map(user => { // map array method check MDN docs for map method
    return { ...user, money: user.money * 2 }; //  spread operator to copy our user object
  }); // updating Money in our return.

  updateDOM(); // Update our data on the DOM
}

// Sort users by richest
function sortByRichest() {
  console.log(123);
  data.sort((a, b) => b.money - a.money); // Using the sort method based on descending check MDN docs

  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000); // Using the filter method for an array check MDN docs.

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0); // returning a single value
// The 0 is a start value.
// user is our object
  const wealthEl = document.createElement('div'); // Creat a new element.
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM(); // call the function
}

// Update DOM
function updateDOM(providedData = data) { // take in a param and default value to data
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => { // take the param and loop through it with a callback
    const element = document.createElement('div');  // we creating an element 
    element.classList.add('person'); // adding a class person
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney( 
      item.money
    )}`; // filling the html element 
    main.appendChild(element); // we have three users now :) 
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser); // listen to the click button
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest); // listen to the click button
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);