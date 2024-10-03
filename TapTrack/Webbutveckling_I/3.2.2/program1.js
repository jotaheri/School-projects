// Gör ett JavaScript-program som skapar följande effekter:
// Visar och gömmer ett HTML-element (show, hide och toggle)

// Hämta elementet som ska visas och gömmas med id "mySection"
let mySection = document.getElementById("mySection");

// Hämta knapparna med respektive id
let showButton = document.getElementById("showButton");
let hideButton = document.getElementById("hideButton");
let toggleButton = document.getElementById("toggleButton");

// Lägg till evenhanterare för knapparna
// Visa sektionen
showButton.addEventListener("click", function() {
    mySection.style.display = "block";
})
// Gör sektionen
hideButton.addEventListener("click", function() {
    mySection.style.display = "none";
})

// Toggla sektionen mellan visa/göm
toggleButton.addEventListener("click", function() {
    if (mySection.style.display === "none") {
        mySection.style.display = "block"; // Visar om det är gömt
    } else {
        mySection.style.display = "none"; // Gömmer om det visas
    }
});

