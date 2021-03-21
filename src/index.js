window.addEventListener("load", async () => {
  let countries = document.getElementById("countries");
  const countries_search = document.getElementById("countries_select");
  const search_input = document.getElementById("search_input");
  const header = document.getElementById("header");
  const modal = document.getElementById("modal");
  let button = document.querySelector(".close");
  const buttonDark = document.querySelector(".button-mode");
  const backgroundModal = document.querySelector(".background-modal");
  const endpoint = "https://restcountries.eu/rest/v2";
  let response = [];

  //Si uso clases debo usar funcionas como tal
  const withCountriesAPI = async (url) => {
    let reqFetch = await fetch(url);
    let resFetch = reqFetch.json();
    return resFetch;
  };

  const withCreateHTML = (res) => {
    res.forEach((element) => {
      countries.innerHTML += `<div class="card">
           <img src=${element.flag} alt="logo" class="img-header"/>
          <p class="title">${element.name}</p>
          <p><b>Population: </b>${new Intl.NumberFormat("de-DE").format(
            element.population
          )}</p>
          <p><b>Region: </b>${element.region}</p>
          <p><b>Capital: </b>${element.capital}</p> 
        </div>`;
    });
  };

  const withOpenModal = (result, res, index) => {
    result.addEventListener("click", () => {
      backgroundModal.style.display = "flex";
      backgroundModal.style.opacity = 1;
      backgroundModal.style.animation = "aparecer 1s forwards";
      modal.innerHTML += `<div class="card">
        <img src=${res[index].flag} alt="logo" class="img-header"/>
        <p class="title">${res[index].name}</p>
        <p><b>Population: </b>${new Intl.NumberFormat("de-DE").format(
          res[index].population
        )}</p>
        <p><b>Region: </b>${res[index].region}</p>
        <p><b>Capital: </b>${res[index].capital}</p> 
      </div>`;
    });
  };

  const getCountries = async () => {
    //respuesta de la api
    response = await withCountriesAPI(`${endpoint}/all`);
    withCreateHTML(response);
    let images = document.querySelectorAll(".img-header");
    images.forEach((imgElement, index) => {
      withOpenModal(imgElement, response, index);
    });
  };

  //Funciones
  getCountries();

  //Eventos
  countries_search.addEventListener("change", async function () {
    countries.innerHTML = "";
    //obtiene el value de la etiqueta select
    let selectOption = this.options[countries_search.selectedIndex];
    response = await withCountriesAPI(
      `${endpoint}/region/${selectOption.value}`
    );
    withCreateHTML(response);
  });

  search_input.addEventListener("keyup", async () => {
    //no puede mandar una nueva url (${endpoint}/name/) vacia
    if (search_input.value === "") {
      return;
    }
    let response = await withCountriesAPI(
      `${endpoint}/name/${search_input.value}`
    );
    countries.innerHTML = "";
    withCreateHTML(response);
  });

  if (localStorage.getItem("mode")) {
    document.body.classList.add(localStorage.getItem("mode"));
    header.classList.add("header-dark");
    buttonDark.classList.add("button-dark");
  }

  buttonDark.addEventListener("click", () => {
    let element = document.body;
    if (element.classList.contains("dark-mode")) {
      element.classList.remove("dark-mode");
      header.classList.remove("header-dark");
      buttonDark.classList.remove("button-dark");
      localStorage.removeItem("mode");
    } else {
      localStorage.setItem("mode", "dark-mode");
      element.classList.add(localStorage.getItem("mode"));
      header.classList.add("header-dark");
      buttonDark.classList.add("button-dark");
    }
  });
});