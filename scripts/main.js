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
        if (i<4) {
            plateau[i][j].firstChild.setAttribute("src", "img/pionnoir.png")
            plateau[i][j].state = "pionNoir";
        } else if (i>5) {
            plateau[i][j].firstChild.setAttribute("src", "img/pionblanc.png")
            plateau[i][j].state = "pionBlanc";
        } else {
            plateau[i][j].state = null;
        }
    }


    let cells = document.getElementsByClassName("cell");

    for (let i=0;i<10;i++) {
        for (let j=0;j<10;j++) {

            plateau[i][j] = cells[i*10+j];


            // Fonction qui gère le clic sur une cellule

            plateau[i][j].addEventListener("click", function () {
          //  calculCoupPossible(plateau, i, j); //TODO: penser à enlever
         	 console.log(plateau[i][j].state);
                switch (plateau[i][j].state) {
                    case "pionNoir":
                        //if (joueur === 1) {
                            calculCoupPossible(plateau, j, i);
                            
                       // }
                        break;
                    case "pionBlanc":
                        if (joueur === 0) {
                            calculCoupPossible(plateau, j, i);
                            console.log("pionBlanc");
                        }
                        break;
                    case null:
                        clearCoupPossible();
                        break;
                    default:
                        clearCoupPossible();
                        movePion(plateau, plateau[i][j].state[1], plateau[i][j].state[2], i, j);
                        switch (hasWon(plateau, joueur)) {
                            case 1:
                                console.log("joueur 1 gagne");
                                break;
                            case 2:
                                console.log("joueur 2 gagne");
                                break;
                            case 3:
                                console.log("match nul");
                                break;
                            default:
                                console.log("le match continue");
                                break;
                        }
                        break;
                }
            });




            if (i%2 === 0) {
                if (j%2 === 0) {
                    plateau[i][j].style.setProperty("background-color", "#fae5d3");
                    plateau[i][j].state = null;
                } else {
                    setPions(plateau, i, j);
                }
            } else {
                if (j%2 === 0) {
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
 */
function calculCoupPossible(plateau, c, l) {
 	
	switch (plateau[l][c].state) {
                    case "pionNoir":
                       
                            
                     
                        break;
                    case "pionBlanc":
                    if(l>0){
                    console.log("colone du pion  : ",c,"ligne du pion :",l);  
                    	if(c+1<10) {
                    	console.log("colone du pion  : ",c+1,"ligne du pion :",l-1);  
                    	plateau[l-1][c+1].state=`coup ${c} ${l}`;
                           plateau[l-1][c+1].style.setProperty("background-color", "#787979")
                          		}
                          	if(c-1>-1){
                          	console.log("colone du pion  : ",c-1,"ligne du pion :",l-1);  
                          	plateau[l-1][c-1].state=`coup ${c} ${l}`;
                           plateau[l-1][c-1].style.setProperty("background-color", "#787979")
                           	}
                    	
                          }
                  	
                        
                        break;
	



}}

/**
 * Enlève l'affichage des coups possibles
 * @param plateau
 */
function clearCoupPossible(plateau) {

}

/**
 * Bouge le pion du joueur de [c][l] en [x][y]
 * PEUT AUSSI PERMETTRE DE MANGER
 * @param plateau
 * @param c - colonne initiale du pion
 * @param l - ligne initiale du pion
 * @param x - colonne d'arrivée du pion
 * @param y - ligne d'arrivée du pion
 */
function movePion(plateau, c, l, x, y) {

}

/**
 * Vérifie si le joueur peut (et donc doit) manger
 * @param plateau
 * @param joueur - joueur sur le point de jouer
 *
 * @return {boolean} true si le joueur doit manger, false sinon
 */
function canEat(plateau, joueur) {

}

/**
 * Transforme un pion en reine
 * @param plateau
 * @param c - colonne du pion
 * @param l - ligne du pion
 */
function transformePion(plateau, c, l) {

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
for (let i = 0; i<10; i++) {
    plateau[i] = new Array(10);
}

// TODO: demande des pseudos des joueurs
initPlateau(plateau, joueur);
console.log(plateau);
