// Kod för #homePage //
// Väntar tills sidan laddas och jQuery Mobile är klart
// Skapar eventhanterare och hanterar temaförändringar, formulärvalidering och visuell uppdatering av flipswitch
$(document).on("pagebeforeshow", "#homePage", function() {

    // Kollar om "ui-page-theme-b" är satt på sidan och justera flipswitchens status därefter
    // Detta används för att säkerställa att flipswitchens status stämmer överens med temat på sidan 
    if ($("#homePage").hasClass("ui-page-theme-b")) {
        // Om det är mörkt tema, ställer in flipswitchen som "off"
        $("#flip-checkbox").prop("checked", false).flipswitch("refresh");
    } else {
        // Om det är ljust tema, ställer in flipswitchen som "on"
        $("#flip-checkbox").prop("checked", true).flipswitch("refresh");
    }    

    // Hanterar temabyte på alla sidor baserat på flipswitch-status
    $("#flip-checkbox").on("change", function() {
        // Kontrollerar om flipswitchen är på (ljust tema)
        if ($(this).is(":checked")) {
            // Ändrar temat till ljust (a) på alla sidor
            $("#homePage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#secondPage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#aboutMe").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");

        } 
        else {
            // Ändrar temat till mörkt (b) på alla sidor
            $("#homePage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#secondPage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#aboutMe").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
        }
    });

    // Aktiverar formulärvalidering med jQuery Validation Plugin för feedbackformuläret
    // Valideringsregler för förnamn, efternamn och meddelande, med anpassade felmeddelanden
    $("#feedbackForm").validate({
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
        // Anpassade felmeddelanden för valideringsreglerna
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
    // Hanterar anonymitetsvalet genom att dölja för- och efternamn
    // Om checkboxen är ikryssad döljs dessa fält och eventuella felmeddelanden tas bort
    $("#checkbox-1").on("change", function() {
        if ($(this).is(":checked")) {
            $("#firstName").hide();
            $("#lastName").hide();
            // Rensar valideringsfel från för- och efternamn fälten
            $("#feedbackForm").validate().errorList = [];
            $("#feedbackForm").find("#firstName, #lastName").removeClass("error");
            $("#feedbackForm").find("label[for='firstName'], label[for='lastName']").remove();
        }
        else {
            // Om checkboxen inte är ikryssad visas för- och efternamn igen
            $("#firstName").show();
            $("#lastName").show();
        }
    });

    // Döljer email-fältet som standard
    // Visar e-postfältet när checkboxen "Önskar få svar" är ikryssad, och lägger till validering för e-post
    $("#email").hide();
    $("#checkbox").on("change", function() {
        if ($(this).is(":checked")) {
            $("#email").show();
            // Lägger till valideringsregler för e-postfältet
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
            // Om checkboxen avmarkeras döljs e-postfältet och valideringsregler tas bort
            $("#email").hide();
            $("#email").rules("remove")
            $("#feedbackForm").validate().errorList = [];
            $("#feedbackForm").find("#email").removeClass("error");
            $("#feedbackForm").find("label[for='email']").remove();
        }
    });
    // Eventhanterare för att stänga popup och återställa formuläret
    // Rensar formuläret och tar bort valideringsfel när användaren klickar på "Stäng"
    $("#closeBtn").on("click", function () {
        $("#feedbackForm")[0].reset();
        $("#feedbackForm").validate().resetForm();
        $("#email").hide(); // Döljer e-postfältet och dess label igen om det var synligt
        $("#email").rules("remove"); // Tar bort valideringsreglerna för e-postfältet
        $("#firstName, #lastName").show(); // Visar förnamn och efternamn om de var dolda
    });
    // Eventhanterare för att skicka formuläret
    // Om formuläret är giltigt, visar ett bekräftelsemeddelande och stänger popupen
    $("#feedbackForm").on("submit", function(event) {
        event.preventDefault(); // Förhindra att formuläret skickas normalt
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

    // Anpassar validering av e-post för att endast tillåta giltiga e-postadresser
    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test( value );
      }
    // Lägger till anpassad regex-metod till jQuery Validation Plugin
    $.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    });  
});

// Kod för #secondPage //
// De flesta av metoderna här är likadana som i #homePage och #aboutMe så jag har valt att enbart kommentera
// metoder som är unika för #secondPage
$(document).on("pagebeforeshow", "#secondPage", function() {
    // Kollar om "ui-page-theme-b" är satt på sidan (som i #homePage och #aboutMe) men här används det även för 
    // att säkerställa att bakgrundsfärgen för väderinformationen stämmer överens med temat på sidan 
    if ($("#secondPage").hasClass("ui-page-theme-b")) {
        $("#flip-checkbox2").prop("checked", false).flipswitch("refresh");
        $("#weatherInfo").css("background-color", "#2C2C2C");
    } else {
        $("#flip-checkbox2").prop("checked", true).flipswitch("refresh");
        $("#weatherInfo").css("background-color", "#f0f0f0");
    }
    
    $("#flip-checkbox2").on("change", function() {
        if ($(this).is(":checked")) {
            $("#secondPage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#weatherInfo").css("background-color", "#f0f0f0"); // Ändrar till ljus bakgrund för väderinformationen
            $("#homePage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#aboutMe").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");

        } 
        else {
            $("#secondPage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#weatherInfo").css("background-color", "#2C2C2C"); // Ändrar till mörk bakgrund för väderinformationen
            $("#homePage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#aboutMe").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
        }
    });
    
    // Kod för feedbackformuläret med jQuery Validation Plugin (samma som för #homePage och #aboutMe)
    $("#feedbackForm2").validate({
        rules: {
            firstName2: {
                required: true,
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/
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
    $("#checkbox-2").on("change", function() {
        if ($(this).is(":checked")) {
            $("#firstName2").hide();
            $("#lastName2").hide();
            $("#feedbackForm2").validate().errorList = [];
            $("#feedbackForm2").find("#firstName2, #lastName2").removeClass("error");
            $("#feedbackForm2").find("label[for='firstName2'], label[for='lastName2']").remove();
        }
        else {
            $("#firstName2").show();
            $("#lastName2").show();
        }
    });

    $("#email2").hide();
    $("#checkbox-3").on("change", function() {
        if ($(this).is(":checked")) {
            $("#email2").show();
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
            $("#feedbackForm2").validate().errorList = [];
            $("#feedbackForm2").find("#email2").removeClass("error");
            $("#feedbackForm2").find("label[for='email2']").remove();
        }
    });

    $("#closeBtn2").on("click", function () {
        $("#feedbackForm2")[0].reset();
        $("#feedbackForm2").validate().resetForm();
        $("#email2").hide();
        $("#email2").rules("remove");
        $("#firstName2, #lastName2").show();
    });

    $("#feedbackForm2").on("submit", function(event) {
        event.preventDefault(); 
        if ($(this).valid()) {
            if ($("#checkbox-3").is(":checked")) {
                alert("Tack för din feedback! Vi återkommer så snart som möjligt!"); 
            }
            else {
                alert("Tack för din feedback!");
            }
            $("#feedbackWindow2").popup("close");
            $("#feedbackForm2")[0].reset();
            $("#feedbackForm2").validate().resetForm();
            $("#email2").hide().rules("remove");
            $("#firstName2, #lastName2").show();
        }
        else {
            event.preventDefault();
        }
    });

    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test( value );
      }

    $.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    });

    // Kod för att hämta och visa väder med hjälp av XMLHttpRequest och OpenWeatherMap API 
    // Rensar och döljer väderinformationen varje gång sidan laddas
    $("#cityName").text(""); 
    $("#temperature").text(""); 
    $("#feelsLike").text("");
    $("#description").text("");  
    $("#weatherInfo").hide();      
    $("#errorMessage").hide();     
    $("#city").val("");           

    // Skapar en eventhanterare för "Hämta väder"-knappen
    $("#getWeather").on("click", function(event) {
        event.preventDefault(); // Förhindrar att sidan laddas om när formuläret skickas, så att väderinformationen kan hämtas och visas utan att sidan uppdateras.
        let city = $("#city").val().trim(); // Hämtar input och tar bort överflödiga mellanslag före och efter strängen

        // Kontrollerar så inputen inte är tom
        if (city !== "") {
            let apiKey = "ENTER_API_KEY_HERE" // Api-nyckeln från OpenWeatherMap
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // API-länken för att hämta väderdata baserat på stadens namn och API-nyckeln

            // Använder jQuerys $.ajax-metod för att göra en GET-förfrågan till OpenWeatherMap API och hämta väderdata
            $.ajax({
                url: apiUrl,
                type: "GET",
                dataType: "json",
                // När API-förfrågan lyckas, visar väderinformationen som hämtats från API-svaret
                success: function(data) {
                    $("#cityName").text(data.name); //
                    $("#temperature").text(`${data.main.temp} °C`); 
                    $("#feelsLike").text(`${data.main.feels_like} °C`);
                    $("#description").text(data.weather[0].description);
                    $("#weatherInfo").show(); // Visar väderinformationen på skärmen som tidigare var dold genom genom css
                    $("#errorMessage").hide(); // Döljer eventuella felmeddelanden om API-förfrågan var lyckad
                },
                 // Om något går fel med API-förfrågan visas ett felmeddelande och väderinformationen döljs
                error: function() {
                    $("#error").text("Det gick inte att hämta väderinformationen. Kontrollera att stadens namn är korrekt.");
                    $("#errorMessage").show();
                    $("#weatherInfo").hide(); 
                }
            });
        }
        // Om ingen stad har angetts, visar ett felmeddelande och döljer väderinformationen
        else {
            $("#error").text("Vänligen ange en stad.");
            $("#errorMessage").show();
            $("#weatherInfo").hide();
        }
    });
});

// Kod för #aboutMe //
// De flesta av metoderna här är likadana som i #homePage och #secondPage så jag har valt att enbart kommentera
// metoder som är unika för #aboutMe
$(document).on("pagebeforeshow", "#aboutMe", function() {
    if ($("#aboutMe").hasClass("ui-page-theme-b")) {
        $("#flip-checkbox3").prop("checked", false).flipswitch("refresh");
    } else {
        $("#flip-checkbox3").prop("checked", true).flipswitch("refresh");
    }
    
    $("#flip-checkbox3").on("change", function() {
        if ($(this).is(":checked")) {
            $("#aboutMe").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#homePage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");
            $("#secondPage").removeClass("ui-page-theme-b").addClass("ui-page-theme-a");

        } 
        else {
            $("#aboutMe").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#homePage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
            $("#secondPage").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
        }
    });

    // Kod för feedbackformuläret med jQuery Validation Plugin (samma som för #homePage och #secondPage)
    $("#feedbackForm3").validate({
        rules: {
            firstName3: {
                required: true,
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/
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
    $("#checkbox-4").on("change", function() {
        if ($(this).is(":checked")) {
            $("#firstName3").hide();
            $("#lastName3").hide();
            $("#feedbackForm3").validate().errorList = [];
            $("#feedbackForm3").find("#firstName3, #lastName3").removeClass("error");
            $("#feedbackForm3").find("label[for='firstName3'], label[for='lastName3']").remove();
        }
        else {
            $("#firstName3").show();
            $("#lastName3").show();
        }
    });

    $("#email3").hide();
    $("#checkbox-5").on("change", function() {
        if ($(this).is(":checked")) {
            $("#email3").show();
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
            $("#feedbackForm3").validate().errorList = [];
            $("#feedbackForm3").find("#email3").removeClass("error");
            $("#feedbackForm3").find("label[for='email3']").remove();
        }
    });
    $("#closeBtn3").on("click", function () {
        $("#feedbackForm3")[0].reset();
        $("#feedbackForm3").validate().resetForm();
        $("#email3").hide();
        $("#email3").rules("remove");
        $("#firstName3, #lastName3").show();
    });
    
    $("#feedbackForm3").on("submit", function(event) {
        event.preventDefault();
        if ($(this).valid()) {
            if ($("#checkbox-5").is(":checked")) {
                alert("Tack för din feedback! Vi återkommer så snart som möjligt!"); 
            }
            else {
                alert("Tack för din feedback!");
            }
            $("#feedbackWindow3").popup("close");
            $("#feedbackForm3")[0].reset();
            $("#feedbackForm3").validate().resetForm();
            $("#email3").hide().rules("remove");
            $("#firstName3, #lastName3").show();
        }
        else {
            event.preventDefault();
        }
    });

    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test( value );
      }
    $.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    });

    // Kod för uppladdning av CV och personligt brev
    // Eventhanterare för uppladdning av CV (cvUpload)
    $("#cvUpload").on("change", function(event) {
        var file = event.target.files[0]; // Hämtar den uppladdade filen

        // Kontrollerar om den uppladdade filen är av typen PDF
        if (file && file.type === "application/pdf") {
            var fileReader = new FileReader();

            // När filen har laddats in via FileReader, omvandlas filen till en data-URL som används för att visa PDF:en direkt i en iframe.
            // Förhandsvisningsrutan, som tidigare var dold via CSS, visas när filen är laddad.
            fileReader.onload = function(e) {
                var pdfData = e.target.result;
                $("#cvIframe").attr("src", pdfData);
                $("#cvPreview").show();
            };
            fileReader.readAsDataURL(file);
        }
        else {
            // Visar ett felmeddelande om filen inte är en PDF
            alert("Vänligen ladda upp en PDF-fil.")
        }
    });
    // Eventhanterare för uppladdning av personligt brev (samma som för cvUpload)
    $("#resumeUpload").on("change", function(event) {
        var file = event.target.files[0];

        if (file && file.type === "application/pdf") {
            var fileReader = new FileReader();

            fileReader.onload = function(e) {
                var pdfData = e.target.result;
                $("#resumeIframe").attr("src", pdfData);
                $("#resumePreview").show();
            };
            fileReader.readAsDataURL(file);
        }
        else {
            alert("Vänligen ladda upp en PDF-fil.")
        }
    });
});
