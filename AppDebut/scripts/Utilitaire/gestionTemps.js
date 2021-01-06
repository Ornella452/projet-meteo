const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

var ajd = new Date();
var options = {weekday: 'long'};//
var  jourActuel = ajd.toLocaleDateString('fr-FR', options);
// version french
console.log(jourActuel, ajd);
jourActuel = jourActuel.charAt(0).toLocaleLowerCase + jourActuel.slice(1);
var tabJoursOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
//console.log(tabJoursOrdre);

export default tabJoursOrdre;
