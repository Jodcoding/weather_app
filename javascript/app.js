
const key = '457a4200b2cbc2e75881f33387ea0b87'



/**
 * Fait appel a l'api openweathermap a partir d'un nom de ville
 * @param {String} city_name 
 */
async function fetchWeather(city_name){

    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${key}&units=metric`

    fetch(url)
    .then(response => response.json())
    .then(data =>{
        if(data.cod ==='404')
            logError(`Ville introuvable(${city_name})`)
        else{
            // console.log(data)
            displayData()
            removeErrorBox()
            getData(data)
        }
    })
    .catch((e)=>{
        console.log('Erreur lors du contact au serveur! ')
        // logError('Erreur lors du contact au serveur! ')
    })
}

/**
 * Recherche des infos sur la zone ou se trouve l'utilisateur au lancement du navigateur
 */
function fetchCity(){

    fetch('http://ip-api.com/json/').then(response => response.json()).then(info =>{
        fetchWeather(info.city)
    })
}

//Appel a la fonction fetchCity() au lancement du navigateur
fetchCity()

//Ecoute de l'evenement lors de la soumission du formulaire
const form = document.querySelector('form')

form.addEventListener('submit', e =>{
    e.preventDefault()
    const data = new FormData(form).get('recherche')
    // console.log(data)
    if(data !==null && data !== '')
        fetchWeather(data)
    else
        alert('Veuillez saisir une ville')
    form.reset()
    //console.log( document.querySelector('input').value)
})


/**
 * Affichage de l'erreur en cas d'un nom de ville incorrect
 * @param {String} message 
 */
function logError(message){

    removeErrorBox()
    hideData()
    
    const error  = document.createElement('div')
    error.innerHTML = `<p class="erreur">${message}</p>`
    error.classList.add('error-visible')
    
    document.querySelector('.main-container').append(error)
        
}

//Suppression de la boite affichant l'erreur
function removeErrorBox(){
    const errorExists = document.querySelector('.main-container .error-visible')
    if(errorExists){
        // console.log('true')
        errorExists.remove()
    }
   
}

/**
 * Recuperation des donnees depuis l'objet retourne par l'api openweathermap
 * @param {Object} data 
 */
function getData(data){
    const weatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    const city = data.name
    const country = data.sys.country 
    const temperature = Math.round(data.main.temp)
    const wind = data.wind.speed
    const humidity = data.main.humidity

    document.querySelector('.city').innerHTML = `<img src=${weatherIcon} alt=""/><p>${city}<p/><p>(${country})<p/>`

    document.querySelector('.temp').innerHTML = `<img class="svg-img" src="images/temperature-high-solid.svg" alt="">
    <p>${temperature} <sup>o</sup>C</p>`

    document.querySelector('.wind').innerHTML = `<img class="svg-img" src="images/wind-solid.svg" alt="">${wind} km/h`

    document.querySelector('.humidity').innerHTML = `<img class="svg-img" src="images/droplet-solid.svg" alt="">${humidity}%`
}

const container = document.querySelector('.info-container')

function hideData(){
    if(!check())
        container.classList.add('hide-data')
}

function displayData(){
    if(check())
        container.classList.remove('hide-data')
}

/**
 * Verifie si le container d'infos a la classe hide-data
 * @returns boolean
 */
function check(){
    if(document.querySelector('.hide-data'))
        return true
    return false
}

