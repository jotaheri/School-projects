// Skapar eventhanterare för postButton
$("#getButton").on("click", function() {
    // Hämtar användarens nummer
    let num1 = $("#number1").val();
    let num2 = $("#number2").val();

    // Gör en GET-förfrågan med jQuerys ajax-metod
    $.ajax({
        url: `https://people.dsv.su.se/~pierre/i/05_ass/ip3/3/3.4/3.4.3/example.php?number1=${num1}&number2=${num2}`,
        type: "GET",
        success: function(data) {
            // Sätter in serverns svar i infoArea
            $("#infoArea").html(`Resultat: ${data}`);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Hanterar fel om förfrågan misslyckas
            $("#infoArea").html(`Ett fel uppstod: ${textStatus}`)
        }
    });
});