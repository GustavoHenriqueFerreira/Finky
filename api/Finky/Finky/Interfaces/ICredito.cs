using Finky.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Finky.Interfaces
{
    public interface ICredito
    {
        /// <summary>
        /// Método para listar os créditos
        /// </summary>
        List<Credito> Listar();
    }
}
