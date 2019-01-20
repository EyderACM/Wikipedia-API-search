import fetchJsonp from 'fetch-jsonp';

//DOM Data
let textInput = document.querySelector('.text-input');
let submitInput = document.querySelector('.submit-input');
let results = document.querySelector('.results');

//JSON data
let link = 'https://es.wikipedia.org/w/api.php?Special:MyLanguage&action=opensearch&format:json&search='

submitInput.addEventListener('click', getInfo);

function getInfo(e){
  e.preventDefault();
  //Search link
  let searchValue = textInput.value;
  let toSearch = `${link.concat((searchValue))}`

  //Search Data
  fetchJsonp(toSearch, {
    jsonpCallbackFunction: 'callback',
  })
    .then(res => res.json())
    .then(data => displayInfo(data[1], data[3]))
    .catch(err => console.log(err));
}

let displayInfo = (articleNames, articleLinks) => {   
  results.innerHTML = ""; 
  for(let i = 0; i < articleNames.length; i++){
    let articleName = articleNames[i];
    let articleURL = articleLinks[i];

    //Create Anker Tag
    let ankerTag = document.createElement("a");
    ankerTag.innerHTML = `${articleName} <br>`;
    ankerTag.href = articleURL;

    results.appendChild(ankerTag);
  }
}