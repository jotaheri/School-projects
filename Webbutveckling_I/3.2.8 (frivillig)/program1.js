// Väntar tills sidan laddas och jQuery Mobile är klart
$(document).on("pagecreate", "#homePage", function() {
    // Skapar eventhanterare för knappen myButton
    $("#myButton").on("click", function() {
        alert("Knappen på första sidan fungerar!");
    });
    
    // Skapar eventhantare för submitBtn
    $("#submitBtn").on("click", function() {
      
        // Hämtar värdet från range-elementet
        var selectedValue = $("#slider").val();
        if (selectedValue < 5) {
            // Visar alert med värdet
            alert(`Du gav min sida ${selectedValue} i betyg. :(`)  
        }
        else {
           
            alert(`Du gav min sida ${selectedValue} i betyg. :)`)
        }
        // Gör knappen inaktiverad efter att formuläret har skickats första gången
        $("#submitBtn").attr("disabled", true).button("disable");
    });

    // Ändrar den befintliga länken för att använda API navigering
    $("#myLink").on("click", function(event) {
        event.preventDefault(); // Förhindrar standardlänkens navigering
        $.mobile.changePage("#secondPage", {
            transition: "fade" // Sätter övergången till "fade"
        });
    });    

});

$(document).on("pagecreate", "#secondPage", function() {
    $("#myButton2").on("click", function() {
        alert("Knappen på andra sidan fungerar!");
    });

    $("#myLink2").on("click", function(event) {
        event.preventDefault();
        $.mobile.changePage("#homePage", {
            transition: "fade"
        });
    });

    // Skapar en  eventhanterare på flipswitchen
    $("#flip-checkbox").on("change", function() {
        // Kontrollerar om flipswitchen är på eller av
        if ($(this).is(":checked")) {
            // Ändrar till ljust tema (a)
            $("#secondPage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#myButton2").removeClass("ui-btn-b").addClass("ui-btn-a");
            $("#myLink2").removeClass("ui-btn-b").addClass("ui-btn-a");
            $("#popupBtn").removeClass("ui-btn-b").addClass("ui-btn-a");
            $("#popupBtn").removeClass("ui-btn-b").addClass("ui-btn-a");
            $("#closeBtn").removeClass("ui-btn-b").addClass("ui-btn-a");
            // Ändrar till ljust tema (a) på popupfönstret med jQuery Mobile API
            $("#popupWindow").popup("option", "overlayTheme", "a").popup("option", "theme", "a");
        } 
        else {
            // Ändrar till mörkt tema (b)
            $("#secondPage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#myButton2").removeClass("ui-btn-a").addClass("ui-btn-b");
            $("#myLink2").removeClass("ui-btn-a").addClass("ui-btn-b");
            $("#popupBtn").removeClass("ui-btn-a").addClass("ui-btn-b");
            $("#closeBtn").removeClass("ui-btn-a").addClass("ui-btn-b");
            // Ändrar till mörkt tema (b) på popupfönstret med jQuery Mobile API
            $("#popupWindow").popup("option", "overlayTheme", "b").popup("option", "theme", "b");
        }
    });
});