// Skapar variabel för antalet tabbar, börjar på 4 eftersom vi har 3
let tabCounter = 4;
// Skapar en lista för borttagna tabbar
let removedTabs = [];

// Aktiverar tabbpanelen med jQuery UI
$("#tabs").tabs();

// Stänger tabben när användaren klickar på kryss
$("#tabs").on("click", ".closeTab", function() {
    removeTab($(this));
});

// Funktion för att ta bort en tabb men lagra den i lista
function removeTab(closeButton) {
    // Hämtar panelens id baserat på href
    var panelID = closeButton.prev("a").attr("href");

    // Hämtar tabbtitel
    var tabTitle = closeButton.prev("a").text();

    // Hämtar panelinnehållet
    var tabContent = $(panelID).html();

    // Spara den borttaggna tabbens information
    removedTabs.push({
        id: panelID,
        title: tabTitle,
        content: tabContent
    });

    // Tar bort tabben
    closeButton.closest("li").remove();
    // Tar bort panelen
    $(panelID).remove();
    // Uppdaterar UI tabbarna
    $("#tabs").tabs("refresh"); 
}

// Skapar eventhanterare för knappen lägg till ny tabb
$("#addTab").click(function() {
    // Hämtar användarens inmatning för paneltitel och innehåll
    let newTabTitle = $("#newTabTitle").val().trim();
    let newTabContent = $("#newTabContent").val().trim();

    // Kontrollerar så både titel och innehåll är ifyllt
    if (newTabTitle === "" || newTabContent === "") {
        alert("Vänligen fyll i både titel och innehåll för den nya tabben.");
        return;
    }
    // Skapar nytt tabb-id
    let newTabId = `tab-${tabCounter}`;

    // Lägger till den nya tabben i listan med tabbar
    $("#tabs ul").append(`
        <li>
            <a href="#${newTabId}">${newTabTitle}</a><span class="closeTab">&#10006;</span>
        </li>
    `);
    // Lägger till innehållet i panelen
    $("#tabs").append(`
        <article id="${newTabId}"><p>${newTabContent}</p></article>
    `)
    // Uppdatera UI för att lägga till den nya tabben
    $("#tabs").tabs("refresh");
    // Gör den nya tabben till den aktiva
    $("#tabs").tabs("option", "active", -1);
    // Öka tabbräknaren med 1
    tabCounter++;

    // Kopplar stäng-funktionen till den nya tabben och se till att koppla händelsen till stängknappen korrekt
    $("#tabs ul li:last-child .closeTab").on("click", function() {
        removeTab($(this)); // Kör removeTab för den dynamiskt skapade fliken
    });
    
    // Rensar inmatningsfälten efter att tabben lagts till
    $("#newTabTitle").val("");
    $("#newTabContent").val("");
});

// Funktion för att återställa senaste borttagna tabben
$("#restoreTab").click(function() {
    // Kontrollera om det finns borttagna tabbar i listan
    if (removedTabs.length === 0) {
        alert("Det finns inga tabbar att återställa.");
        return;
    }
    // Ta bort den senaste lagrade tabben ur listan och lagra i en variabel
    let lastRemovedTab = removedTabs.pop();
    // Lägger till den återställda tabben i listan över tabbar
    $("#tabs ul").append(`
        <li>
            <a href="${lastRemovedTab.id}">${lastRemovedTab.title}</a><span class="closeTab">&#10006;</span>
        </li>
    `);
    // Lägger till innehållet för den återställda panelen
    $("#tabs").append(`
        <article id="${lastRemovedTab.id.substring(1)}">${lastRemovedTab.content}</article>
    `);
    // Uppdaterar tabbarna och gör den återställda tabben aktiv
    $("#tabs").tabs("refresh");
    $("#tabs").tabs("option", "active", -1);
    // Kopplar stäng-funktionen till den återställda tabben
    $(".closeTab").off("click").on("click", function() {
        removeTab($(this));
    });
});
