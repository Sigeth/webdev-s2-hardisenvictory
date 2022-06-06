let nb_parties = sessionStorage.getItem('nbParties');
let nb_vic_j1 = sessionStorage.getItem('nbVicJ1');
let nb_vic_j2 = sessionStorage.getItem('nbVicJ2');
let nb_def_j1 = sessionStorage.getItem('nbDefJ1');
let nb_def_j2 = sessionStorage.getItem('nbDefj2');
let nb_coups_j1 = sessionStorage.getItem('nbCoupJ1');
let nb_coups_j2 = sessionStorage.getItem('nbCoupJ2');
let pions_manges_j1 = sessionStorage.getItem('nbPionsMangesJ1');
let pions_manges_j2 = sessionStorage.getItem('nbPionsMangesJ2');
let moy_coups_j1 = sessionStorage.getItem('MoyCoupJ1');
let moy_coups_j2 = sessionStorage.getItem('MoyCoupJ2');
let moy_pions_j1 = sessionStorage.getItem('MoyPionMangeJ1');
let moy_pions_j2 = sessionStorage.getItem('MoyPionMangeJ2');
let winner = sessionStorage.getItem("winner");

document.getElementById("joueur1").firstChild.innerText = localStorage.getItem("pseudo1");
document.getElementById("joueur2").firstChild.innerText = localStorage.getItem("pseudo2");
document.getElementById("j1nbCoup1").innerHTML=nb_coups_j1;
document.getElementById("j2nbCoup2").innerHTML=nb_coups_j2;
document.getElementById("j1NbPions").innerHTML=pions_manges_j1;
document.getElementById("j2NbPions").innerHTML=pions_manges_j2;
document.getElementById("j1nbVictoire").innerHTML=nb_vic_j1;
document.getElementById("j2nbVictoire").innerHTML=nb_vic_j2;
document.getElementById("j1nbDéfaites").innerHTML=nb_def_j1;
document.getElementById("j2nbDéfaites").innerHTML=nb_def_j2;


moy_coups_j1 = (moy_coups_j1 + nb_coups_j1)/2;
moy_coups_j2 = (moy_coups_j2 + nb_coups_j2)/2;
moy_pions_j1 = (moy_pions_j1 + pions_manges_j1)/2;
moy_pions_j2 = (moy_pions_j2 + pions_manges_j2)/2;

document.getElementById("j1MoyCoups").innerHTML=moy_coups_j1;
document.getElementById("j2MoyCoups").innerHTML=moy_coups_j2;
document.getElementById("j1NbPions").innerHTML=moy_coups_j1;
document.getElementById("j2NbPions").innerHTML=moy_coups_j2;

if (winner == 0) {
    document.getElementById("winPseudo").innerHTML = localStorage.getItem("pseudo1");
} else {
    document.getElementById("winPseudo").innerHTML = localStorage.getItem("pseudo2");
}
