// Array
// Skapa en array med några tal
let numbers = [5, 12, 8, 130, 44];

// Lägg till ett tal i arrayen och skriv ut arrayen
numbers.push(70);
console.log(numbers);

// Ta bort sista talet med .pop och skriv ut arrayen
numbers.pop();
console.log(numbers);

// Sortera i stigande ordning
numbers.sort((a, b) => a - b);
console.log(numbers);
// Sortera i fallande ordning
numbers.sort((b, a) => a - b);
console.log(numbers);

// Boolean
// Kontrollera om ett tal finns i arrayen
let checkNumber = numbers.includes(130);
console.log("Finns talet '130' i arrayen?:", checkNumber);

// Date
// Skapa ett Date-objet med dagens datum
let currentDate = new Date();
console.log("Dagens datum:", currentDate);

// Math
// Generera ett random tal mellan 1 och 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Slumpmässigt tal mellan 1-100: ${randomNumber}`);

// Räkna ut kvadratroten från första talet i arrayen
let sqroot = Math.sqrt(numbers[0]);
console.log(`Kvadratroten av ${numbers[0]} är ${sqroot}`);
