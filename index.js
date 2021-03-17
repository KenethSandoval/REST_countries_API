let url = "https://restcountries.eu/rest/v2" 
let countries = document.getElementById("countries");


//TODO: hacer paginacion
const getCountries = async () => {
  let req = await fetch(`${url}/all`)
  let res = await req.json();

  //FIX: a foreach
  for (let i = 0; i <= 4; ++i) {
    fetch(`${res[i].flag}`)
    countries.innerHTML += `
      <p>${res[i].name}</p>
      <p>${res[i].population}</p>
      <p>${res[i].region}</p>
      <p>${res[i].capital}</p> 
      
      <br><br>
      `
  }
}

getCountries();
