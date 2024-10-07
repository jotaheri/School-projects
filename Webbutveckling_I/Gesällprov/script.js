// Kod för #homePage //
// Väntar tills sidan laddas och jQuery Mobile är klart
$(document).on("pagebeforeshow", "#homePage", function() {

    // Kolla om "ui-page-theme-b" är satt på sidan och justera flipswitchens status därefter
    // Detta för att säkerställa att knappens på och av läge stämmer överens med temat på sidan. 
    if ($("#homePage").hasClass("ui-page-theme-b")) {
        // Om ja, sätt flipswitchen till checked
        $("#flip-checkbox").prop("checked", false).flipswitch("refresh");
    } else {
        // Om inte, avmarkera flipswitchen
        $("#flip-checkbox").prop("checked", true).flipswitch("refresh");
    }    

    // Kod för flipswitch //
    // Skapar en eventhanterare på flipswitchen
    $("#flip-checkbox").on("change", function() {
        // Kontrollerar om flipswitchen är på eller av
        if ($(this).is(":checked")) {
            // Ändrar till ljust tema (a)
            $("#homePage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");

            // Ändrar även temat på de andra sidorna
            $("#secondPage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#aboutMe").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");

        } 
        else {
            // Ändrar till mörkt tema (b)
            $("#homePage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");

            // Ändrar även temat på de andra sidorna
            $("#secondPage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#aboutMe").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
        }
    });

    // Kod för popuprutan med feedbackformuläret jQuery Validation Plugin //
    // Aktiverar plugin
    $("#feedbackForm").validate({
        // Regler för validering
        rules: {
            firstName: {
                required: true, // Obligatoriskt fält
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/ // Endast bokstäver, mellanslag och bindestreck tillåtna
            },
            lastName: {
                required: true,
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/ 
            },
            textarea: {
                required: true,
                minlength: 10,
                maxlength: 800,
            }
        },
        // Meddelanden för validering
        messages: {
            firstName: {
                required: "Vänligen ange ditt förnamn",
                minlength: "Förnamnet måste vara minst 2 tecken långt",
                regex: "Förnamnet får enbart innehålla bokstäver"
            },
            lastName: {
                required: "Vänligen ange ditt efternamn",
                minlength: "Efternamnet måste vara minst 2 tecken långt",
                regex: "Efternamnet får enbart innehålla bokstäver"
            },
            textarea: {
                required: "Vänligen ange ditt meddelande",
                minlength: "Meddelandet måste vara minst 10 tecken långt",
                maxlength: "Meddelandet får inte vara längre än 800 tecken"
            }
        },
    });
    // Eventhanterare för checkbox-1
    $("#checkbox-1").on("change", function() {
        // Om checkboxen kryssas i döljs för- och efternamnfältet.
        if ($(this).is(":checked")) {
            $("#firstName").hide();
            $("#lastName").hide();
            // Tar bort felmeddelanden och ogiltiga fält
            $("#feedbackForm").validate().errorList = [];
            $("#feedbackForm").find("#firstName, #lastName").removeClass("error");
            $("#feedbackForm").find("label[for='firstName'], label[for='lastName']").remove();
        }
        else {
            $("#firstName").show();
            $("#lastName").show();
        }
    });

    // Döljer #email som standard
    $("#email").hide();
    // När checkboxen för svar klickas, visas #email fältet
    $("#checkbox").on("change", function() {
        if ($(this).is(":checked")) {
            $("#email").show();
            // Lägg till valideringsregler #email
            $("#email").rules("add", {
                required: true,
                email: true,
                minlength: 6,
                messages: {
                    required: "\nVänligen ange din e-postadress",
                    email: "\nAnge en giltig e-postadress",
                    minlength: "\nAnge en giltig e-postadress"
                }
            });   
        } else {
            $("#email").hide();
            $("#email").rules("remove");
            // Tar bort felmeddelanden och ogiltiga fält
            $("#feedbackForm").validate().errorList = [];
            $("#feedbackForm").find("#email").removeClass("error");
            $("#feedbackForm").find("label[for='email']").remove();
        }
    });
    // Eventhanterare för stäng knappen
    $("#closeBtn").on("click", function () {
        // Återställer och rensar hela formuläret
        $("#feedbackForm")[0].reset();
        // Tar bort felmeddelanden och ogiltiga fält
        $("#feedbackForm").validate().resetForm();

        // Döljer e-postfältet och dess label igen om det var synligt
        $("#email").hide();
        $("#email").rules("remove"); // Tar bort valideringsreglerna för e-postfältet
        
        // Visa förnamn och efternamn om de var dolda
        $("#firstName, #lastName").show();
    });
    // Eventhanterare för skicka knappen
    $("#feedbackForm").on("submit", function(event) {
        event.preventDefault(); // Förhindra att formuläret skickas på vanligt sätt
        // Kontrollerar om formuläret är giltigt
        if ($(this).valid()) {
            if ($("#checkbox").is(":checked")) {
               //  Om checkboxen för svar är ifylld, visar ett bekräftelsemeddelande
                alert("Tack för din feedback! Vi återkommer så snart som möjligt!"); 
            }
            else {
                // Om checkboxen för svar inte är ifylld, visar ett annat bekräftelsemeddelande
                alert("Tack för din feedback!");
            }
            // Stänger popupen efter att formuläret skickats in
            $("#feedbackWindow").popup("close");
            // Återställ formuläret efter framgångsrik inlämning
            $("#feedbackForm")[0].reset();
            $("#feedbackForm").validate().resetForm();
            $("#email").hide().rules("remove");
            $("#firstName, #lastName").show();
        }
        else {
            // Förhindrar formuläret från att skickas om det inte är giltigt
            event.preventDefault();
        }
    });

    // Sätter mönstret för validering av email
    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test( value );
      }
    // Lägger till regex-metoden till jQuery Validation Plugin
    $.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    });  
});

// Kod för #secondPage //
$(document).on("pagebeforeshow", "#secondPage", function() {
    // Kolla om "ui-page-theme-b" är satt på sidan och justera flipswitchens status samt bakgrundsfärgen för väderinformationen därefter
    if ($("#secondPage").hasClass("ui-page-theme-b")) {
        $("#flip-checkbox2").prop("checked", false).flipswitch("refresh");
        $("#weatherInfo").css("background-color", "#2C2C2C");
    } else {
        $("#flip-checkbox2").prop("checked", true).flipswitch("refresh");
        $("#weatherInfo").css("background-color", "#f0f0f0");
    }
    
    // Kod för flipswitch //
    // Skapar en eventhanterare på flipswitchen
    $("#flip-checkbox2").on("change", function() {
        // Kontrollerar om flipswitchen är på eller av
        if ($(this).is(":checked")) {
            // Ändrar till ljust tema (a)
            $("#secondPage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#weatherInfo").css("background-color", "#f0f0f0"); // Ändrar till ljus bakgrund för väderinformationen
           
            // Ändrar temat även för de andra sidorna
            $("#homePage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#aboutMe").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");

        } 
        else {
            // Ändrar till mörkt tema (b)
            $("#secondPage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#weatherInfo").css("background-color", "#2C2C2C"); // Ändrar till mörk bakgrund för väderinformationen
            
            $("#homePage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#aboutMe").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
        }
    });

    // Kod för popuprutan med feedbackformuläret jQuery Validation Plugin //
    // Aktiverar plugin
    $("#feedbackForm2").validate({
        // Regler för validering
        rules: {
            firstName2: {
                required: true, // Obligatoriskt fält
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/ // Endast bokstäver, mellanslag och bindestreck tillåtna
            },
            lastName2: {
                required: true,
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/ 
            },
            textarea2: {
                required: true,
                minlength: 10,
                maxlength: 800,
            }
        },
        // Meddelanden för validering
        messages: {
            firstName2: {
                required: "Vänligen ange ditt förnamn",
                minlength: "Förnamnet måste vara minst 2 tecken långt",
                regex: "Förnamnet får enbart innehålla bokstäver"
            },
            lastName2: {
                required: "Vänligen ange ditt efternamn",
                minlength: "Efternamnet måste vara minst 2 tecken långt",
                regex: "Efternamnet får enbart innehålla bokstäver"
            },
            textarea2: {
                required: "Vänligen ange ditt meddelande",
                minlength: "Meddelandet måste vara minst 10 tecken långt",
                maxlength: "Meddelandet får inte vara längre än 800 tecken"
            }
        },
    });
    // Eventhanterare för checkbox-2
    $("#checkbox-2").on("change", function() {
        // Om checkboxen kryssas i döljs för- och efternamnfältet.
        if ($(this).is(":checked")) {
            $("#firstName2").hide();
            $("#lastName2").hide();
            // Tar bort felmeddelanden och ogiltiga fält
            $("#feedbackForm2").validate().errorList = [];
            $("#feedbackForm2").find("#firstName2, #lastName2").removeClass("error");
            $("#feedbackForm2").find("label[for='firstName2'], label[for='lastName2']").remove();
        }
        else {
            $("#firstName2").show();
            $("#lastName2").show();
        }
    });

    // Döljer #email som standard
    $("#email2").hide();
    // När checkboxen för svar klickas, visas #email fältet
    $("#checkbox-3").on("change", function() {
        if ($(this).is(":checked")) {
            $("#email2").show();
            // Lägg till valideringsregler #email
            $("#email2").rules("add", {
                required: true,
                email: true,
                minlength: 6,
                messages: {
                    required: "\nVänligen ange din e-postadress",
                    email: "\nAnge en giltig e-postadress",
                    minlength: "\nAnge en giltig e-postadress"
                }
            });   
        } else {
            $("#email2").hide();
            $("#email2").rules("remove");
            // Tar bort felmeddelanden och ogiltiga fält
            $("#feedbackForm2").validate().errorList = [];
            $("#feedbackForm2").find("#email2").removeClass("error");
            $("#feedbackForm2").find("label[for='email2']").remove();
        }
    });
    // Eventhanterare för stäng knappen
    $("#closeBtn2").on("click", function () {
        // Återställer och rensar hela formuläret
        $("#feedbackForm2")[0].reset();
        // Tar bort felmeddelanden och ogiltiga fält
        $("#feedbackForm2").validate().resetForm();

        // Döljer e-postfältet och dess label igen om det var synligt
        $("#email2").hide();
        $("#email2").rules("remove"); // Tar bort valideringsreglerna för e-postfältet
        
        // Visa förnamn och efternamn om de var dolda
        $("#firstName2, #lastName2").show();
    });
    // Eventhanterare för skicka knappen
    $("#feedbackForm2").on("submit", function(event) {
        event.preventDefault(); // Förhindra att formuläret skickas på vanligt sätt
        // Kontrollerar om formuläret är giltigt
        if ($(this).valid()) {
            if ($("#checkbox-3").is(":checked")) {
               //  Om checkboxen för svar är ifylld, visar ett bekräftelsemeddelande
                alert("Tack för din feedback! Vi återkommer så snart som möjligt!"); 
            }
            else {
                // Om checkboxen för svar inte är ifylld, visar ett annat bekräftelsemeddelande
                alert("Tack för din feedback!");
            }
            // Stänger popupen efter att formuläret skickats in
            $("#feedbackWindow2").popup("close");
            // Återställ formuläret efter framgångsrik inlämning
            $("#feedbackForm2")[0].reset();
            $("#feedbackForm2").validate().resetForm();
            $("#email2").hide().rules("remove");
            $("#firstName2, #lastName2").show();
        }
        else {
            // Förhindrar formuläret från att skickas om det inte är giltigt
            event.preventDefault();
        }
    });

    // Sätter mönstret för validering av email
    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test( value );
      }
    // Lägger till regex-metoden till jQuery Validation Plugin
    $.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    });

    // Kod för att hämta och visa väder med hjälp av XMLHttpRequest och OpenWeatherMap API //
    // Rensa och dölj väderinformationen varje gång sidan laddas
    $("#cityName").text(""); 
    $("#temperature").text(""); 
    $("#feelsLike").text("");
    $("#description").text("");  
    $("#weatherInfo").hide();      
    $("#errorMessage").hide();     
    $("#city").val("");           

    // Skapar en eventhanterare för Hämta väder knappen
    $("#getWeather").on("click", function(event) {
        event.preventDefault();
        let city = $("#city").val().trim(); // Hämtar input och tar bort överflödiga mellanslag innan och efter strängen

        // Kollar så inputen inte är tom
        if (city !== "") {
            let apiKey = "API_NYCKEL"
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            // Använder jQuerys API för att skapa XMLHttpRequest
            $.ajax({
                url: apiUrl,
                type: "GET",
                dataType: "json",
                success: function(data) {
                    // Visar väderinformationen
                    $("#cityName").text(data.name);
                    $("#temperature").text(`${data.main.temp} °C`);
                    $("#feelsLike").text(`${data.main.feels_like} °C`);
                    $("#description").text(data.weather[0].description);
                    $("#weatherInfo").show(); // Visar väderinformationen som är dold innan genom css
                    $("#errorMessage").hide(); // Döljer eventuellt felmeddelande
                },
                // Felmeddelande
                error: function() {
                    $("#error").text("Det gick inte att hämta väderinformationen. Kontrollera att stadens namn är korrekt.");
                    $("#errorMessage").show(); // Visar felmeddelandet som är dold innan genom css
                    $("#weatherInfo").hide(); // Döljer väderinformationen om något går fel
                }
            });
        }
        // Om inte if-villkoret uppfylls
        else {
            $("#error").text("Vänligen ange en stad.");
            $("#errorMessage").show();
            $("#weatherInfo").hide(); // Döljer väderinformationen om ingen stad anges
        }
    });
});

// Kod för #aboutMe //
$(document).on("pagebeforeshow", "#aboutMe", function() {
    // Kolla om "ui-page-theme-b" är satt på sidan och justera flipswitchens status därefter
    if ($("#aboutMe").hasClass("ui-page-theme-b")) {
        $("#flip-checkbox3").prop("checked", false).flipswitch("refresh");
    } else {
        $("#flip-checkbox3").prop("checked", true).flipswitch("refresh");
    }
    
    // Kod för flipswitch //
    // Skapar en eventhanterare på flipswitchen
    $("#flip-checkbox3").on("change", function() {
        // Kontrollerar om flipswitchen är på eller av
        if ($(this).is(":checked")) {
            // Ändrar till ljust tema (a)
            $("#aboutMe").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
           
            // Ändrar temat även för de andra sidorna
            $("#homePage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#secondPage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");

        } 
        else {
            // Ändrar till mörkt tema (b)
            $("#aboutMe").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            
            $("#homePage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#secondPage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
        }
    });

    // Kod för popuprutan med feedbackformuläret jQuery Validation Plugin //
    // Aktiverar plugin
    $("#feedbackForm3").validate({
        // Regler för validering
        rules: {
            firstName3: {
                required: true, // Obligatoriskt fält
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/ // Endast bokstäver, mellanslag och bindestreck tillåtna
            },
            lastName3: {
                required: true,
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/ 
            },
            textarea3: {
                required: true,
                minlength: 10,
                maxlength: 800,
            }
        },
        // Meddelanden för validering
        messages: {
            firstName3: {
                required: "Vänligen ange ditt förnamn",
                minlength: "Förnamnet måste vara minst 2 tecken långt",
                regex: "Förnamnet får enbart innehålla bokstäver"
            },
            lastName3: {
                required: "Vänligen ange ditt efternamn",
                minlength: "Efternamnet måste vara minst 2 tecken långt",
                regex: "Efternamnet får enbart innehålla bokstäver"
            },
            textarea3: {
                required: "Vänligen ange ditt meddelande",
                minlength: "Meddelandet måste vara minst 10 tecken långt",
                maxlength: "Meddelandet får inte vara längre än 800 tecken"
            }
        },
    });
    // Eventhanterare för checkbox-4
    $("#checkbox-4").on("change", function() {
        // Om checkboxen kryssas i döljs för- och efternamnfältet.
        if ($(this).is(":checked")) {
            $("#firstName3").hide();
            $("#lastName3").hide();
            // Tar bort felmeddelanden och ogiltiga fält
            $("#feedbackForm3").validate().errorList = [];
            $("#feedbackForm3").find("#firstName3, #lastName3").removeClass("error");
            $("#feedbackForm3").find("label[for='firstName3'], label[for='lastName3']").remove();
        }
        else {
            $("#firstName3").show();
            $("#lastName3").show();
        }
    });

    // Döljer #email som standard
    $("#email3").hide();
    // När checkboxen för svar klickas, visas #email fältet
    $("#checkbox-5").on("change", function() {
        if ($(this).is(":checked")) {
            $("#email3").show();
            // Lägg till valideringsregler #email
            $("#email3").rules("add", {
                required: true,
                email: true,
                minlength: 6,
                messages: {
                    required: "\nVänligen ange din e-postadress",
                    email: "\nAnge en giltig e-postadress",
                    minlength: "\nAnge en giltig e-postadress"
                }
            });   
        } else {
            $("#email3").hide();
            $("#email3").rules("remove");
            // Tar bort felmeddelanden och ogiltiga fält
            $("#feedbackForm3").validate().errorList = [];
            $("#feedbackForm3").find("#email3").removeClass("error");
            $("#feedbackForm3").find("label[for='email3']").remove();
        }
    });
    // Eventhanterare för stäng knappen
    $("#closeBtn3").on("click", function () {
        // Återställer och rensar hela formuläret
        $("#feedbackForm3")[0].reset();
        // Tar bort felmeddelanden och ogiltiga fält
        $("#feedbackForm3").validate().resetForm();

        // Döljer e-postfältet och dess label igen om det var synligt
        $("#email3").hide();
        $("#email3").rules("remove"); // Tar bort valideringsreglerna för e-postfältet
        
        // Visa förnamn och efternamn om de var dolda
        $("#firstName3, #lastName3").show();
    });
    // Eventhanterare för skicka knappen
    $("#feedbackForm3").on("submit", function(event) {
        event.preventDefault(); // Förhindra att formuläret skickas på vanligt sätt
        // Kontrollerar om formuläret är giltigt
        if ($(this).valid()) {
            if ($("#checkbox-5").is(":checked")) {
               //  Om checkboxen för svar är ifylld, visar ett bekräftelsemeddelande
                alert("Tack för din feedback! Vi återkommer så snart som möjligt!"); 
            }
            else {
                // Om checkboxen för svar inte är ifylld, visar ett annat bekräftelsemeddelande
                alert("Tack för din feedback!");
            }
            // Stänger popupen efter att formuläret skickats in
            $("#feedbackWindow3").popup("close");
            // Återställ formuläret efter framgångsrik inlämning
            $("#feedbackForm3")[0].reset();
            $("#feedbackForm3").validate().resetForm();
            $("#email3").hide().rules("remove");
            $("#firstName3, #lastName3").show();
        }
        else {
            // Förhindrar formuläret från att skickas om det inte är giltigt
            event.preventDefault();
        }
    });

    // Sätter mönstret för validering av email
    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test( value );
      }
    // Lägger till regex-metoden till jQuery Validation Plugin
    $.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    });

    // Kod för uppladdning av CV och personligt brev //
    // Skapar eventhanterare för cvUpload
    $("#cvUpload").on("change", function(event) {
        var file = event.target.files[0]; // Hämtar den uppladdade filen

        // Kontrollera om det är en pdf
        if (file && file.type === "application/pdf") {
            var fileReader = new FileReader();

            // Läser in filen som en data-URL
            fileReader.onload = function(e) {
                var pdfData = e.target.result;
                // Sätter PDF-data som källan för iframe
                $("#cvIframe").attr("src", pdfData);
                // Visar förhandsvisningsrutan
                $("#cvPreview").show();
            };
            // Läser in PDF-filen
            fileReader.readAsDataURL(file);
        }
        else {
            alert("Vänligen ladda upp en PDF-fil.")
        }
    });
    $("#resumeUpload").on("change", function(event) {
        var file = event.target.files[0]; // Hämtar den uppladdade filen

        // Kontrollera om det är en pdf
        if (file && file.type === "application/pdf") {
            var fileReader = new FileReader();

            // Läser in filen som en data-URL
            fileReader.onload = function(e) {
                var pdfData = e.target.result;
                // Sätter PDF-data som källan för iframe
                $("#resumeIframe").attr("src", pdfData);
                // Visar förhandsvisningsrutan
                $("#resumePreview").show();
            };
            // Läser in PDF-filen
            fileReader.readAsDataURL(file);
        }
        else {
            alert("Vänligen ladda upp en PDF-fil.")
        }
    });
});
