const monsterEl = document.querySelector("#monster");
let url;
let data;
let names = [];

fetchNameData();
//calls name data function on page load

async function fetchNameData() {
  try {
    const response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v2/all"
    );
    data = await response.json();
    generateNamesArr();
  } catch (error) {
    console.error(error);
  }
}
//fetches data from API and saves to the data array, then calls the generateNameArr function. or sends an error if API fetching fails.

function generateNamesArr() {
  const saveNames = (itemArray) => {
    itemArray.forEach((element) => names.push(element.name));
  };
  if (localStorage.getItem("searchNamesArray") === null) {
    saveNames(data.data.creatures.food);
    saveNames(data.data.creatures.non_food);
    saveNames(data.data.materials);
    saveNames(data.data.equipment);
    saveNames(data.data.monsters);
    saveNames(data.data.treasure);
    localStorage.setItem("searchNamesArray", JSON.stringify(names));
  } else {
    names = JSON.parse(localStorage.getItem("searchNamesArray"));
  }
}

//this function's purpose is to populate an array with the "name" property of each object from the API. this is used for the autocomplete search feature. this is only done once and then saved to local storage. the conditional will not allow it to execute if the local storage already has a names array.

const inputEl = document.querySelector("input");
const suggestionEl = document.querySelector("#suggestion");

inputEl.addEventListener("input", () => {
  const inputValue = inputEl.value.trim();
  if (inputValue.length > 0) {
    const matchingNames = names.filter((name) => name.includes(inputValue));
    const suggestionHtml = matchingNames
      .map((name) => `<li>${name}</li>`)
      .join("");
    suggestionEl.innerHTML = suggestionHtml;
  } else {
    suggestionEl.innerHTML = "";
  }
});

suggestionEl.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const selectedProp = event.target.innerText;
    inputEl.value = selectedProp;
    suggestionEl.innerHTML = "";
  }
});

// ***** Add function to close autocomplete suggestions list when you click outside of the autocomplete window *****
document.addEventListener("click", (clearSuggestions))

function clearSuggestions() {
  suggestionEl.textContent = "";
}

//inputEl and suggestionEl combine to make an autocomplete search feature.

//inputEl accepts the input value in the form and filters the names array for a matching name,
//saved to a new array called matching names. suggestionHTML then maps through matchingNames
//and turns each element into a list item in HTML. then this is set to the innerHTML on the doc.

//suggestionEl is a listener on the list items that populate in the suggestion box. if a list item is clicked,
//the input autofills with the selected name.


//******** BUG FIX - I disabled the form element from submitting on Enter in the index.html, originally it would refresh the page *********
inputEl.addEventListener('keyup', event => {
  console.log('working')
  if (event.code === 'Enter') {
    search()
    console.log(inputValue)
    if (inputValue.length > 0) {
      url = `https://botw-compendium.herokuapp.com/api/v2/entry/${inputValue}`
      fetchData()
    }
  }
});

document.querySelector("#search-button").addEventListener("click", search);
document.querySelector("#random-button").addEventListener("click", getRandom);
document.querySelector(".title--text").addEventListener("click", clearPage);

function search() {
  const inputValue = inputEl.value.trim().split(" ").join("%20");
  clearPage();
  url = `https://botw-compendium.herokuapp.com/api/v2/entry/${inputValue}`;
  fetchData();
}
//this is a basic search function that formats the form input appropriately, then sets the URL, and calls the fetchData function.

function getRandom() {
  clearPage();
  const random = () => {
    return Math.floor(Math.random() * (389 - 1 + 1) + 1);
  };
  url = `https://botw-compendium.herokuapp.com/api/v2/entry/${random()}`;
  fetchData();
}

//this function specifically associates with the dice button, and will roll a random ID to get access to a random object from the API. like the search
// it sets the url and calls fetchData()

function fetchData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      populatePage(data.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

//fetchData uses the assigned URL to fetch data from the API, then calls the populatePage function with the fetched object (data.data).

function populatePage(data) {
  monsterEl.classList.toggle("hidden");
  document.querySelector(".name").innerText = data.name
    .split(" ")
    .map((element) => element.charAt(0).toUpperCase() + element.slice(1))
    .join(" ");
  document.querySelector(".photo").src = data.image;
  document.querySelector(".description").innerText = data.description;
  // document.querySelector('.type').innerText = `Type: ${data.category}`;

  if (data.common_locations !== undefined && data.common_locations.length > 0) {
    document.querySelector("img.locationsIcon").src =
      "./public/img/types/enchanted.png";
    document.querySelector(".locationsHeader").innerText = "Common Locations";
    let locationsEl = document.querySelector(".locations");
    data.common_locations.forEach((element) => {
      const li = document.createElement("li");
      li.textContent = element;
      locationsEl.appendChild(li);
    });
  }

  if (data.drops !== undefined && data.drops.length > 0) {
    document.querySelector("img.dropsIcon").src =
      "./public/img/types/materials.png";
    document.querySelector(".dropsHeader").innerText = "Drops";
    let dropsEl = document.querySelector(".drops");
    data.drops.forEach((element) => {
      const li = document.createElement("li");
      li.textContent = element;
      dropsEl.appendChild(li);
    });
  }

  if (data.defense !== undefined && data.defense > 0 && data.defense !== null) {
    document.querySelector(".defense").innerText = `${data.defense}`;
    document.querySelector("img.iconDefense").src =
      "./public/img/types/defense.png";
  }

  if (data.attack !== undefined && data.attack > 0 && data.attack !== null) {
    document.querySelector(".attack").innerText = `${data.attack}`;
    document.querySelector("img.iconAttack").src =
      "./public/img/types/sword.png";
  }
}

//this is the meat and potatoes of the whole site. it is a very verbose way of manipulating the DOM with
// the object that is fetched from the API.

function clearPage() {
  const clearEls = document.querySelectorAll(".clear");
  const clearImgEls = document.querySelectorAll(".clearImg");
  console.log(clearImgEls);
  if (!isHidden(monsterEl)) {
    monsterEl.classList.toggle("hidden");
    for (let i = 0; i < clearEls.length; i++) {
      clearEls[i].innerText = null;
    }
    for (let i = 0; i < clearImgEls.length; i++) {
      clearImgEls[i].src = undefined;
    }
    document.querySelector(".locations").innerHTML = "";
    document.querySelector(".drops").innerHTML = "";
  }
}
//clear page ensures that every object has a clean slate to work with; if, for example, an item doesn't
// has an attack stat like the previous item, the attack icon will clear from the page.

const isHidden = (elem) => {
  const styles = window.getComputedStyle(elem);
  return styles.display === "none" || styles.visibility === "hidden";
};

//a function to check if the "monster element" has the style of hidden applied. it will
// not execute any of the page clears if the element is already hidden, meaning it is already emptied.
