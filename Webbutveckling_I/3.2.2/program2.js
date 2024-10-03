// Gör ett JavaScript-program som skapar följande effekter:
// Fadar in och ut ett HTML-element (fadeIn, fadeOut, fadeToggle och fadeTo)

// Hämta elementet med id "mySection"
let mySection = document.getElementById("mySection");

// Hämta knappen med id "myButton"
let myButton = document.getElementById("myButton");
// Hämta knappen med id "myButton2"
let myButton2 = document.getElementById("myButton2");

// Skapa en flagga för att hålla koll på om animationen körts
let hasMoved = false 

// Skapa eventhanterare för att starta animation
myButton.addEventListener("click", function() {
    mySection.classList.add("animate");  // Startar CSS-animationen
    hasMoved = true // sätter flaggan till true
    // Callback-funktion när animationen är klar
    mySection.addEventListener("animationend", function() {
        console.log("Animationen är klar.");
    }, { once: true }); // Eventhanteraren körs bara en gång och tas bort efter att animationen har avslutats
});

// Skapa en eventhanterare för att återställa animationen
myButton2.addEventListener("click", function() {
    // Återställning fungerar enbart om första animationen körts och flaggan satts till true
    if (hasMoved) {
        mySection.classList.add("animate2");
        mySection.addEventListener("animationend", function() {
            console.log("Animationen har återställts.");
            // Ta bort klasserna animate och animate2 för att kunna köra animationen upprepade gånger
            mySection.classList.remove("animate");
            mySection.classList.remove("animate2");
            // Återställer flaggan
            hasMoved = false;
        }, { once: true });
    }
});