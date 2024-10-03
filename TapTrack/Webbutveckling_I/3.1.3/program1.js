// Gör ett JavaScript-program som använder DOM-objektet för att:

// Välja ut ett HTML-element och ändra egenskap
// Välj rubrik med getElementByID
let hdrElement = document.getElementById("hdr");

// Ändrar textfärgen på rubriken
hdrElement.style.color = "blue";

// Lägga till nytt innehåll till ett HTML-element
// Välj paragraf med getElementByID
let paragraphElement = document.getElementById("paragraph");
// Sätt nytt innehåll för paragrafen
paragraphElement.textContent = "Denna paragraf har fått nytt innehåll med JavaScript.";

// Ta bort ett HTML-element
// Ta bort paragrafen
paragraphElement.remove();

// Utvinna information från ett HTML-element
// Utvinn textinnehållet från rubriken
let hdrText = hdrElement.textContent;
console.log("Textinnehållet i rubriken:", hdrText);
// Utvinn ett attribut
let hdrID = hdrElement.getAttribute("id");
console.log("Id för rubriken:", hdrID);

// Lägga till och ta bort ett klass-attribut från ett HTML-element
// Lägg till en klass till rubriken
hdrElement.classList.add("ny-klass");
hdrID = hdrElement.getAttribute("class");
console.log(`Klass '${hdrID}' tillagd till rubriken.`);

hdrElement.classList.remove("ny-klass");
hdrID = hdrElement.getAttribute("class");
console.log("'ny-klass' borttagen.");
console.log("Klass:", hdrID);

// Gör även JavaScript-program som använder DOM-objektet för att reagera på följande händelser:

// Reagera på en mushändelse (dblclick och mouseover)
// Välj knappen med id "myButton"
let buttonElement = document.getElementById("myButton");
// Lägg till en eventhanterare för knappen
buttonElement.addEventListener("mouseover", function() {
    console.log("Du har hoverat över knappen.");
});
buttonElement.addEventListener("dblclick", function() {
    alert("Knappen har dubbelklickats på.");
});

// Hantera en fönsterhändelse (resize)
// Lägg till en eventhanterare för fönstrets resize-händelse
window.addEventListener("resize", function() {
    console.log("Fönstrets storlek har ändrats.")
});

// Hantera formulärhändelser
// Välj inputfältet med id "nameField"
let inputElement = document.getElementById("nameField");
// Lägg till en eventhanterare för focus-händelse
inputElement.addEventListener("focus", function() {
    console.log("Inputfältet är i fokus.");
});

// Reagera på tangentbordshändelse (keydown och keyup)
// Lägg till eventhanterare för keydown
inputElement.addEventListener("keydown", function(event) {
    console.log("Tangent tryckt:", event.key);
});
// Lägg till eventhanterare för keyup
inputElement.addEventListener("keyup", function(event) {
    console.log("Tangent släppt:", event.key);
});