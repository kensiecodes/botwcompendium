
//hylia serif by artsy omni

//global variables
const monster = document.querySelector('#monster')
let url;

document.querySelector('#search').addEventListener('click', getSpecific)
document.querySelector('#random').addEventListener('click', getRandom)

function getSpecific(){
  clearPage()
  let choice = document.querySelector('input').value
  choice = choice.trim().split(' ').join('%20')
  console.log(choice)
  url = `https://botw-compendium.herokuapp.com/api/v2/entry/${choice}`
  getFetch()
}

function getRandom(){
  clearPage()
  const random = () => {
    return Math.floor(Math.random() * (389 - 1 + 1) + 1);
  }
  url = `https://botw-compendium.herokuapp.com/api/v2/entry/${random()}`
  getFetch()
  //389 items in compendium total - 389 unique ids
}


function getFetch(){
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    console.log(data.data.category)
    populatePage(data.data)
  
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}

function populatePage(arr) {
  monster.classList.toggle('hidden')
  document.querySelector('.name').innerText = arr.name
  document.querySelector('.photo').src = arr.image
  document.querySelector('.description').innerText = arr.description
  document.querySelector('.type').innerText = `Type: ${arr.category}`
  if (arr.common_locations != null) {
    document.querySelector('.locationsHeader').innerText = 'Common Locations'
    document.querySelector('.locations').innerText = arr.common_locations
  } if (arr.drops !=null) {
    document.querySelector('.dropsHeader').innerText = 'Drops'
    document.querySelector('.drops').innerText = arr.drops
  } if (data.data.category === 'equipment') {
  document.querySelector('.defense').innerText = `Defense: ${arr.defense}`
  document.querySelector('.attack').innerText = `Attack: ${arr.attack}`
  }
}

function clearPage(){
 if (!isHidden(monster)) {
    monster.classList.toggle('hidden')
  } 
  
}

const isHidden = elem => {
  const styles = window.getComputedStyle(elem)
  return styles.display === 'none' || styles.visibility === 'hidden'
}



// class 28 middle : appending object values to list items