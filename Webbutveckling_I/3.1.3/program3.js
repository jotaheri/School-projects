// Gör ett program som stoppar en händelses normala beteende 
// och tar bort en händelse

// Stoppa en händelse
// Välj formuläret med id "myForm"
let formElement = document.getElementById("myForm");
// Lägg till eventhanterare för submit-händelsen
formElement.addEventListener("submit", function(event) {
    event.preventDefault(); // Stoppar formuläret från att skickas
    console.log("preventDefault anropades, formuläret skickades ej.");
});

// Ta bort en händelse
// Välj knappen med id "clickButton"
let clickButton = document.getElementById("clickButton");
// Skapa en funktion för vad som ska hända när knappen klickas på
function handleClick() {
    console.log("Knappen klickades på")
}
// Lägg till eventhanterare för click
clickButton.addEventListener("click", handleClick);
// Ta bort click-händelsen efter 5 sekunder
setTimeout(function() {
    clickButton.removeEventListener("click", handleClick);
    console.log("Click-händelsen har tagits bort");
}, 5000)