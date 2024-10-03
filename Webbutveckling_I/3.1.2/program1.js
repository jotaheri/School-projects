// Alert, confirm och prompt
alert("Hello World!");

let cnfrm = confirm("Vill du fortsätta?");

// Lägg in resultatet från cnfrm i en if sats, om True går vidare till prompt annars gå till else
if (cnfrm) {
    let name = prompt("Vad heter du?");
    alert(`Hej ${name}`);
} else {
    alert("Du valde att inte fortsätta.");
}
