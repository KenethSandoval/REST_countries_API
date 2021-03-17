let url = "https://restcountries.eu/rest/v2" 
let countries = document.getElementById("countries");

//TODO: hacer paginacion
const getCountries = async () => {
  let req = await fetch(`${url}/all`)
  let res = await req.json();

  //FIX: a foreach luego de hacer la paginacion
  for (let i = 0; i <= 4; ++i) {
    countries.innerHTML += `
      <div class="card">
        <img src=${res[i].flag} alt="logo"/>
        <p>${res[i].name}</p>
        <p>${res[i].population}</p>
        <p>${res[i].region}</p>
        <p>${res[i].capital}</p> 
      </div
      `
  }
}

getCountries();
