import tabJoursOrdre from './Utilitaire/gestionTemps.js';
//console.log(tabJoursOrdre);

const CLEAPI = "860e3f9d09735e5380909e4ca443c751";
var resultatsAPI;

// Le milieux de l'appli qui feras afficher la température , localisation;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
//Le bas de l'appli qui feras afficher la température pour tout les 3 h;

const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom')
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp')
const imgIcone = document.querySelector('.logo-meteo')
const chargementContainer = document.querySelector('.overlay-icone-chargement')



if (navigator.geolocation) { // Le navigateur va demander à l'utilisateur de le géocaliser

    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);

        var long = position.coords.longitude;
        var lat = position.coords.latitude;
        AppelAPI(long, lat);



    }, () => { // Si il refuse , afficher ce message

        alert("Accès refuser, Impossible de vous géocaliser, Veuillez l'activer ! ")

    });

}

function AppelAPI(long, lat) {
    //fetch retourne une preomesse et va s'executer en json
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
        .then((reponse) => {
            return reponse.json();
        })
        .then((data) => {
            // console.log(data)
            // Le milieux de l'appli , température localisation
            resultatsAPI = data;
            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
            localisation.innerText = resultatsAPI.timezone;

            // Le bas de l'appli qui afficheras la température par tranche de 3 !

            var heureActuelle = new Date().getHours();

            for (var i = 0; i < heure.length; i++) {

                var resultHeure = heureActuelle + i * 3;

                if (resultHeure > 24) {

                    heure[i].innerText = `${resultHeure - 24} h`;

                } else if (resultHeure === 24) {

                    heure[i].innerText = "00 h";
                } else {

                    heure[i].innerText = ` ${resultHeure} h`;
                }
            }
            //3h
            for (var j = 0; j < tempPourH.length; j++) {

                tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`;
            }

            // Afficher les 3 premieres lettres des jours de la semaine , qui se seras en bas de la page

            for (var k = 0; k < tabJoursOrdre.length; k++) {
                joursDiv[k].innerText = tabJoursOrdre[k].slice(0, 3);

            }

            // temp par jours 
            for (var m = 0; m < 7; m++) {

                tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`;

            }
            // icone dynamique 


            if ((heureActuelle >= 6) && (heureActuelle < 21)) {

                imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`

            } else {

                imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
            }
            /* class disparition pour faire disparaitre l'icone chargement quand on recoit les données*/
            chargementContainer.classList.add('disparition');
        })
}