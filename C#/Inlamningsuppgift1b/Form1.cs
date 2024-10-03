// Inlämningsuppgift 1B Windows Forms Application
// Johannes Taheri, se ytterligare information i readme.txt

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.Eventing.Reader;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Inlamningsuppgift1b
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void btnCalculate_Click(object sender, EventArgs e)
        {
            try
            {
                // Hämta värden från input textfälten
                int price = int.Parse(txtPrice.Text);
                int payment = int.Parse(txtPayment.Text);
                
                // Först kontrolleras så priset är större än 0
                if (price > 0)
                {
                    // Sedan kontrolleras om betalning matchar priset
                    if (payment == price)
                    {
                        lblResult.Text = "Betalning matchar priset, ingen växel ges.";
                    }
                    // Om betalningen är större än priset görs uträkning
                    else if (payment > price)
                    {
                        int change = payment - price;
                        // Arrayer för valörer
                        int[] bills = { 500, 200, 100, 50, 20 };
                        int[] coins = { 10, 5, 1 };

                        // Stringbuilder för att lägga resultatet av växeln i
                        StringBuilder result = new StringBuilder();
                        result.AppendLine("Växel:");

                        // Loop som går igenom varje valör i arrayen "bills" och beräknar
                        // hur många sedlar av varje valör som behövs för att täcka växelbeloppet.
                        // Om några sedlar av den aktuella valören behövs, skrivs resultatet ut
                        // och växelbeloppet minskas med värdet av de utdelade sedlarna.
                        foreach (int bill in bills)
                        {
                            int numofBills = change / bill;
                            if (numofBills > 0)
                            {
                                result.AppendLine($"{numofBills} st {bill}-lappar");
                                change -= numofBills * bill;
                            }
                        }
                        // Likadan loop som går igenom arrayen "coins"
                        foreach (int coin in coins)
                        {
                            int numofCoins = change / coin;
                            if (numofCoins > 0)
                            {
                                result.AppendLine($"{numofCoins} st {coin}-kronor");
                                change -= numofCoins * coin;
                            }
                        }
                        //Visa resultatet i lblResult
                        lblResult.Text = result.ToString();
                        lblResult.Text += $"\nTotalt: {payment - price}kr tillbaka";
                    }
                    else
                    {
                        // Om betalningen är lägre än priset
                        lblResult.Text = $"Betalning otillräcklig. Pris: {price} kr, betalat: {payment} kr.";
                    }
                }
                else 
                {
                    // Om priset är <= 0
                    lblResult.Text = "Pris måste vara större än 0. Var god ange ett giltigt pris.";
                }
            }
            // Här hanteras ogiltig input. Dvs input som inte går att konvertera till heltal.
            catch (FormatException)
            {
                lblResult.Text = "Ogiltig inmatning. Var god ange giltiga tal.";
            }

            // Rensa textfälten efter beräkningen
            txtPrice.Clear();
            txtPayment.Clear();
        }
        private void btnExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // Sätter fokus på txtPrice med fördröjning för att säkerställa att det sätts korrekt vid start
            this.BeginInvoke((MethodInvoker)delegate
            {
                txtPrice.Focus();
            });
        }
    }
}
