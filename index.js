let countries = document.getElementById("countries");
let buttonDark = document.querySelector(".dark_mode");

class AllRequest {
  async withCountries(url) {
    let reqFetch = await fetch(url);
    let resFetch = await reqFetch.json();
    return resFetch;
  }
}

//TODO: hacer paginacion
const getCountries = async () => {
  //instancia de la clase que realiza las peticiones
  let r = new AllRequest();
  let url = "https://restcountries.eu/rest/v2" 
  //respuesta de la api
  let res = await r.withCountries(`${url}/all`);
  
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


//TODO: detaller para el dark mode
buttonDark.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
});


