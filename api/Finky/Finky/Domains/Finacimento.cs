using System;
using System.Collections.Generic;

#nullable disable

namespace Finky.Domains
{
    public partial class Finacimento
    {
        public int IdFinaciamento { get; set; }
        public int? IdCredito { get; set; }
        public int? ValorEntrada { get; set; }
        public int? ValorFinaciamento { get; set; }
        public int? Parcela { get; set; }
        public int? Prazo { get; set; }
        public int? Taxas { get; set; }

        public virtual Credito IdCreditoNavigation { get; set; }
    }
}
