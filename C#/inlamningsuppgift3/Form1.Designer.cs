namespace inlamningsuppgift3
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.txtfName = new System.Windows.Forms.TextBox();
            this.txtlName = new System.Windows.Forms.TextBox();
            this.txtSsnr = new System.Windows.Forms.TextBox();
            this.btnValidate = new System.Windows.Forms.Button();
            this.txtResult = new System.Windows.Forms.TextBox();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.registreraPersonToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.registreraPersonToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.avslutaProgrammetToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.lblfName = new System.Windows.Forms.Label();
            this.lbllName = new System.Windows.Forms.Label();
            this.lblSsnr = new System.Windows.Forms.Label();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // txtfName
            // 
            this.txtfName.Location = new System.Drawing.Point(55, 106);
            this.txtfName.Name = "txtfName";
            this.txtfName.Size = new System.Drawing.Size(100, 22);
            this.txtfName.TabIndex = 0;
            // 
            // txtlName
            // 
            this.txtlName.Location = new System.Drawing.Point(171, 106);
            this.txtlName.Name = "txtlName";
            this.txtlName.Size = new System.Drawing.Size(100, 22);
            this.txtlName.TabIndex = 1;
            // 
            // txtSsnr
            // 
            this.txtSsnr.Location = new System.Drawing.Point(286, 106);
            this.txtSsnr.Name = "txtSsnr";
            this.txtSsnr.Size = new System.Drawing.Size(100, 22);
            this.txtSsnr.TabIndex = 2;
            // 
            // btnValidate
            // 
            this.btnValidate.Location = new System.Drawing.Point(55, 313);
            this.btnValidate.Name = "btnValidate";
            this.btnValidate.Size = new System.Drawing.Size(75, 23);
            this.btnValidate.TabIndex = 3;
            this.btnValidate.Text = "Validera";
            this.btnValidate.UseVisualStyleBackColor = true;
            this.btnValidate.Click += new System.EventHandler(this.btnValidate_Click);
            // 
            // txtResult
            // 
            this.txtResult.Location = new System.Drawing.Point(55, 156);
            this.txtResult.Multiline = true;
            this.txtResult.Name = "txtResult";
            this.txtResult.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.txtResult.Size = new System.Drawing.Size(216, 151);
            this.txtResult.TabIndex = 4;
            // 
            // menuStrip1
            // 
            this.menuStrip1.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.registreraPersonToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(800, 30);
            this.menuStrip1.TabIndex = 5;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // registreraPersonToolStripMenuItem
            // 
            this.registreraPersonToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.registreraPersonToolStripMenuItem1,
            this.avslutaProgrammetToolStripMenuItem});
            this.registreraPersonToolStripMenuItem.Name = "registreraPersonToolStripMenuItem";
            this.registreraPersonToolStripMenuItem.Size = new System.Drawing.Size(70, 24);
            this.registreraPersonToolStripMenuItem.Text = "Välj val";
            // 
            // registreraPersonToolStripMenuItem1
            // 
            this.registreraPersonToolStripMenuItem1.Name = "registreraPersonToolStripMenuItem1";
            this.registreraPersonToolStripMenuItem1.Size = new System.Drawing.Size(228, 26);
            this.registreraPersonToolStripMenuItem1.Text = "Registrera person";
            this.registreraPersonToolStripMenuItem1.Click += new System.EventHandler(this.registreraPersonToolStripMenuItem1_Click);
            // 
            // avslutaProgrammetToolStripMenuItem
            // 
            this.avslutaProgrammetToolStripMenuItem.Name = "avslutaProgrammetToolStripMenuItem";
            this.avslutaProgrammetToolStripMenuItem.Size = new System.Drawing.Size(228, 26);
            this.avslutaProgrammetToolStripMenuItem.Text = "Avsluta programmet";
            this.avslutaProgrammetToolStripMenuItem.Click += new System.EventHandler(this.avslutaProgrammetToolStripMenuItem_Click);
            // 
            // lblfName
            // 
            this.lblfName.AutoSize = true;
            this.lblfName.Location = new System.Drawing.Point(52, 87);
            this.lblfName.Name = "lblfName";
            this.lblfName.Size = new System.Drawing.Size(60, 16);
            this.lblfName.TabIndex = 6;
            this.lblfName.Text = "Förnamn";
            // 
            // lbllName
            // 
            this.lbllName.AutoSize = true;
            this.lbllName.Location = new System.Drawing.Point(168, 87);
            this.lbllName.Name = "lbllName";
            this.lbllName.Size = new System.Drawing.Size(67, 16);
            this.lbllName.TabIndex = 7;
            this.lbllName.Text = "Efternamn";
            // 
            // lblSsnr
            // 
            this.lblSsnr.AutoSize = true;
            this.lblSsnr.Location = new System.Drawing.Point(283, 87);
            this.lblSsnr.Name = "lblSsnr";
            this.lblSsnr.Size = new System.Drawing.Size(158, 16);
            this.lblSsnr.TabIndex = 8;
            this.lblSsnr.Text = "Personnummer (10 siffror)";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.lblSsnr);
            this.Controls.Add(this.lbllName);
            this.Controls.Add(this.lblfName);
            this.Controls.Add(this.txtResult);
            this.Controls.Add(this.btnValidate);
            this.Controls.Add(this.txtSsnr);
            this.Controls.Add(this.txtlName);
            this.Controls.Add(this.txtfName);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtfName;
        private System.Windows.Forms.TextBox txtlName;
        private System.Windows.Forms.TextBox txtSsnr;
        private System.Windows.Forms.Button btnValidate;
        private System.Windows.Forms.TextBox txtResult;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem registreraPersonToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem avslutaProgrammetToolStripMenuItem;
        private System.Windows.Forms.Label lblfName;
        private System.Windows.Forms.Label lbllName;
        private System.Windows.Forms.Label lblSsnr;
        private System.Windows.Forms.ToolStripMenuItem registreraPersonToolStripMenuItem1;
    }
}

