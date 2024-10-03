// Tidsstyrt bildbyte med JQuery attr()
// Skapar en array med bilderna
const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

// Skapar en funktuon för förladdning av bilder
function preloadImages() {
    for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i];
    }
}
// Förladdar bilderna
preloadImages();

// Hämtar bildelementet
let $imageElement = $("#imageSlider");

// Skapar ett startindex för bildspelet
let currIndex = 0;

// Skapar en funktion för att byta bild
function changeImage() {
    // Uppdaterar src-attributet till nästa bild i arrayen
    $imageElement.attr("src", images[currIndex]);
    // Uppdaterar index för nästa bild
    currIndex = (currIndex + 1) % images.length;
}
// Sätter intervallet till var tredje sekund
setInterval(changeImage, 3000);

// Användarstyrt bildbyte när muspekaren kommer över bilden
// Hämtar bildelementet
let $imageElement2 = $("#imageChange");
// Skapar en variabel för att lagra den aktuella bilden
let originalImage = $imageElement2.attr("src");

// Lägger till eventhanterare för mouseover
$imageElement2.on("mouseover", function () {
    $imageElement2.attr("src", images[1]); // Ändra src til andra bilden i arrayen
});
// Lägger till eventhanterare för mouseout
$imageElement2.on("mouseout", function() {
    $imageElement2.attr("src", originalImage);
});
