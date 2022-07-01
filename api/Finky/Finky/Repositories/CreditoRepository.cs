using Microsoft.EntityFrameworkCore;
using Finky.Contexts;
using Finky.Domains;
using Finky.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Finky.Repositories
{
    public class CreditoRepository : ICredito
    {
        FinkyContext ctx = new FinkyContext();

        public List<Credito> Listar()
        {
            return ctx.Creditos.OrderBy(s => s.IdCredito).ToList();
        }
    }
}
