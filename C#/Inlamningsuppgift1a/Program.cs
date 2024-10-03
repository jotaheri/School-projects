// Inlämningsuppgift 1A Console Application
// Johannes Taheri, se ytterligare information i readme.txt

using System;
using System.Text;

class Program
{
    static void Main()
    {

        // Arrayer för valörer
        int[] bills = { 500, 200, 100, 50, 20 };
        int[] coins = { 10, 5, 1 };

        // Användaren ombeds mata in pris
        Console.Write("Ange priset: ");
        string? priceInput = Console.ReadLine();

        // Kontrollera om inmatningen är korrekt och större än 0
        if (int.TryParse(priceInput, out int price) && price > 0)
        {
            // Användaren ombeds mata in belopp
            Console.Write("Betalt: ");
            string? paymentInput = Console.ReadLine();

            if (int.TryParse(paymentInput, out int payment))
            {
                //  Kontrollera så betalningen är mer än priset
                if (payment > price)
                {
                    // Beräkna växel
                    int change = payment - price;
                    Console.WriteLine($"Växel:");

                    // Loop som går igenom varje valör i arrayen "bills" och beräknar
                    // hur många sedlar av varje valör som behövs för att täcka växelbeloppet.
                    // Om några sedlar av den aktuella valören behövs, skrivs resultatet ut
                    // och växelbeloppet minskas med värdet av de utdelade sedlarna.
                    foreach (int bill in bills)
                    {
                        int numofBills = change / bill;
                        if (numofBills > 0)
                        {
                            Console.WriteLine($"{numofBills} st {bill}-lappar");
                            change -= numofBills * bill;
                        }
                    }

                    // Likadan loop som går igenom arrayen "coins"
                    foreach (int coin in coins)
                    {
                        int numofCoins = change / coin;
                        if (numofCoins > 0)
                        {
                            Console.WriteLine($"{numofCoins} st {coin}-kronor");
                            change -= numofCoins * coin;
                        }
                    }

                    Console.WriteLine($"Totalt {payment-price}kr");
                }
                else if (payment < price)
                {
                    // Om användaren har betalat för lite
                    Console.WriteLine($"Betalning otillräcklig. Pris: {price}kr, betalat: {payment}kr.");
                }
                else if (payment == price)
                {
                    // Om användaren betalat exakta summan
                    Console.WriteLine($"Pris: {price}, betalat: {payment}. Ingen växel behövs.");
                }
            }
            else
            {
                Console.WriteLine("Ogiltig betalning."); // Felmeddelande vid ogiltig input av betalning
            }
        }
        else
        {
            Console.WriteLine("Ogiltigt pris."); // Felmeddelande vid ogiltig input av pris
        }
    }
}

