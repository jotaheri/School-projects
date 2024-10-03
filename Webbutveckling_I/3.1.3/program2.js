// Gör ett program som använder den kombinerade händelsen hover (= mouseover + mouseout)
// samt hämtar musens koordinater vid händelsen

// Välj elementet med id "hoverArea"
let hoverArea = document.getElementById("hoverArea");

// Lägg till eventhanterare för mouseover
hoverArea.addEventListener("mouseover", function() {
    console.log("Musen är över området")
    hoverArea.classList.add("hovered");
});

// Lägg till eventhanterare för mouseout
hoverArea.addEventListener("mouseout", function() {
    console.log("Musen är har lämnat området")
    hoverArea.classList.remove("hovered"); 
});

// Använd händelseobjekt för att få fram musens koordinater
hoverArea.addEventListener("mouseover", function(event) {
    console.log("Musens position - X:", event.pageX, "Y:", event.pageY);
});