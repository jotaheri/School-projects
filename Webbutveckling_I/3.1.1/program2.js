// Number
// Konvertera en sträng till ett decimaltal, 
// avrunda till heltal och kontrollera om värdet är ett heltal
let strNumber = "123.45";
let convNumber = Number(strNumber);
console.log(`Konverterade sträng: ${strNumber} till tal: ${convNumber}`);

let roundNumber = Math.round(convNumber);
console.log(`Avrundade ${convNumber} till ${roundNumber}`)

let isNumber = Number.isInteger(roundNumber);
console.log(`Är ${roundNumber} ett heltal?: ${isNumber}`);


// String
let sentence = "Det här är en sträng";

// Byt ut ett ord i strängen
let newSentence = sentence.replace("en", "1");
console.log(newSentence);

// Gör alla bokstäver till versaler
let upper = newSentence.toUpperCase();
console.log(upper);

// Dela upp strängen i en array
let wordArray = upper.split(" ");
console.log(wordArray);

// RegExp
// Skapa ett reguljärt uttryck för att validera en emailadress
let email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let validEmail = "example@mail.com"
let invalidEmail = "fel-mail@.com"

// Testa om emailadresserna är giltiga
let isValid = email.test(validEmail);
console.log(isValid);
isValid = email.test(invalidEmail);
console.log(isValid);