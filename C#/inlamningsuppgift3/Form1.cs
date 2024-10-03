// Inlämningsuppgift 3 Windows Forms Application
// Johannes Taheri, se ytterligare information i readme.txt

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace inlamningsuppgift3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnValidate_Click(object sender, EventArgs e)
        {
            // Hämta värden från textboxarna
            string fName = txtfName.Text;
            string lName = txtlName.Text;
            string ssnr = txtSsnr.Text;

            // Skapa ett nytt objekt enligt klassen Person
            Person person  = new Person(fName, lName, ssnr);

            // Validera personnumret och få könet från metoderna
            bool isValid = person.ValidatePersonalNumber();
            string gender = person.GetGender();

            // Visa resultatet i multiline textboxen
            if (isValid)
            {
                // Rensar resultatfönstret innan text skrivs ut
                txtResult.Clear();

                // Environment.NewLine säkerställer att radbrytningen sker korrekt, hade problem med "\n"
                txtResult.Text = $"RESULTAT:{Environment.NewLine}";
                txtResult.Text += $"Förnamn: {person.FirstName}{Environment.NewLine}";
                txtResult.Text += $"Efternamn: {person.LastName}{Environment.NewLine}";
                txtResult.Text += $"Personnummer: {person.SSNR}{Environment.NewLine}{Environment.NewLine}";
                txtResult.Text += $"Personnumret är giltigt.{Environment.NewLine}";
                txtResult.Text += $"Kön: {gender}";
            }
            else
            {
                txtResult.Text = "Ogiltigt personnummer";
            }

            // Rensa textfälten efter att valideringen har utförts
            txtfName.Clear();
            txtlName.Clear();
            txtSsnr.Clear();
        }

        private void avslutaProgrammetToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // Stänger applikationen
            Application.Exit();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // Dölj input-fält och knapp vid start
            txtfName.Visible = false;
            txtlName.Visible = false;
            txtSsnr.Visible = false;
            lblfName.Visible = false;
            lbllName.Visible = false;
            lblSsnr.Visible = false;
            btnValidate.Visible = false;

            // Visa välkomstmeddelande
            txtResult.Text = $"Välkommen!{Environment.NewLine}";
            txtResult.Text += $"{Environment.NewLine}Var god välj alternativ i menyn.";
        }

        private void registreraPersonToolStripMenuItem1_Click(object sender, EventArgs e)
        {
                        // Visa input-fälten och knappen när "Registrera person" klickas
            txtfName.Visible = true;
            txtlName.Visible = true;
            txtSsnr.Visible = true;
            lblfName.Visible = true;
            lbllName.Visible = true;
            lblSsnr.Visible = true;
            btnValidate.Visible = true;

            // Rensa resultatfältet
            txtResult.Clear();
        }
    }
}
