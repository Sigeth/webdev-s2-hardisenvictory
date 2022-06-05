/**
 * Initialisation du plateau
 * @param plateau
 */
 function initPlateau(plateau) {

    /**
     * Place les pions selon la case
     * @param plateau
     * @param i
     * @param j
     */
    function setPions(plateau, i, j) {

        plateau[i][j].style.setProperty("background-color", "#873600");
        if (i < 1) {
            plateau[i][j].firstChild.setAttribute("src", "../img/pionnoir.png")
            plateau[i][j].state = "pionNoir";
        } else if (i > 8) {
            plateau[i][j].firstChild.setAttribute("src", "../img/pionblanc.png")
            plateau[i][j].state = "pionBlanc";
        } else {
            plateau[i][j].state = null;
        }
    }


    let cells = document.getElementsByClassName("cell");

    // Réinitialisation des statistiques en début de partie
    nb_parties ++;
    nb_coups_j1 = 0;
    nb_coups_j2 = 0;
    pions_manges_j1 = 0;
    pions_manges_j2 = 0;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {

            plateau[i][j] = cells[i * 10 + j];


            // Fonction qui gère le clic sur une cellule

            plateau[i][j].addEventListener("click", function () {
                    //  calculCoupPossible(plateau, i, j); //TODO: penser à enlever
                    joueur1 = ["pionBlanc", "dameBlanche"];
                    joueur2 = ["pionNoir", "dameNoire"];
                    Eat = 0;
                    bouge = 0;
                    console.log(plateau[i][j].state);
                    console.log(i);
                    console.log(j);
                    switch (plateau[i][j].state) {
                        case "pionNoir":
                            if (joueur === 1) {
                                canEat(plateau, joueur1);
                                clearCoupPossible(plateau);
                                calculCoupPossible(plateau, j, i);

                            }
                            break;
                        case "pionBlanc":
                            if (joueur === 0) {
                                canEat(plateau, joueur2);
                                clearCoupPossible(plateau);
                                calculCoupPossible(plateau, j, i);
                                //console.log("pionBlanc");
                            }
                            break;
                        case null:
                            clearCoupPossible(plateau);
                            break;

                        default:
                        	//test//
                            console.log("omg plateau i j .state");
                            console.log(plateau[i][j].state[1]);
                            console.log(plateau[i][j].state[2]);
                            console.log("fin plateau");	
                            //finTest//
                            movePion(plateau, plateau[i][j].state[1], plateau[i][j].state[2], i, j);
                            clearCoupPossible(plateau);
                            switch (hasWon(plateau, joueur)) {
                                case 1:
                                    console.log("joueur 1 gagne");
                                    document.location.href = "../docs/endgame.html";
                                    break;
                                case 2:
                                    console.log("joueur 2 gagne");
                                    document.location.href = "../docs/endgame.html";
                                    break;
                                case 3:
                                    console.log("match nul");
                                    document.location.href = "../docs/endgame.html";
                                    break;
                                default:
                                    console.log("le match continue");
                                    switch (joueur) {
                                        case 0:
                                            joueur = 1;
                                            document.getElementById("tourJoueurTxt").innerText = `Au tour de ${localStorage.getItem("pseudo2")}`
                                            break;
                                        default:
                                            joueur = 0;
                                            document.getElementById("tourJoueurTxt").innerText = `Au tour de ${localStorage.getItem("pseudo1")}`
                                            break;
                                    }
                                    break;
                            }
                    }
                }
            );


            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    plateau[i][j].style.setProperty("background-color", "#fae5d3");
                    plateau[i][j].state = null;
                } else {
                    setPions(plateau, i, j);
                }
            } else {
                if (j % 2 === 0) {
                    setPions(plateau, i, j);
                } else {
                    plateau[i][j].style.setProperty("background-color", "#fae5d3");
                    plateau[i][j].state = null;
                }
            }
        }
    }
}

/**
 * Calcule et affiche tous les coups possibles de la pièce sélectionnée
 * Pour afficher les coups, on change le state de la cellule par "coup c l" puis on split
 *
 * @param plateau
 * @param c - colonne c du pion
 * @param l - ligne l du pion
 */function calculCoupPossible(plateau, c, l) {

//bon c'est fait un peu n'importe comment mais ça marche omg; c'est pas vraiment opti quoi

 
    switch (plateau[l][c].state) {
        case "pionNoir":
	  
            if (l < 10) {
               // console.log("colone du pion  : ", c, "ligne du pion :", l);
                if (c < 9) {
                if(canEat(plateau,joueur2)==false){
                	//console.log("caneat()");
                    if (estvide(plateau, l + 1, c + 1)) {
                        {
                            //console.log("colone du pion  : ",c+1,"ligne du pion :",l+1);
                            plateau[l + 1][c + 1].state = ["coup", c, l];
                            plateau[l + 1][c + 1].style.setProperty("background-color", "#787979")
                        }
                    }
                    }
                    if(canEat(plateau,joueur2)==true) {
                    if (plateau[l + 1][c + 1].state === "pionBlanc") {

                        affichePossMange(plateau, l, c, "pionBlanc");

                    }
                    }

                }
                if (c - 1 > -1) {
                 if(canEat(plateau,joueur2)==false){
                 	//console.log("caneat()");
                    if (estvide(plateau, l + 1, c - 1)) {
                        //console.log("colone du pion  : ",c-1,"ligne du pion :",l+1);
                        plateau[l + 1][c - 1].state = ["coup", c, l];
                        plateau[l + 1][c - 1].style.setProperty("background-color", "#787979")
                    }
		}
		if(canEat(plateau,joueur2)==true){

                    if (plateau[l + 1][c - 1].state === "pionBlanc") {

                        affichePossMange(plateau, l, c, "pionBlanc");

                    }
                }
                }
            }
            break;
        case "pionBlanc":
            if (l > 0) {
               // console.log("colone du pion  : ", c, "ligne du pion :", l);
                if (c < 9) {
		if(canEat(plateau,joueur1)==false){
                    if (estvide(plateau, l - 1, c + 1)) {
                        //	console.log("colone du pion  : ",c+1,"ligne du pion :",l-1);
                        plateau[l - 1][c + 1].state = ["coup", c, l];
                        plateau[l - 1][c + 1].style.setProperty("background-color", "#787979")
                    }
                    }
                    if(canEat(plateau,joueur1)==true){
                    if (plateau[l - 1][c + 1].state === "pionNoir") {

                        affichePossMange(plateau, l, c, "pionNoir");
		}
                    }
                }
                if (c - 1 > -1) {
                if(canEat(plateau,joueur1)==false){
                    if (estvide(plateau, l - 1, c - 1)) {
                        // 	console.log("colone du pion  : ",c-1,"ligne du pion :",l-1);
                        plateau[l - 1][c - 1].state = ["coup", c, l];
                        plateau[l - 1][c - 1].style.setProperty("background-color", "#787979");
                    }
		}
		if(canEat(plateau,joueur1)==true){
                    if (plateau[l - 1][c - 1].state === "pionNoir") {

                        affichePossMange(plateau, l, c, "pionNoir");
                      }
                    }
                }

            }


            break;
    }
}


/**
 * Enlève l'affichage des coups possibles
 * @param plateau
 */
function clearCoupPossible(plateau) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (j % 2 === 0) {
                if (i % 2 !== 0) {
                    plateau[i][j].style.setProperty("background-color", "#873600");
                    if (typeof (plateau[i][j].state) === "object") {
                        plateau[i][j].state = null;
                    }
                }
            } else {
                if (i % 2 === 0) {
                    plateau[i][j].style.setProperty("background-color", "#873600");
                    if (typeof (plateau[i][j].state) === "object") {
                        plateau[i][j].state = null;
                    }
                }
            }
        }
    }
}


/**
 * Bouge le pion du joueur de [c][l] en [x][y]
 * PEUT AUSSI PERMETTRE DE MANGER
 * @param plateau
 * @param c- colonne de départ du pion
 * @param l- ligne de départ du pion
 * @param x - colonne d'arrivée du pion
 * @param y - ligne d'arrivée du pion
 */
function movePion(plateau, c, l, x, y) {

    function eatPion() {
        if (Math.abs(x - l) >= 2 || Math.abs(y - c) >= 2) {
            if (x - l === -2 && y - c === -2) {
                plateau[l - 1][c - 1].state = null;
                plateau[l - 1][c - 1].firstChild.setAttribute("src", "../img/nopion.png");
            } else if (x - l === -2 && y - c === 2) {
                plateau[l - 1][c + 1].state = null;
                plateau[l - 1][c + 1].firstChild.setAttribute("src", "../img/nopion.png");
            } else if (x - l === 2 && y - c === 2) {
                plateau[l + 1][c + 1].state = null;
                plateau[l + 1][c + 1].firstChild.setAttribute("src", "../img/nopion.png");
            } else if (x - l === 2 && y - c === -2) {
                plateau[l + 1][c - 1].state = null;
                plateau[l + 1][c - 1].firstChild.setAttribute("src", "../img/nopion.png");
            }
        }
    }

    switch (plateau[l][c].state) { //ici askip y'a une erreur mais je capte pas pk

        case "pionNoir" :
            plateau[x][y].state = "pionNoir";
            plateau[x][y].firstChild.setAttribute("src", "../img/pionnoir.png");
            if (y === 9) {
                transformePion(plateau, x, y);
            }
            eatPion();
            nb_coups_j2 ++;
            break;
        case "pionBlanc" :
            plateau[x][y].state = "pionBlanc";
            plateau[x][y].firstChild.setAttribute("src", "../img/pionblanc.png");
            if (y === 0) {
                transformePion(plateau, x, y);
            }
            eatPion();
            nb_coups_j1 ++;
            break;


    }

    console.log("STATISTIQUES");
    console.log("Nb Parties : " + nb_parties);
    console.log("nb_coups_j1 :" + nb_coups_j1);
    console.log("nb_coups_j2 :" + nb_coups_j2);
    console.log("pions_manges_j1 :" + pions_manges_j1);
    console.log("pions_manges_j2 :" + pions_manges_j2);

    plateau[l][c].state = null;
    //console.log(c, l);

    plateau[l][c].firstChild.setAttribute("src", "../img/nopion.png");


}




/*
function mouvDames(plateau,c,l,x,y) {
	//bon c'est fait un peu n'importe comment mais ça marche omg; c'est pas vraiment opti quoi 
	let cpt=0;
	switch (plateau[l][c].state) {
                    case "dameNoire ":
                 while(l+cpt<10 && l-cpt>0 && c+cpt<10 && c-cpt>0){
                 	if(estvide(plateau,l+cpt,c+cpt)) {{
                 		//console.log("colone du pion  : ",c+1,"ligne du pion :",l+1);  
                    	plateau[l+1][c+1].state=["coup", c, l];
                           plateau[l+1][c+1].style.setProperty("background-color", "#787979")
                           		}
                          		}
                          	if(c-1>-1){
                          		if(estvide(plateau,l+1,c-1)) {
                          	//console.log("colone du pion  : ",c-1,"ligne du pion :",l+1);  
                          	plateau[l+1][c-1].state=["coup", c, l];
                           plateau[l+1][c-1].style.setProperty("background-color", "#787979")
                           	}
                    	
                          }
                 
                 
                 
                 }
                    		
                    	
                          
                          if(plateau[l+1][c-1].state === "pionBlanc") {
                           			
            				affichePossMange(plateau,l,c,"pionBlanc");
            			
            			}
            			if(plateau[l+1][c+1].state === "pionBlanc") {
                           			
            				affichePossMange(plateau,l,c,"pionBlanc");
            			
            			}
                          
                          }
           }
                        break;
                    case "pionBlanc":
                    if(l>0){
                  console.log("colone du pion  : ",c,"ligne du pion :",l);  
                    	if(c+1<10) {
                    	
                    	if (estvide(plateau,l-1,c+1)) {
                    //	console.log("colone du pion  : ",c+1,"ligne du pion :",l-1);  
                    	plateau[l-1][c+1].state=["coup", c, l];
                           plateau[l-1][c+1].style.setProperty("background-color", "#787979")
                           		}
                          		}
                          	if(c>-1){
                          		if(estvide(plateau,l-1,c-1)){
                         // 	console.log("colone du pion  : ",c-1,"ligne du pion :",l-1);  
                          	plateau[l-1][c-1].state=["coup", c, l];
                           plateau[l-1][c-1].style.setProperty("background-color", "#787979");
                           	}
         
                           		if(plateau[l-1][c-1].state === "pionNoir") {
                           			
            				affichePossMange(plateau,l,c,"pionNoir");
            			
            			}
            			if(plateau[l-1][c+1].state === "pionNoir") {
                           			
            				affichePossMange(plateau,l,c,"pionNoir");
            			
            			}
            }
            }
            }
            }


}

*/

/**
 * Vérifie si le joueur peut (et donc doit) manger
 * @param plateau
 * @param joueur - joueur sur le point de jouer
 *
 * @return {boolean} true si le joueur doit manger, false sinon
 */
function canEat(plateau, joueur) {
    if (joueur === joueur1) {
        for (i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                if (plateau[i][j].state === joueur[0] || plateau[i][j] === joueur[1]) {
                    affichePossMange(plateau, i, j, joueur2[0]);
                    affichePossMange(plateau, i, j, joueur2[1]);
                }

            }
        }
    }
    if (joueur === joueur2) {

        for (i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                if (plateau[i][j].state === joueur[0] || plateau[i][j] === joueur[1]) {
                    affichePossMange(plateau, i, j, joueur1[0]);
                    affichePossMange(plateau, i, j, joueur1[1]);
                }

            }
        }
    }


    if (Eat > 0) {
        Eat = 0;
        if(joueur === joueur1){
            pions_manges_j1 ++;
        }
        else {
            pions_manges_j2 ++;
        }
        return true;
    }
    Eat = 0;
    return false;


}


/**
 * Vérifie si le joueur peut bouger
 * @param plateau
 * @param l
 * @param c
 *
 * @return {boolean} true si le joueur peut bouger false sinon
 */
function canBouge(plateau, l, c) {
    if (plateau[l][c].state === "pionNoir" || plateau[l][c].state === "dameNoir") {

        if (l < 10) {
           // console.log("colone du pion  : ", c, "ligne du pion :", l);
            if (c < 10) {
                if (estvide(plateau, l + 1, c + 1)) {
                    bouge = 0;

                }
                if (c - 1 > -1) {
                    if (estvide(plateau, l + 1, c - 1)) {
                        //console.log("colone du pion  : ",c-1,"ligne du pion :",l+1);
                        //plateau[l + 1][c - 1].state = ["coup", c, l];
                        //plateau[l + 1][c - 1].style.setProperty("background-color", "#787979")
                        bouge = 0;
                    }
                }

            }
        }
    } else if (plateau[l][c].state === "pionBlanc" || plateau[l][c].state === "dameBlanc") {
        if (l > 0) {
            //console.log("colone du pion  : ", c, "ligne du pion :", l);
            if (c < 10) {

                if (estvide(plateau, l - 1, c + 1)) {
                    //	console.log("colone du pion  : ",c+1,"ligne du pion :",l-1);
                    //plateau[l - 1][c + 1].state = ["coup", c, l];
                    //plateau[l - 1][c + 1].style.setProperty("background-color", "#787979")
                    bouge = 0;
                }
            }
            if (c - 1 > -1) {
                if (estvide(plateau, l - 1, c - 1)) {
                    // 	console.log("colone du pion  : ",c-1,"ligne du pion :",l-1);
                    //plateau[l - 1][c - 1].state = ["coup", c, l];
                    //plateau[l - 1][c - 1].style.setProperty("background-color", "#787979");
                    bouge = 0;
                }
            }
        } else {
            bouge = 1;
        }

    }
}


/**
 * Vérifie si le joueur a gagné
 *
 * @param plateau
 * @param joueur - dernier joueur a avoir joué
 *
 * @return {number} 0 si personne ne gagne, 1 si joueur 1 a gagné, 2 si joueur 2 a gagné, 3 si match nul
 */
function hasWon(plateau, joueur) {
    /*
   let cpt;
   for(let i = 0; i<10;i++)
   {
       for(let j =0; j<10; j++)
       {
           if(plateau[i][j].state == joueur[0]||plateau[i][j].state == joueur[1])
           {
               cpt+=1;
               canBouge(plateau,i,j);
               console.log("bouge = " + bouge);
               plateau[i][j].style.setProperty("background-color", "#787979");
           }
       }
   }

   if(cpt == bouge || cpt == 0)
   {
       loose = 1;
       console.log("la loose ?? :"+loose);
   }
   */
}


/**
 *Verifie la case du plateau visée est bien vide
 * @param plateau
 * @param x coordonnées en x => ligne
 * @param y coordonnées en y => colonne
 * @param w => string qui contient soit "pionNoir" soit "pionBlanc" /dame potentiellement
 * @return rien
 */
function affichePossMange(plateau, l, c, w) {


    if (l - 2 > -1) {
        if (c - 2 > -1) {
            if (plateau[l - 1][c - 1].state === w) {
                if (estvide(plateau, l - 2, c - 2)) {
                    plateau[l - 2][c - 2].state = ["coup", c, l];
                    plateau[l - 2][c - 2].style.setProperty("background-color", "#dc1512");
                    Eat++;
                }
            }
        }
        if (c + 2 < 10) {
            if (plateau[l - 1][c + 1].state === w) {
                if (estvide(plateau, l - 2, c + 2)) {
                    plateau[l - 2][c + 2].state = ["coup", c, l];
                    plateau[l - 2][c + 2].style.setProperty("background-color", "#dc1512");
                    Eat++;
                }
            }
        }
    }
    if (l + 2 < 10) {
        if (c + 2 < 10) {
            if (plateau[l + 1][c + 1].state === w) {
                if (estvide(plateau, l + 2, c + 2)) {
                    plateau[l + 2][c + 2].state = ["coup", c, l];
                    plateau[l + 2][c + 2].style.setProperty("background-color", "#dc1512");
                    Eat++;
                }
            }
        }
        if (c - 2 > -1) {
            if (plateau[l + 1][c - 1].state === w) {
                if (estvide(plateau, l + 2, c - 2)) {
                    plateau[l + 2][c - 2].state = ["coup", c, l];
                    plateau[l + 2][c - 2].style.setProperty("background-color", "#dc1512");
                    Eat++;
                }
            }
        }
    }
}


/**
 *Verifie la case du plateau visée est bien vide
 * @param plateau
 * @param x coordonnées en x => ligne
 * @param y coordonnées en y => colonne
 *
 * @return {boolean} true si vide false sinon
 */
function estvide(plateau, x, y) {


    if (plateau[x][y].state !== "pionNoir" && plateau[x][y].state !== "pionBlanc" && plateau[x][y].state !== "dameBlanche" && plateau[x][y].state !== "dameNoir") {
        return true;

    }
}

/**
 * Transforme un pion en reine
 * @param plateau
 * @param c - colonne du pion
 * @param l - ligne du pion
 */
function transformePion(plateau, l, c) {

    if (plateau[l][c].state === "pionBlanc") {
        plateau[l][c].state = "dameBlanche";
        //plateau[l][c].firstChild.setAttribute("src", "../img/dameBlanche.png");
	console.log("omgDameBlanche");

    }
    if (plateau[l][c].state === "pionNoir") {
        plateau[l][c].state = "dameNoire";
       console.log("omgDameNoire");
        //plateau[l][c].firstChild.setAttribute("src", "../img/dameNoire.png");


    }
    

}


/**
 * Permet de réinitialiser le tableau
 */
function resetPlateau() {

}


///////////////////////////////////////////////////////
//////////////// Début du code OMG ////////////////////
///////////////////////////////////////////////////////

let joueur = 0;
let plateau = new Array(10);

// Variables de Statistiques de fin de jeu :
let nb_parties = 0;
let nb_vic_j1 = 0;
let nb_vic_j2 = 0;
let nb_def_j1 = 0;
let nb_def_j2 = 0;
let nb_coups_j1 = 0;
let nb_coups_j2 = 0;
let moy_coups_j1 = 0;
let moy_coups_j2 = 0;
let pions_manges_j1 = 0;
let pions_manges_j2 = 0;
let moy_pions_j1 = 0;
let moy_pions_j2 = 0;

for (let i = 0; i < 10; i++) {
    plateau[i] = new Array(10);
}

if (!localStorage.getItem("pseudo1")) {
    localStorage.setItem("pseudo1", "Pseudo 1");
}
if (!localStorage.getItem("pseudo2")) {
    localStorage.setItem("pseudo2", "Pseudo 2");
}


document.getElementById("pseudo1txt").innerText = localStorage.getItem("pseudo1");
document.getElementById("pseudo2txt").innerText = localStorage.getItem("pseudo2");
document.getElementById("tourJoueurTxt").innerText = `Au tour de ${localStorage.getItem("pseudo1")}`


initPlateau(plateau, joueur);
console.log(plateau);

