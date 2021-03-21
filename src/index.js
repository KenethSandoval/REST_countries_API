window.addEventListener("load", async () => {
  let countries = document.getElementById("countries");
  const countries_search = document.getElementById("countries_select");
  const search_input = document.getElementById("search_input");
  const header = document.getElementById("header");
  const modal = document.getElementById("modal");
  const buttonDark = document.querySelector(".button-mode");
  const backgroundModal = document.querySelector(".background-modal");
  const endpoint = "https://restcountries.eu/rest/v2" 

  class AllRequest {
    async withCountriesAPI(url) {
      let reqFetch = await fetch(url);
      let resFetch=  reqFetch.json()   
      return resFetch;
    }

    withCreateHTML(res) {
      res.forEach((element) => {
        countries.innerHTML += 
        `<div class="card">
           <img src=${element.flag} alt="logo" class="img-header"/>
          <p class="title">${element.name}</p>
          <p><b>Population: </b>${new Intl.NumberFormat("de-DE").format(element.population)}</p>
          <p><b>Region: </b>${element.region}</p>
          <p><b>Capital: </b>${element.capital}</p> 
        </div>`
      }); 
    }
  
    withOpenModal(result, res, index) {
      result.addEventListener("click", () => {
        backgroundModal.style.display = "flex";
        backgroundModal.style.opacity = 1;
        modal.innerHTML +=
        `<div class="card">
           <img src=${res[index].flag} alt="logo" class="img-header"/>
          <p class="title">${res[index].name}</p>
          <p><b>Population: </b>${new Intl.NumberFormat("de-DE").format(res[index].population)}</p>
          <p><b>Region: </b>${res[index].region}</p>
          <p><b>Capital: </b>${res[index].capital}</p> 
        </div>`
      });
    }
  }

  //instancia de la clase que realiza las peticiones
  let r = new AllRequest();

  //TODO: hacer paginacion
  //url para el metodo de la clase
  let url = `${endpoint}/all`;
  //respuesta de la api
  let res = await r.withCountriesAPI(url);
  r.withCreateHTML(res);
  let images = document.querySelectorAll(".img-header");
  images.forEach((imgElement, index) => {
    r.withOpenModal(imgElement, res, index);
  });

  countries_search.addEventListener("change", async function() {
    countries.innerHTML = "";
    //obtiene el value de la etiqueta select
    let selectOption = this.options[countries_search.selectedIndex];
    //url para el metodo de la clase
    let url = `${endpoint}/region/${selectOption.value}`;
  
    let res = await r.withCountriesAPI(url);
    r.withCreateHTML(res);
  });

  search_input.addEventListener("keyup", async () => {
    //no puede mandar una nueva url (${endpoint}/name/) vacia
    if (search_input.value === "") {
      return;
    }
    let url = `${endpoint}/name/${search_input.value}`;
    let res = await r.withCountriesAPI(url);
    countries.innerHTML = "";
    r.withCreateHTML(res)
  });

  let card = document.querySelectorAll(".card");
  if (localStorage.getItem('mode')) {
    document.body.classList.add(localStorage.getItem('mode'));
    header.classList.add('header-dark');
    buttonDark.classList.add('button-dark');
  }

  //TODO: detaller para el dark mode
  buttonDark.addEventListener("click", () => {
    let element = document.body;
    console.log(card);
    if (element.classList.contains('dark-mode')) {
      element.classList.remove('dark-mode');
      header.classList.remove('header-dark');
      buttonDark.classList.remove('button-dark');
      localStorage.removeItem('mode');
    } else {
      localStorage.setItem('mode', 'dark-mode');
      element.classList.add(localStorage.getItem('mode'));
      header.classList.add('header-dark');
      buttonDark.classList.add('button-dark');
      card.classList.add('card-dark');
    }
  });
});
