let countries = document.getElementById("countries");
const countries_search = document.getElementById("countries_select");
const buttonDark = document.querySelector(".dark_mode");

class AllRequest {
  async withCountriesAPI(url) {
    let reqFetch = await fetch(url);
    let resFetch = await reqFetch.json();
    return resFetch;
  }
}

//instancia de la clase que realiza las peticiones
let r = new AllRequest();
let endpoint = "https://restcountries.eu/rest/v2" 

//TODO: hacer paginacion
const getCountries = async () => {
  //url para el metodo de la clase
  let url = `${endpoint}/all`;
  //respuesta de la api
  let res = await r.withCountriesAPI(url);
  
  //FIX: a foreach luego de hacer la paginacion
  for (let i = 0; i <= 7; ++i) {
    countries.innerHTML += `
      <div class="card">
        <img src=${res[i].flag} alt="logo"/>
        <p class="title">${res[i].name}</p>
        <p><b>Population: </b>${res[i].population}</p>
        <p><b>Region: </b>${res[i].region}</p>
        <p><b>Capital: </b>${res[i].capital}</p> 
      </div
      `
  }
}

window.addEventListener("load", getCountries);

countries_search.addEventListener("change", async function() {
  countries.innerHTML = "";
  //obtiene el value de la etiqueta select
  let selectOption = this.options[countries_search.selectedIndex];
  //url para el metodo de la clase
  let url = `${endpoint}/region/${selectOption.value}`;
  
  let res = await r.withCountriesAPI(url);
 
  for (let i = 0; i <= 7; ++i) {
    countries.innerHTML += `
      <div class="card">
        <img src=${res[i].flag} alt="logo"/>
        <p class="title">${res[i].name}</p>
        <p><b>Population: </b>${res[i].population}</p>
        <p><b>Region: </b>${res[i].region}</p>
        <p><b>Capital: </b>${res[i].capital}</p> 
      </div
      `
  }
});

//TODO: detaller para el dark mode
buttonDark.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
});


