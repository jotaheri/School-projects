// Inlämningsuppgift 2 Console Application
// Johannes Taheri, se ytterligare information i readme.txt


using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.IO;
using System.Runtime.CompilerServices;

class Program 
{
    static void Main(String[] args)
    {

        // Säkerställer att både in och utmatning använder samma teckenkodning, detta löser problem med "å", "ä" och "ö".
        Console.InputEncoding = Encoding.Unicode;
        Console.OutputEncoding = Encoding.Unicode;

        // Börja med att fråga hur många säljare som ska registreras
        Console.Write("Hur många säljare vill du registrera? ");
        string? numofSellersInput = Console.ReadLine(); // Nullable sträng för att kontrollera null värden
        int numofSellers;

        while (!int.TryParse(numofSellersInput, out numofSellers)) // Loop som kontrollerar att input kan konverteras till heltal med TryParse
        {
            Console.WriteLine("Felaktig inmatning. Ange ett giltigt heltal.");
            numofSellersInput = Console.ReadLine();
        }

        // Skapa en lista som kan lagra flera säljare, där varje säljare är representerad av ett objekt av klassen Sellers
        List<Sellers> sellersList = new List<Sellers>();

        // Loop för att samla in data om våra säljare
        // loopen går så många gånger som användaren som användaren matat in
        for (int i = 0; i < numofSellers; i++)
        {
            Console.WriteLine($"Mata in uppgifter för säljare {i + 1}:");

            //Mata in namn och kontrollera null
            Console.Write("Namn: ");
            string? name = Console.ReadLine();
            while (string.IsNullOrEmpty(name)) // Loop som upprepar frågan tills giltig input getts dvs att input inte är null eller tom
            {
                Console.WriteLine("Namn kan inte vara tomt. Ange ett giltigt namn.");
                name = Console.ReadLine();  
            }

            //Mata in personnummer och kontrollera null
            Console.Write("Personnummer: ");
            string? snr = Console.ReadLine();
            while (string.IsNullOrEmpty(snr))
            {
                Console.WriteLine("Personnummer kan inte vara tomt. Ange ett giltigt personnummer.");
                snr = Console.ReadLine();
            }
            
            //Mata in distrikt och kontrollera null
            Console.Write("Distrikt: ");
            string? district = Console.ReadLine();
            while (string.IsNullOrEmpty(district))
            {
                Console.WriteLine("Distrikt kan inte vara tomt. Ange ett giltigt distrikt.");
                district = Console.ReadLine();
            }

            //Mata in antal sålda artiklar och använd TryParse för att kontrollera att input kan konverteras till heltal
            Console.Write("Antal sålda artiklar: ");
            string? numofArticlesInput = Console.ReadLine();
            int numofArticles;

            while (!int.TryParse(numofArticlesInput, out numofArticles))
            {
                Console.WriteLine("Felaktig inmatning. Ange ett giltigt heltal för antal sålda artiklar.");
                numofArticlesInput = Console.ReadLine();
            }

            // Skapar ett nytt objekt enligt klassen Sellers och lägger till i listan
            // "!" läggs till för att indikera för kompilatorn att vi är säkra på variablerna 
            // inte är null när de används
            sellersList.Add(new Sellers(name!, snr!, district!, numofArticles));
        }

        // Sortera säljarna efter antal sålda artiklar i stigande ordning
        sellersList.Sort((x, y) => x.NumofArticles.CompareTo(y.NumofArticles));
        
        //Skapa formaterad rubrik för utskrift
        string header = string.Format("\n{0,-12} {1,-12} {2,-12} {3,0}", "Namn", "Persnr", "Distrikt", "Antal");
        Console.WriteLine(header);

        // Skapa en StreamWriter för att skriva resultatet till en fil
        using (StreamWriter writer = new StreamWriter("säljarstatistik.txt"))
        {
            writer.WriteLine(header);

            // Skapa variabler för varje bonusnivå
            int lvl1 = 0, lvl2 = 0, lvl3 = 0, lvl4 = 0;

            // Räkna ut och säljarna och sammanfattningen för varje nivå
            // Nivå 1: under 50 artiklar
            foreach (var seller in sellersList)
            {
                if (seller.NumofArticles < 50)
                {
                    // Skapa en formaterad sträng för utskrift
                    string line = string.Format("{0,-12} {1,-12} {2,-12} {3,0}st", seller.Name, seller.Snr, seller.District, seller.NumofArticles);
                    Console.WriteLine(line);
                    writer.WriteLine(line);
                    lvl1++;
                }
            }
            if (lvl1 >= 0)
            {
                Console.WriteLine($"{lvl1} säljare har nått nivå 1: under 50 artiklar\n");
                writer.WriteLine($"{lvl1} säljare har nått nivå 1: under 50 artiklar\n");    
            }

            // Nivå 2: 50-99 artiklar
            foreach (var seller in sellersList)
            {
                if (seller.NumofArticles >= 50 && seller.NumofArticles < 100)
                {
                    string line = string.Format("{0,-12} {1,-12} {2,-12} {3,0}st", seller.Name, seller.Snr, seller.District, seller.NumofArticles);
                    Console.WriteLine(line);
                    writer.WriteLine(line);
                    lvl2++;  
                }
            }
            if (lvl2 >= 0)
            {
                Console.WriteLine($"{lvl2} säljare har nått nivå 2: 50-99 artiklar\n");
                writer.WriteLine($"{lvl2} säljare har nått nivå 2: 50-99 artiklar\n");   
            }

            // Nivå 3: 100-199 artiklar
            foreach (var seller in sellersList)
            {
                if (seller.NumofArticles >= 100 && seller.NumofArticles < 200)
                {
                    string line = string.Format("{0,-12} {1,-12} {2,-12} {3,0}st", seller.Name, seller.Snr, seller.District, seller.NumofArticles);
                    Console.WriteLine(line);
                    writer.WriteLine(line);
                    lvl3++;  
                }
            }
            if (lvl3 >= 0)
            {
                Console.WriteLine($"{lvl3} säljare har nått nivå 3: 100-199 artiklar\n");
                writer.WriteLine($"{lvl3} säljare har nått nivå 3: 100-199 artiklar\n");   
            }

            // Nivå 4: över 199 artiklar
            foreach (var seller in sellersList)
            {
                if (seller.NumofArticles >= 200)
                {
                    string line = string.Format("{0,-12} {1,-12} {2,-12} {3,0}st", seller.Name, seller.Snr, seller.District, seller.NumofArticles);
                    Console.WriteLine(line);
                    writer.WriteLine(line);
                    lvl4++;  
                }
            }
            if (lvl4 >= 0)
            {
                Console.WriteLine($"{lvl4} säljare har nått nivå 4: över 199 artiklar");
                writer.WriteLine($"{lvl4} säljare har nått nivå 4: över 199 artiklar");   
            }          
        }
        
        Console.WriteLine("\nResultatet har skrivits till filen 'säljarstatistik.txt'.");

    }

}

// Klass för att representera en säljare
class Sellers
{
    public string Name { get; set; }
    public string Snr { get; set; }
    public string District { get; set; }
    public int NumofArticles { get; set; }

    public Sellers(string name, string snr, string district, int numofArticles)
    {
        Name = name;
        Snr = snr;
        District = district;
        NumofArticles = numofArticles;
    }
}