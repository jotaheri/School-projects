$(document).ready(function() {
    // Funktion för att draggable boxarna
    $("#draggable").draggable();
    $("#draggable-nonvalid").draggable({revert : "invalid"});
    // Funktion för droppable boxen
    $("#droppable").droppable({
        accept: "#draggable", // Gör att enbart #draggable accepteras 
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function(event, ui) {
             $(this).addClass("ui-state-highlight").find("p").html("Släppt!");
        },
        // Återställer lådan när #draggable dras ut ur #droppable
        out: function(event, ut) {
            $(this).removeClass("ui-state-highlight").find("p").html("Släpp rätt låda här");
        }
    });
    
    // Funktion för accordion widget med modifierasde ikoner
    var icons = {
        header: "ui-icon-caret-1-e",
        activeHeader: "ui-icon-caret-1-s"
    }
    $("#accordion").accordion({
        icons: icons, // Sätter ikoner
        collapsible: true // Gör så att man kan stänga alla flikar
    });
    
    // Eventhanterare för knappen #button
    $("#button").on("click", function() {
        // Kör effekten fold med en varaktighet på 500ms
        $("#effect").toggle("fold", 500); 
    });
});