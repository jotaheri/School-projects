using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string SSNR { get; set; }

    // Konstruktor
    public Person(string firstName, string lastName, string ssnr)
    {
        FirstName = firstName;
        LastName = lastName;
        SSNR = ssnr;
    }

    // Metod för att validera personnummer enligt 21-algoritmen
    public bool ValidatePersonalNumber()
    {
        // Börja med att rensa bort bindestreck och eventuella andra tecken
        string ssn = SSNR.Replace("-", "").Replace(" ", "");
        
        // Sedan kontrollera så personnumret består av 10 siffror
        // och att det kan konverteras till heltal "_" är för att vi inte
        // bryr oss om variabeln utan vi vill bara kontrollera att input är giltigt
        if (ssn.Length != 10 || !long.TryParse(ssn, out _))
        {
            return false;
        }

        int totalSum = 0;

        // Gå igenom varje siffra och multiplicera växelvis med 2 och 1
        for (int i = 0; i < ssn.Length; i++)
        {
            int currentDigit = int.Parse(ssn[i].ToString());

            // Kollar om index är jämt delbart med 2 isåfall multipliceras talet med 2
            if (i % 2 == 0)
            {
                currentDigit *= 2;

                // Om produkten är tvåsiffrig, summeras dessa siffror
                if (currentDigit > 9)
                {
                    currentDigit -= 9; //Dra av 9 för att få summan. exempelvis 13-9=4, 1+3=4
                }
            }

            // Lägg till värdet i totalsumman
            totalSum += currentDigit;
        }
        
        // Returnera True om totalsumman är jämt delbar med 10
        return totalSum % 10 == 0;
    }

    // Metod för att avgöra kön baserat på personnumret
    public string GetGender()
    {
        // Börja med att rensa bort bindestreck och eventuella andra tecken
        string ssn = SSNR.Replace("-", "").Replace(" ", "");

        // Sedan kontrollera så personnumret består av 10 siffror och är giltigt heltal
        if (ssn.Length != 10 || !long.TryParse(ssn, out _))
        {
            return "Ogiltigt personnummer";
        }

        // Hämta den näst sista siffran i personnumret
        // (index 8 eftersom indexering börjar på 0)
        int genderDigit = int.Parse(ssn[8].ToString());

        // Udda siffra = man, jämn siffra = kvinna
        if (genderDigit % 2 == 0)
        {
            return "Kvinna";
        }
        else
        {
            return "Man";
        }
    }
}
