const monsterEl = document.querySelector('#monster');
let url;
let data;
let names = [];


fetchNameData();

async function fetchNameData() {
  try {
    const response = await fetch('https://botw-compendium.herokuapp.com/api/v2/all');
    data = await response.json();
    generateNamesArr()
  } catch (error) {
    console.error(error);
  }
}

function generateNamesArr() {
  const saveNames = (itemArray) => {
    itemArray.forEach(element => names.push(element.name))
  }
  if (localStorage.getItem("searchNamesArray") === null) {
    saveNames(data.data.creatures.food);
    saveNames(data.data.creatures.non_food);
    saveNames(data.data.materials);
    saveNames(data.data.equipment);
    saveNames(data.data.monsters);
    saveNames(data.data.treasure);
    localStorage.setItem('searchNamesArray', JSON.stringify(names));
  } else  {
    names = JSON.parse(localStorage.getItem('searchNamesArray'));
  }
}


const inputEl = document.querySelector('input');
const suggestionEl = document.querySelector('#suggestion');

inputEl.addEventListener('input', () => {
  const inputValue = inputEl.value.trim();
  if (inputValue.length > 0) {
    const matchingNames = names.filter(name => name.includes(inputValue));
    const suggestionHtml = matchingNames.map(name => `<li>${name}</li>`).join('');
    suggestionEl.innerHTML = suggestionHtml;
  } else {
    suggestionEl.innerHTML = '';
  }
});

suggestionEl.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const selectedProp = event.target.innerText;
    inputEl.value = selectedProp;
    suggestionEl.innerHTML = '';
  }
}); //inputEl and suggestionEl combine to make an autocomplete search feature

// inputEl.addEventListener('keyup', event => {
//   console.log('working')
//   if (event.code === 'Enter') {
//     const inputValue = inputEl.value.trim().split(' ').join('%20');
//     console.log(inputValue)
//     if (inputValue.length > 0) {
//       url = `https://botw-compendium.herokuapp.com/api/v2/entry/${inputValue}`
//       fetchData()
//     }
//   }
// }); //this event listener reads for the enter key 

document.querySelector('#search-button').addEventListener('click', search);
document.querySelector('#random-button').addEventListener('click', getRandom);
document.querySelector('.title--text').addEventListener('click', clearPage);

function search() {
  const inputValue = inputEl.value.trim().split(' ').join('%20');
  clearPage();
  url = `https://botw-compendium.herokuapp.com/api/v2/entry/${inputValue}`;
  console.log(url)
  fetchData()
}

function getRandom() {
  clearPage();
  const random = () => {
    return Math.floor(Math.random() * (389 - 1 + 1) + 1);
  };
  url = `https://botw-compendium.herokuapp.com/api/v2/entry/${random()}`;
  fetchData()
}

function fetchData() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      populatePage(data.data);
    })
    .catch(err => {
      console.error(err);
    });
}

function populatePage(data) {
  monsterEl.classList.toggle('hidden');
  document.querySelector('.name').innerText = data.name.split(' ').map(element => 
    element.charAt(0).toUpperCase() + element.slice(1)
  ).join(' ');
  document.querySelector('.photo').src = data.image;
  document.querySelector('.description').innerText = data.description;
  // document.querySelector('.type').innerText = `Type: ${data.category}`;

  if (data.common_locations !== undefined && data.common_locations.length > 0) {
    document.querySelector('img.locationsIcon').src = 'css/img/types/enchanted.png';
    document.querySelector('.locationsHeader').innerText = 'Common Locations';
    let locationsEl = document.querySelector('.locations')
    data.common_locations.forEach(element => {
      const li = document.createElement("li");
      li.textContent = element;
      locationsEl.appendChild(li);
    }) 
  }

  if (data.drops !== undefined && data.drops.length > 0) {
    document.querySelector('img.dropsIcon').src = 'css/img/types/materials.png';
    document.querySelector('.dropsHeader').innerText = 'Drops';
    let dropsEl = document.querySelector('.drops')
    data.drops.forEach(element => {
      const li = document.createElement("li");
      li.textContent = element;
      dropsEl.appendChild(li);
    })
  }

  if (data.defense !== undefined && data.defense > 0 && data.defense !== null) {
    document.querySelector('.defense').innerText = `${data.defense}`;
    document.querySelector('img.iconDefense').src = 'css/img/types/defense.png';
  }

  if (data.attack !== undefined && data.attack > 0 && data.attack !== null) {
    document.querySelector('.attack').innerText = `${data.attack}`;
    document.querySelector('img.iconAttack').src = 'css/img/types/sword.png';
  }
}

function clearPage() {
  const clearEls = document.querySelectorAll('.clear');
  const clearImgEls = document.querySelectorAll('.clearImg');
  console.log(clearImgEls);
  if (!isHidden(monsterEl)) {
    monsterEl.classList.toggle('hidden');
    for (let i = 0; i < clearEls.length; i++) {
      clearEls[i].innerText = null;
    }
    for (let i = 0; i < clearImgEls.length; i++) {
      clearImgEls[i].src = undefined;
    }
    document.querySelector('.locations').innerHTML = ''
    document.querySelector('.drops').innerHTML = ''
  }
}

const isHidden = elem => {
  const styles = window.getComputedStyle(elem);
  return styles.display === 'none' || styles.visibility === 'hidden';
};


