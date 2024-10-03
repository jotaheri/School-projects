$(document).ready(function () {
    $("#myForm").on("submit", function (event) {
        // Kontrollera om formuläret är giltigt
        if ($(this).valid()) {
            // Om det är giltigt, visar ett bekräftelsemeddelande
            alert("Formuläret skickades in framgångsrikt.");
        } else {
            // Förhindrar formuläret från att skickas om det inte är giltigt
            event.preventDefault();
            alert("Vänligen fyll i alla obligatoriska fält korrekt.");
        }
    });

    // Döljer #email samt label som standard
    $("#email").hide();
    $("label[for='email']").hide(); // Dölj etiketten för e-postfältet
    
    // När checkboxen #newsletter klickas, visas #email fältet
    $("#newsletter").on("change", function () {
        if ($(this).is(":checked")) {
            $("#email").show();
            $("label[for='email']").show(); // Visa etiketten för e-postfältet
        
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
            $("label[for='email']").hide(); // Dölj etiketten för e-postfältet
        }
    });

    // Aktiverar jQuery Validation plugin
    $("#myForm").validate({
        // Regler för validering
        rules: {
            firstName: {
                required: true, // Obligatoriskt fält
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/ // Endast bokstäver, mellanslag och bindestreck tillåtna
            },
            lastName: {
                required: true, // Obligatoriskt fält
                minlength: 2,
                regex: /^[a-zA-ZåäöÅÄÖ\s\-]+$/ // Endast bokstäver, mellanslag och bindestreck tillåtna
            },
            gender: {
                required: true
            }
        },
        // Meddelanden för validering
        messages: {
            firstName: {
                required: "\nVänligen ange ditt förnamn",
                minlength: "\nFörnamnet måste vara minst 2 tecken långt",
                regex: "\nFörnamnet får enbart innehålla bokstäver"
            },
            lastName: {
                required: "\nVänligen ange ditt efternamn",
                minlength: "\nEfternamnet måste vara minst 2 tecken långt",
                regex: "\nEfternamnet får enbart innehålla bokstäver"
            },
            gender: {
                required: "\nVänligen välj ditt kön"
            }
        },
        // Dynamisk färgändring med highlight och unhighlight
        highlight: function (element) {
            $(element).removeClass("valid-field").addClass("error-field"); // Lägger till röd färg för felaktiga fält
        },
        unhighlight: function (element) {
            $(element).removeClass("error-field").addClass("valid-field"); // Lägger till grön färg för korrekta fält
        },
        // Placerar felmeddelandet på rätt plats för "Kön" fieldsetet
        errorPlacement: function (error, element) {
            if (element.attr("name") === "gender") {
                error.insertAfter($("label[for='other']")); // Placera felmeddelandet efter labeln för "Annat"
            } else {
                error.insertAfter(element); // Standardplacering för andra fält
            }
        },
        // Validerar fälten när användaren skriver
        onkeyup: function (element) {
            $(element).valid(); // Validera fältet medan användaren skriver
        },
        onfocusout: function (element) {
            $(element).valid(); // Validera fältet när användaren lämnar det
        }
    });

    // Sätter fokus på första fältet vid sidans laddning
    $("#firstName").focus();

    // Sätter mönstret för validering av email
    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
      }

    // Lägger till regex-metoden till jQuery Validation Plugin
    $.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    });
});