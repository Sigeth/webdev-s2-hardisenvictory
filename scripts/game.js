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
    nb_parties++;
    nb_coups_j1 = 0;
    nb_coups_j2 = 0;
    pions_manges_j1 = 0;
    pions_manges_j2 = 0;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {

            plateau[i][j] = cells[i * 10 + j];


            // Fonction qui gère le clic sur une cellule

            plateau[i][j].addEventListener("click", function () {
                    console.log(plateau[i][j].state);
                    console.log(i);
                    console.log(j);
                    switch (plateau[i][j].state) {
                        case "pionNoir":
                            if (joueur === 1) {
                                clearCoupPossible(plateau);
                                calculCoupPossible(plateau, j, i);

                            }
                            break;
                        case "pionBlanc":
                            if (joueur === 0) {
                                clearCoupPossible(plateau);
                                calculCoupPossible(plateau, j, i);
                            }
                            break;
                        case null:
                            clearCoupPossible(plateau);
                            break;

                        case "dameBlanche":
                            if (joueur === 0) {
                                clearCoupPossible(plateau);
                                calculCoupPossible(plateau, j, i);
                            }
                            break;

                        case "dameNoire":
                            if (joueur === 1) {
                                clearCoupPossible(plateau);
                                calculCoupPossible(plateau, j, i);
                            }
                            break;

                        default:
                            //test//
                            console.log("omg plateau i j .state");
                            console.log(plateau[i][j].state[1]);
                            console.log(plateau[i][j].state[2]);
                            console.log("fin plateau");
                            //finTest//
                            const hasAte = movePion(plateau, plateau[i][j].state[1], plateau[i][j].state[2], i, j);
                            clearCoupPossible(plateau);
                            switch (hasWon(plateau, joueur)) {
                                case 1:
                                    console.log("joueur 1 gagne");
                                    //document.location.href = "../docs/endgame.html";
                                    break;
                                case 2:
                                    console.log("joueur 2 gagne");
                                    //document.location.href = "../docs/endgame.html";
                                    break;
                                case 3:
                                    console.log("match nul");
                                    document.location.href = "../docs/endgame.html";
                                    break;
                                default:
                                    console.log("le match continue");

                                    if (hasAte) {
                                        console.log("il a mangé");
                                        if (!canEat(plateau, joueur)) {
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
                                        }
                                    } else {
                                        console.log("il n'a pas mangé");
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
                                    }
                            }
                            break;
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
 */
function calculCoupPossible(plateau, c, l) {

//bon c'est fait un peu n'importe comment mais ça marche omg; c'est pas vraiment opti quoi

    let x = 0;
    let coups = 0;
    switch (plateau[l][c].state) {
        case "pionNoir":

            if (l < 9) {
                // console.log("colone du pion  : ", c, "ligne du pion :", l);
                if (!canEat(plateau, 1)) {
                    if (c < 9) {
                        if (estvide(plateau, l + 1, c + 1)) {
                            {
                                //console.log("colone du pion  : ",c+1,"ligne du pion :",l+1);
                                plateau[l + 1][c + 1].state = ["coup", c, l];
                                plateau[l + 1][c + 1].style.setProperty("background-color", "#787979")
                                coups++;
                            }
                        }
                    }
                    if (c > 0) {
                        if (estvide(plateau, l + 1, c - 1)) {
                            //console.log("colone du pion  : ",c-1,"ligne du pion :",l+1);
                            plateau[l + 1][c - 1].state = ["coup", c, l];
                            plateau[l + 1][c - 1].style.setProperty("background-color", "#787979")
                            coups++;
                        }
                    }
                } else {
                    if (c < 9) {
                        if (plateau[l + 1][c + 1].state === "pionBlanc") {

                            affichePossMange(plateau, l, c, "pionBlanc");
                            coups++;
                        }
                        if (l > 0) {
                            if (plateau[l - 1][c + 1].state === "pionBlanc") {

                                affichePossMange(plateau, l, c, "pionBlanc");
                                coups++;

                            }
                        }
                    }
                    if (c > 0) {
                        if (plateau[l + 1][c - 1].state === "pionBlanc") {

                            affichePossMange(plateau, l, c, "pionBlanc");
                            coups++;

                        }
                        if (l > 0) {
                            if (plateau[l - 1][c - 1].state === "pionBlanc") {

                                affichePossMange(plateau, l, c, "pionBlanc");
                                coups++;

                            }
                        }
                    }
                }
            }
            break;
        case "pionBlanc":
            if (l > 0) {
                // console.log("colone du pion  : ", c, "ligne du pion :", l);
                if (!canEat(plateau, 0)) {
                    if (c < 9) {
                        if (estvide(plateau, l - 1, c + 1)) {
                            //	console.log("colone du pion  : ",c+1,"ligne du pion :",l-1);
                            plateau[l - 1][c + 1].state = ["coup", c, l];
                            plateau[l - 1][c + 1].style.setProperty("background-color", "#787979")
                            coups++;
                        }
                    }
                    if (c > 0) {
                        if (estvide(plateau, l - 1, c - 1)) {
                            // 	console.log("colone du pion  : ",c-1,"ligne du pion :",l-1);
                            plateau[l - 1][c - 1].state = ["coup", c, l];
                            plateau[l - 1][c - 1].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    }
                } else {
                    if (c < 9) {
                        if (plateau[l - 1][c + 1].state === "pionNoir") {

                            affichePossMange(plateau, l, c, "pionNoir");
                            coups++;
                        }
                        if (l < 9) {
                            if (plateau[l + 1][c + 1].state === "pionNoir") {

                                affichePossMange(plateau, l, c, "pionNoir");
                                coups++;
                            }
                        }
                    }
                    if (c > 0) {
                        if (plateau[l - 1][c - 1].state === "pionNoir") {

                            affichePossMange(plateau, l, c, "pionNoir");
                            coups++;
                        }
                        if (l < 9) {
                            if (plateau[l + 1][c - 1].state === "pionNoir") {

                                affichePossMange(plateau, l, c, "pionNoir");
                                coups++;
                            }
                        }
                    }
                }
            }
            break;

        case "dameBlanche":

            while (l - x >= 0 && c + x < 10) {
                if (!canEat_Dames(plateau, 0)) {
                    if (estvide(plateau, l - x, c + x)) {
                        {

                            plateau[l - x][c + x].state = ["coup", c, l];
                            plateau[l - x][c + x].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    } else if (plateau[l - x][c + x].state === "pionNoir" || plateau[l - x][c + x].state === "dameNoire") {
                        console.log("ya un pion noir là omg");
                        plateau[l - x - 1][c + x + 1].state = ["coup", c, l];
                        plateau[l - x - 1][c + x + 1].style.setProperty("background-color", "#dc1512");
                        coups++;
                        break;

                    } else if (plateau[l - x][c + x].state === "pionBlanc" || plateau[l - x][c + x].state === "dameBlanche" && x != 0) {
                        console.log(`pionBLanc en : ${l - x} et en ${c + x}`);
                        break;
                    }
                    x++;
                }
            }
            x = 0;


            while (l - x >= 0 && c - x >= 0) {
                if (!canEat_Dames(plateau, 0)) {
                    if (estvide(plateau, l - x, c - x)) {
                        {

                            plateau[l - x][c - x].state = ["coup", c, l];
                            plateau[l - x][c - x].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    } else if (plateau[l - x][c - x].state === "pionNoir" || plateau[l - x][c + x].state === "dameNoire") {
                        console.log("ya un pion noir là omg");
                        plateau[l - x - 1][c - x - 1].state = ["coup", c, l];
                        plateau[l - x - 1][c - x - 1].style.setProperty("background-color", "#dc1512");
                        coups++;
                        break;

                    } else if (plateau[l - x][c + x].state === "pionBlanc" || plateau[l - x][c + x].state === "dameBlanche" && x != 0) {
                        console.log(`pionBLanc en : ${l - x} et en ${c - x}`);
                        break;
                    }
                    x++;
                }
            }
            x = 0;

            while (l + x < 10 && c + x < 10) {
                if (!canEat_Dames(plateau, 0)) {
                    if (estvide(plateau, l + x, c + x)) {
                        {

                            plateau[l + x][c + x].state = ["coup", c, l];
                            plateau[l + x][c + x].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    } else if (plateau[l + x][c + x].state === "pionNoir" || plateau[l - x][c + x].state === "dameNoire") {
                        console.log("ya un pion noir là omg");
                        plateau[l + x + 1][c + x + 1].state = ["coup", c, l];
                        plateau[l + x + 1][c + x + 1].style.setProperty("background-color", "#dc1512");
                        coups++;
                        break;

                    } else if (plateau[l + x][c + x].state === "pionBlanc" || plateau[l + x][c + x].state === "dameBlanche" && x != 0) {
                        console.log(`pionBLanc en : ${l + x} et en ${c + x}`);
                        break;
                    }
                    x++;
                }
            }
            x = 0;

            while (l + x < 10 && c - x >= 0) {
                if (!canEat_Dames(plateau, 0)) {
                    if (estvide(plateau, l + x, c - x)) {
                        {

                            plateau[l + x][c - x].state = ["coup", c, l];
                            plateau[l + x][c - x].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    } else if (plateau[l + x][c - x].state === "pionNoir" || plateau[l - x][c - x].state === "dameNoire") {
                        console.log("ya un pion noir là omg");
                        plateau[l + x + 1][c - x - 1].state = ["coup", c, l];
                        plateau[l + x + 1][c - x - 1].style.setProperty("background-color", "#dc1512");
                        coups++;
                        break;

                    } else if (plateau[l + x][c - x].state === "pionBlanc" || plateau[l + x][c - x].state === "dameBlanche" && x != 0) {
                        console.log(`pionBLanc en : ${l + x} et en ${c - x}`);
                        break;
                    }
                    x++;
                }
            }
            x = 0;

            break;

        case "dameNoire":

            while (l - x >= 0 && c + x < 10) {
                if (!canEat_Dames(plateau, 1)) {
                    if (estvide(plateau, l - x, c + x)) {
                        {

                            plateau[l - x][c + x].state = ["coup", c, l];
                            plateau[l - x][c + x].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    } else if (plateau[l - x][c + x].state === "pionBlanc" || plateau[l - x][c + x].state === "dameBlanche") {
                        console.log("ya un pion noir là omg");
                        plateau[l - x - 1][c + x + 1].state = ["coup", c, l];
                        plateau[l - x - 1][c + x + 1].style.setProperty("background-color", "#dc1512");
                        coups++;
                        break;

                    } else if (plateau[l - x][c + x].state === "pionNoir" || plateau[l - x][c + x].state === "dameNoire" && x != 0) {
                        console.log(`pionNoir en : ${l - x} et en ${c + x}`);
                        break;
                    }
                    x++;
                }
            }
            x = 0;


            while (l - x >= 0 && c - x >= 0) {
                if (!canEat_Dames(plateau, 1)) {
                    if (estvide(plateau, l - x, c - x)) {
                        {

                            plateau[l - x][c - x].state = ["coup", c, l];
                            plateau[l - x][c - x].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    } else if (plateau[l - x][c - x].state === "pionBlanc" || plateau[l - x][c + x].state === "dameBlanche") {
                        console.log("ya un pion blanc là omg");
                        plateau[l - x - 1][c - x - 1].state = ["coup", c, l];
                        plateau[l - x - 1][c - x - 1].style.setProperty("background-color", "#dc1512");
                        coups++;
                        break;

                    } else if (plateau[l - x][c + x].state === "pionNoir" || plateau[l - x][c + x].state === "dameNoire" && x != 0) {
                        console.log(`pionNoir en : ${l - x} et en ${c - x}`);
                        break;
                    }
                    x++;
                }
            }
            x = 0;

            while (l + x < 10 && c + x < 10) {
                if (!canEat_Dames(plateau, 1)) {
                    if (estvide(plateau, l + x, c + x)) {
                        {

                            plateau[l + x][c + x].state = ["coup", c, l];
                            plateau[l + x][c + x].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    } else if (plateau[l + x][c + x].state === "pionBlanc" || plateau[l - x][c + x].state === "dameBlanche") {
                        console.log("ya un pion blanc là omg");
                        plateau[l + x + 1][c + x + 1].state = ["coup", c, l];
                        plateau[l + x + 1][c + x + 1].style.setProperty("background-color", "#dc1512");
                        coups++;
                        break;

                    } else if (plateau[l + x][c + x].state === "pionNoir" || plateau[l + x][c + x].state === "dameNoire" && x != 0) {
                        console.log(`pionNoir en : ${l + x} et en ${c + x}`);
                        break;
                    }
                    x++;
                }
            }
            x = 0;

            while (l + x < 10 && c - x >= 0) {
                if (!canEat_Dames(plateau, 1)) {
                    if (estvide(plateau, l + x, c - x)) {
                        {

                            plateau[l + x][c - x].state = ["coup", c, l];
                            plateau[l + x][c - x].style.setProperty("background-color", "#787979");
                            coups++;
                        }
                    } else if (plateau[l + x][c - x].state === "pionBlanc" || plateau[l - x][c - x].state === "dameBlanche") {
                        console.log("ya un pion noir là omg");
                        plateau[l + x + 1][c - x - 1].state = ["coup", c, l];
                        plateau[l + x + 1][c - x - 1].style.setProperty("background-color", "#dc1512");
                        coups++;
                        break;

                    } else if (plateau[l + x][c - x].state === "pionNoir" || plateau[l + x][c - x].state === "dameNoire" && x != 0) {
                        console.log(`pionNoirc en : ${l + x} et en ${c - x}`);
                        break;
                    }
                    x++;
                }
            }
            x = 0;

            break;
    }
    return coups;
}


/**
 * Enlève l'affichage des coups possibles
 * @param plateau
 */

function canEat_Dames(plateau, joueur) {
    let potentialEat = 0;
    if (joueur === 0) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (plateau[i][j].state === "pionBlanc" || plateau[i][j].state === "dameBlanche") {
                    potentialEat += affichePossMange(plateau, i, j, "pionNoir");
                    potentialEat += affichePossMange(plateau, i, j, "dameNoire");
                }

            }
        }
    }
    if (joueur === 1) {

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (plateau[i][j].state === "pionNoir" || plateau[i][j] === "dameNoire") {
                    potentialEat += affichePossMange(plateau, i, j, "pionBlanc");
                    potentialEat += affichePossMange(plateau, i, j, "dameBlanche");
                }

            }
        }
    }


    if (potentialEat > 0) {
        if (joueur === 0) {
            pions_manges_j1++;
        } else {
            pions_manges_j2++;
        }
        return true;
    }
    return false;
}


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


    let hasAte = false;

    function eatPion() {
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

    /**fonction permettant de faire manger une dame
     **/
     function eatdames()
    {
        console.log(`c : ${c}, l : ${l}, x : ${x}, y : ${y}`);
        switch (plateau[l][c].state) {
        
            case "dameBlanche" :

                if (x > l && x<10) {
                    if (y > c && y<10) {
                    
                        if (plateau[x - 1][y- 1].state === "pionNoir" || plateau[x- 1][y - 1] === "dameNoire") {
                            
                            plateau[x - 1][y - 1].state = null;
                            plateau[x - 1][y - 1].firstChild.setAttribute("src", "../img/nopion.png");
                            hasAte = true;

                        }

                    }
                    if (y < c && y>=0 ) {
                        if (plateau[x-1][y+ 1].state === "pionNoir" || plateau[x-1][y+1] === "dameNoire") {
                        
                            plateau[x-1][y+1].state = null;
                            plateau[x-1][y+1].firstChild.setAttribute("src", "../img/nopion.png");
                            hasAte = true;

                        }


                    }
                }

                if (x < l  && x>=0) {

                    if (y > c && y<10)  {
                        if (plateau[x + 1][y - 1].state === "pionNoir" || plateau[x + 1][y - 1] === "dameNoire") {
                       
                            plateau[x + 1][y - 1].state = null;
                            plateau[x + 1][y - 1].firstChild.setAttribute("src", "../img/nopion.png");
                            hasAte = true;

                        }

                    }
                    if (y < c && y<10) {
                        if (plateau[x + 1][y+ 1].state === "pionNoir" || plateau[y + 1][x + 1] === "dameNoire") {
                        console.log(x+1,y+1) ;
                            plateau[x + 1][y + 1].state = null;
                            plateau[x + 1][y + 1].firstChild.setAttribute("src", "../img/nopion.png");
                            hasAte = true;

                        }


                    }
                }
                break;
                
            case "dameNoire":
            if (x > l && x<10) {
                    if (y > c && y<10) {
                    
                        if (plateau[x - 1][y- 1].state === "pionBlanc" || plateau[x- 1][y - 1] === "dameBlanche") {
                            
                            plateau[x - 1][y - 1].state = null;
                            plateau[x - 1][y - 1].firstChild.setAttribute("src", "../img/nopion.png")
                            hasAte = true;

                        }

                    }
                    if (y < c && y>=0 ) {
                        if (plateau[x-1][y+ 1].state === "pionBlanc" || plateau[x-1][y+1] === "dameBlanche") {
                        
                            plateau[x-1][y+1].state = null;
                            plateau[x-1][y+1].firstChild.setAttribute("src", "../img/nopion.png")
                            hasAte = true;

                        }


                    }
                }

                if (x < l  && x>=0) {

                    if (y > c && y<10)  {
                        if (plateau[x + 1][y - 1].state === "pionBlanc" || plateau[x + 1][y - 1] === "dameBlanche") {
                       
                            plateau[x + 1][y - 1].state = null;
                            plateau[x + 1][y - 1].firstChild.setAttribute("src", "../img/nopion.png")
                            hasAte = true;

                        }

                    }
                    if (y < c && y<10) {
                        if (plateau[x + 1][y+ 1].state === "pionBlanc" || plateau[y + 1][x + 1] === "dameBlanche") {
                        console.log(x+1,y+1) ;
                            plateau[x + 1][y + 1].state = null;
                            plateau[x + 1][y + 1].firstChild.setAttribute("src", "../img/nopion.png")
                            hasAte = true;

                        }


                    }
                }
                break;
        }

    }


    switch (plateau[l][c].state) {

        case "pionNoir" :
            plateau[x][y].state = "pionNoir";
            plateau[x][y].firstChild.setAttribute("src", "../img/pionnoir.png");
            if (x === 9) {
                transformePion(plateau, x, y);
            }
            if (Math.abs(x - l) >= 2 || Math.abs(y - c) >= 2) {
                eatPion();
                hasAte = true;
            }
            nb_coups_j2++;
            break;
        case "pionBlanc" :
            plateau[x][y].state = "pionBlanc";
            plateau[x][y].firstChild.setAttribute("src", "../img/pionblanc.png");
            if (x === 0) {
                transformePion(plateau, x, y);
            }
            if (Math.abs(x - l) >= 2 || Math.abs(y - c) >= 2) {
                eatPion();
                hasAte = true;
            }
            nb_coups_j1++;
            break;
        case "dameBlanche":
            plateau[x][y].state = "dameBlanche";
            plateau[x][y].firstChild.setAttribute("src", "../img/dameBlanche.png");
            console.log("dameBlanche veut bouger");
            eatdames();
            nb_coups_j1++;
            break;
        case "dameNoire":
            plateau[x][y].state = "dameNoire";
            plateau[x][y].firstChild.setAttribute("src", "../img/pionnoir.png");
            console.log("dameNoire veut bouger");
            eatdames();
            nb_coups_j2++;
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

    return hasAte;


}

/**
 * Vérifie si le joueur peut (et donc doit) manger
 * @param plateau
 * @param joueur - joueur sur le point de jouer
 *
 * @return {boolean} true si le joueur doit manger, false sinon
 */
function canEat(plateau, joueur) {
    let potentialEat = 0;
    if (joueur === 0) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (plateau[i][j].state === "pionBlanc" || plateau[i][j].state === "dameBlanche") {
                    potentialEat += affichePossMange(plateau, i, j, "pionNoir");
                    potentialEat += affichePossMange(plateau, i, j, "dameNoire");
                }

            }
        }
    }
    if (joueur === 1) {

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (plateau[i][j].state === "pionNoir" || plateau[i][j] === "dameNoire") {
                    potentialEat += affichePossMange(plateau, i, j, "pionBlanc");
                    potentialEat += affichePossMange(plateau, i, j, "dameBlanche");
                }

            }
        }
    }

    clearCoupPossible(plateau);

    if (potentialEat > 0) {
        if (joueur === 0) {
            pions_manges_j1++;
        } else {
            pions_manges_j2++;
        }
        return true;
    }
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
    const coups = calculCoupPossible(plateau, l, c);
    clearCoupPossible(plateau);
    return coups !== 0;
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
    let cpt = 0;
    let cpt2 = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (joueur === 1) {


                if (plateau[i][j].state === "pionBlanc" || plateau[i][j].state === "dameBlanche") {
                    console.log(plateau[i][j].state)
                    cpt += 1;
                    if (!canBouge(plateau, j, i)) {
                        console.log("Aucun pion du joueur 1 ne peut bouger");
                        cpt2 += 1;
                    }
                }
            } else {
                if (plateau[i][j].state === "pionNoir" || plateau[i][j].state === "dameNoire") {
                    console.log(plateau[i][j].state)
                    cpt += 1;
                    if (!canBouge(plateau, j, i)) {
                        console.log("Aucun pion du joueur 2 ne peut bouger");
                        cpt2 += 1;
                    }
                }
            }
        }
    }


    if (cpt === 0 || cpt === cpt2) {

        console.log(`Quelqu'un a gagné. cpt = ${cpt} et cpt2 = ${cpt2}`);
        switch (joueur) {
            case 0:
                console.log("joueur 1 gagne");
                return 1;

            case 1:
                console.log("joueur 2 gagne");
                return 2;
        }
    }

    return 0;
}

/**
 *Verifie la case du plateau visée est bien vide
 * @param plateau
 * @param l coordonnées en ligne
 * @param c coordonnées en colonne
 * @param w => string qui contient soit "pionNoir" soit "pionBlanc" /dame potentiellement
 * @return {number} nombre de possibilités de manger pour le pion en [l][c]
 */
function affichePossMange(plateau, l, c, w) {

    let potentialEat = 0;
    switch (plateau[l][c].state) {
        case "pionBlanc":
        case "pionNoir":
            if (l - 2 > -1) {
                if (c - 2 > -1) {
                    if (plateau[l - 1][c - 1].state === w) {
                        if (estvide(plateau, l - 2, c - 2)) {
                            plateau[l - 2][c - 2].state = ["coup", c, l];
                            plateau[l - 2][c - 2].style.setProperty("background-color", "#dc1512");
                            potentialEat++;
                        }
                    }
                }
                if (c + 2 < 10) {
                    if (plateau[l - 1][c + 1].state === w) {
                        if (estvide(plateau, l - 2, c + 2)) {
                            plateau[l - 2][c + 2].state = ["coup", c, l];
                            plateau[l - 2][c + 2].style.setProperty("background-color", "#dc1512");
                            potentialEat++;
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
                            potentialEat++;
                        }
                    }
                }
                if (c - 2 > -1) {
                    if (plateau[l + 1][c - 1].state === w) {
                        if (estvide(plateau, l + 2, c - 2)) {
                            plateau[l + 2][c - 2].state = ["coup", c, l];
                            plateau[l + 2][c - 2].style.setProperty("background-color", "#dc1512");
                            potentialEat++;
                        }
                    }
                }
            }

            return potentialEat;

        case "dameBlanche":
        case "dameNoire":
            console.log("test pour qu'une dame mange là");
            return 0;
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
        plateau[l][c].firstChild.setAttribute("src", "../img/dameBlanche.png");
        console.log("omgDameBlanche");

    }
    if (plateau[l][c].state === "pionNoir") {
        plateau[l][c].state = "dameNoire";
        console.log("omgDameNoire");
        plateau[l][c].firstChild.setAttribute("src", "../img/dameNoire.png");


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

const surrend = document.getElementById("boutonAbandon");

surrend.addEventListener("click", function () {
    if (joueur === 0) {
        console.log("joueur 2 gagne");
        document.location.href = "../docs/endgame.html";
    } else if (joueur === 1) {
        console.log("joueur 1 gagne");
        document.location.href = "../docs/endgame.html";
    }
});
