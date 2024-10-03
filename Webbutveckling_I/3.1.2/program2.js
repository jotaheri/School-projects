// Open och Close
// Eftersom de flesta webbläsare har säkerhetsåtgärder för .close() så måste programmet stängas av samma script som öppnar det

// Lägger till en eventlistener på knappen "openWindows" som triggar funktionen nedan
document.getElementById("openWindowBtn").addEventListener("click", function() {
    // Öppnar en ny flik
    let newWindow = window.open('https://example.com', '_blank');

    // Startar en timer på 3 sekunder, därefter stängs fliken
    setTimeout(function() {
        if (newWindow) {
            newWindow.close();
        }
    }, 3000);
});

// setTimeout och clearTimeout
// Startar en timer på 3 sekunder, därefter visas meddelandet
let timeout = setTimeout(function() {
    alert("Detta meddelande visas efter 3 sekunder.");
}, 3000);
// Om knappen "Avbryt Timeout" trycks på, avslutas timern
document.getElementById("cancelTimeout").addEventListener("click", function() {
    clearTimeout(timeout);
    alert("Timern avbröts.");
});

// setInterval clearInterval
let count = 0;

// Startar ett intervall som kör varannan sekund
let interval = setInterval(function() {
    count++;
    console.log(`Intervall körd ${count} gånger`); // Visa meddelandet i webbläsarens konsol
}, 2000);
// Om knappen "Avbryt intervall" trycks på, stoppas intervallet
document.getElementById("cancelInterval").addEventListener("click", function() {
    clearInterval(interval);
    alert("Intervallet avbröts.")
});

