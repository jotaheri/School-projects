
// Se till att hela dokumentet är laddat innan koden körs
$(document).ready(function() {
    // Rita raka linjer och kurvlinjer

    // Rita en rak linje
    $("#myCanvas").drawLine({
        strokeStyle: "#000",
        strokeWidth: 2,
        x1: 50, y1: 50, // Startpunkt
        x2: 250, y2: 50 /// Slutpunkt
    });

    // Rita en cirkulär båge (arc)
    $("#myCanvas").drawArc({
        strokeStyle: "#000",
        strokeWidth: 2,
        x: 150, y: 150, // Mittpunkt 
        radius: 50,
        start: 0, end: 180 // Start och slutvinkel
    });

    // Rita en kvadratisk kurva 
    $("#myCanvas").drawQuadratic({
        strokeStyle: "#000",
        strokeWidth: 2,
        x1: 50, y1: 250,
        cx1: 150, cy1: 300, // Kontrollpunkt
        x2: 250, y2: 250
    });

    // Rita bézier-kurvor och former ifyllda med både färg, mönster och gradienter

    // Rita bezier-kurva
    $("#myCanvas2").drawBezier({
        strokeStyle: "#000",
        strokeWidth: 2,
        x1: 50, y1: 50,  
        cx1: 100, cy1: 0,  // Första kontrollpunkt
        cx2: 200, cy2: 100, // Andra kontrollpunkt
        x2: 250, y2: 50
    });

    // Rita cirkel ifylld med färg
    $("#myCanvas2").drawArc({
        strokeStyle: "#000",
        strokeWidth: 2,
        fillStyle: '#FF5733',  // Fyller cirkeln med en färg
        x: 150, y: 150,
        radius: 50,
        start: 0, end: 360
    });

    // Skapa gradient som används för att fylla form
    const linear = $("#myCanvas2").createGradient({
        x1: 150, y1: 180,
        x2: 150, y2: 350,
        c1: "rgb(0, 0, 0)",
        c2: "#0f0",
        c3: "blue"
      });
    // Rita rektangel fylld med gradient
    $("#myCanvas2").drawRect({
        strokeStyle: "#000",
        strokeWidth: 2,
        fillStyle: linear,
        x: 150, y: 300,
        width: 100, height: 100
    });

    // Skapa mönster som används för att fylla form
    const patt = $("#myCanvas3").createPattern({
        width: 40, height: 40, // Bredd och höjd på mönstret
        source: function (context) {
        // Rita mönstret
        $(this).drawRect({
            fillStyle: 'lightblue',
            strokeStyle: 'blue',
            strokeWidth: 1,
            x: 0, y: 0,
            width: 40, height: 40,
            fromCenter: false,
            cornerRadius: 10
        });
        }
    });
    // Rita ellips fylld med mönstret
    $("#myCanvas3").drawEllipse({
        fillStyle: patt,
        strokeStyle: '#000',
        strokeWidth: 2,
        x: 150, y: 75,
        width: 250, height: 100
    });

    // Rita text (dagens datum/tid)
    // Skapa funktion för att rita dagens datum och tid
    function drawDateTime() {
        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();

        // Rensar tidigare text så att datum och tid kan uppdateras på sidan
        $('#myCanvas3').clearCanvas({
            x: 150, y: 200, width: 300, height: 90 // Området där texten visas
        });
    
        // Rita datumet
        $("#myCanvas3").drawText({
            fillStyle: "#000",
            strokeStyle: "#000",
            strokeWidth: 1,
            x: 150, y:175,
            fontsize: 20,
            fontFamily: "Arial, sens-serif",
            text: `Datum: ${dateString}`
        });
        // Rita tiden
        $("#myCanvas3").drawText({
            fillStyle: "#000",
            strokeStyle: "#000",
            strokeWidth: 1,
            x: 150, y:205,
            fontsize: 20,
            fontFamily: "Arial, sens-serif",
            text: `Datum: ${timeString}`
        });
    }
    setInterval(drawDateTime, 1000);

    // Använda transparens och skuggor
    // Rita en cirkel med transparens och skugga
    $("#myCanvas3").drawArc({
        strokeStyle: "rgb(0, 0, 0, 0.5)", // Svart linje med transparens
        strokeWidth: 2,
        fillStyle: "rgba(0, 0, 255, 0.5)", // Blå färg med transparens
        shadowColor: "#666", // Sätter färgen på skuggan
        shadowBlur: 10, // Sätter hur suddig skuggan är
        shadowX: 5, // Sätter skuggans förskjuttning i x-led
        shadowY: 5, // Sätter skuggans förskjuttning i y-led
        x: 150, y: 300,
        radius: 50,
        start: 0, end: 360
    });

    // Lägga till en eller flera bitmappad bilder
    // Ladda upp bilden
    const img = new Image();
    img.src = "images/image1.jpg";

    img.onload = function() {
        // Rita bilden på canvas när den har laddats
        $("#myCanvas4").drawImage({
            source: img,
            x: 150, y: 125,
            scale: 0.04 // Justerar storleken på bilden proportionerligt
        });
    }

    // Använda en teknik för att spara bilden
    // Funktion för att spara bild
    // OBS! Pga restriktioner så fungerar enbart nedladdning av bilden när jag kör hemsidan via lokal server
    // med hjälp av Live Server plugin
    function saveImage() {
        const canvas = document.getElementById("myCanvas4");

        // Hämtar innehållet som data-URL
        const dataURL = canvas.toDataURL("image/png");

        // Skapar en tillfällig länk för att ladda ner bilden
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        downloadLink.download = "myCanvas4-image.png";  // Namn på nedladdad fil

        // Klicka på länken för att trigga nedladdningen
        downloadLink.click();
    }
    // Skapa eventhanterare för knappen "myButton"
    let myButton = document.getElementById("myButton");
    myButton.addEventListener("click", saveImage);
});
