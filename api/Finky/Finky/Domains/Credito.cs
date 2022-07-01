using System;
using System.Collections.Generic;

#nullable disable

namespace Finky.Domains
{
    public partial class Credito
    {
        public Credito()
        {
            Finacimentos = new HashSet<Finacimento>();
        }

        public int IdCredito { get; set; }
        public string NomeCredito { get; set; }
        public decimal? Taxas { get; set; }
        public int? TarifaAvalicao { get; set; }

        public virtual ICollection<Finacimento> Finacimentos { get; set; }
    }
}
