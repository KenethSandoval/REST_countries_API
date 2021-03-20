let countries = document.getElementById("countries");
const countries_search = document.getElementById("countries_select");
const buttonDark = document.querySelector(".dark_mode");
const endpoint = "https://restcountries.eu/rest/v2" 

class AllRequest {
  async withCountriesAPI(url) {
    let reqFetch = await fetch(url);
    let resFetch = await reqFetch.json().then((res) => {
      for (let i = 0; i <= 7; ++i) {
        countries.innerHTML += `<div class="card">
          <img src=${res[i].flag} alt="logo" id="img-header"/>
          <p class="title">${res[i].name}</p>
          <p><b>Population: </b>${res[i].population}</p>
          <p><b>Region: </b>${res[i].region}</p>
          <p><b>Capital: </b>${res[i].capital}</p> 
          </div>
        `
      }
    }).then(() => {
      const img = document.querySelector("img-header");
      console.log(img);
    });
    //return resFetch;
  }
}

//instancia de la clase que realiza las peticiones
let r = new AllRequest();

//TODO: hacer paginacion
const getCountries = async () => {
  //url para el metodo de la clase
  let url = `${endpoint}/all`;
  //respuesta de la api
  let res = await r.withCountriesAPI(url);
  
  //FIX: a foreach luego de hacer la paginacion
  //await r.withCreateHTML(res);
}

const abrirModal = () => {
  const modal = document.querySelector(".background-modal");
  modal.style.display = "flex";
}

window.addEventListener("load", getCountries);

countries_search.addEventListener("change", async function() {
  countries.innerHTML = "";
  //obtiene el value de la etiqueta select
  let selectOption = this.options[countries_search.selectedIndex];
  //url para el metodo de la clase
  let url = `${endpoint}/region/${selectOption.value}`;
  
  let res = await r.withCountriesAPI(url);
 
  //await r.withCreateHTML(res);
});


//TODO: detaller para el dark mode
buttonDark.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
});

