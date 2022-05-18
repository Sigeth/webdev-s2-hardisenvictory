function initPlateau(plateau) {

    function setPions(plateau, i, j) {
        plateau[i][j].style.setProperty("background-color", "#873600");
        if (i<4) {
            plateau[i][j].firstChild.setAttribute("src", "img/pionnoir.png")
            plateau[i][j].pion = "Noir";
        } else if (i>5) {
            plateau[i][j].firstChild.setAttribute("src", "img/pionblanc.png")
            plateau[i][j].pion = "Blanc";
        } else {
            plateau[i][j].pion = null;
        }
    }


    let cells = document.getElementsByClassName("cell");
    
    for (let i=0;i<10;i++) {
        for (let j=0;j<10;j++) {

            plateau[i][j] = cells[i*10+j];

            if (i%2 === 0) {
                if (j%2 === 0) {
                    plateau[i][j].style.setProperty("background-color", "#fae5d3");
                    plateau[i][j].pion = null;
                } else {
                    setPions(plateau, i, j);
                }
            } else {
                if (j%2 === 0) {
                    setPions(plateau, i, j);
                } else {
                    plateau[i][j].style.setProperty("background-color", "#fae5d3");
                    plateau[i][j].pion = null;
                }
            }
        }
    }
}

let plateau = new Array(10);
for (let i = 0; i<10; i++) {
    plateau[i] = new Array(10);
}

initPlateau(plateau);
console.log(plateau);