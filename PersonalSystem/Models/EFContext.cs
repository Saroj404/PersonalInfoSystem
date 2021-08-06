using System;
using System.Data.Entity;
using System.Linq;

namespace PersonalSystem.Models
{
    public class EFContext : DbContext
    {
        public EFContext()
            : base("name=EFContext")
        {
        }

    
    }

  
}