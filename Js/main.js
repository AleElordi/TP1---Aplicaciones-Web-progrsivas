const API_KEY = "c38143e48fd001181c1bc185aa6dc47f"; // API KEY 


const d = document.getElementById;
const button = document.getElementById('sendButton');
const main = document.getElementById('main');
const inputElement = document.getElementById('search');


button.addEventListener("click", ()=> {
    buscarClima(inputElement.value);
});


function buscarClima(ciudadABuscar){
    console.log("Valor buscado por usuario ", ciudadABuscar);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudadABuscar}&appid=${API_KEY}&units=metric&lang=es`
    ).then(function(response){
        return response.json();
    }).then(function(data){
        console.log('Imprimo Json', data);
        mostrarClima(data);
        datosImg(data);
        saveResults('responsewt', data);
    })
    .catch(function(error){
        console.log('Fallo!', error);
    })
}


const mostrarClima = (data) => {

    //Busqueda de ID
    const ciudadElegida = document.getElementById('ciudad');
    const temperaturaGrados = document.getElementById('temperatura');
    const temperaturaTermica = document.getElementById('termica');
    const humedadCiudad = document.getElementById('humedad');
    const temperaturaMaxima = document.getElementById('temperaturaMaxima');
    const temperaturaMinima = document.getElementById('temperaturaMinima');
    const velocidadViento = document.getElementById('vientoVel');
    const climaEstado = document.getElementById('estadoclima');
    const presionAtm = document.getElementById('presioatm');

    //Datos en HTML
    ciudadElegida.innerHTML = data.name;
    temperaturaGrados.innerHTML = data.main.temp;
    temperaturaTermica.innerHTML = data.main.feels_like;
    humedadCiudad.innerHTML = data.main.humidity;
    temperaturaMinima.innerHTML = data.main.temp_min;
    temperaturaMaxima.innerHTML = data.main.temp_max;
    velocidadViento.innerHTML = data.wind.speed;
    presionAtm.innerHTML = data.main.pressure;

    //Datos del tiempo para HTMl
    let datosClima = data.weather;
        datosClima.map( item => { 
        return climaEstado.innerHTML = item.description;
    });
};


//--------------------------imagen dinamica de clima------------------------------//
const datosImg = (data) => {

const imgClima = data.weather.map( item => { return item.main; });
const climaImagen = document.getElementById('climaImagen');

climaImagen.setAttribute('src', `imgs/${imgClima}.png`);

}

//----------------Guardado en local Storage y autocompleto-------------------------//

function saveResults(responsewt, data){    
//Guardo en un objeto JSON
localStorage.setItem(responsewt, JSON.stringify(data))
}
    
//Get para el local storage
const busquedaclima = JSON.parse(localStorage.getItem('responsewt'));
if (buscarClima != null){
    mostrarClima(busquedaclima);
}