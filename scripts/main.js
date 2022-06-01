

document.getElementById("playButton").addEventListener("click", function () {
    const pseudo1 = document.getElementById("pseudo1").value;
    const pseudo2 = document.getElementById("pseudo2").value;

    if (!pseudo1 || !pseudo2) {
        if (!pseudo1 && !pseudo2) {
            document.getElementById("pseudo1").style.setProperty("background-color", "red");
            document.getElementById("pseudo2").style.setProperty("background-color", "red");
        } else if (!pseudo1) {
            document.getElementById("pseudo1").style.setProperty("background-color", "red");
            document.getElementById("pseudo2").style.setProperty("background-color", "");
        } else {
            document.getElementById("pseudo1").style.setProperty("background-color", "");
            document.getElementById("pseudo2").style.setProperty("background-color", "red");
        }
        console.error("Un des deux pseudos est vide...");
    } else {

        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("pseudo1", pseudo1);
            localStorage.setItem("pseudo2", pseudo2);
        } else {
            console.error("Storage incompatible : les pseudos seront définis par défaut et les pages sont susceptibles de disfonctionner.");
        }

        document.location.href = "./docs/game.html";
    }
});