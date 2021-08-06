using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalSystem.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Tole { get; set; }
        public string Zone { get; set; }
        public Province Province { get; set; }

    }
    public enum Province
    {
        Province1,
        Province2,
        Province3,
        Province4,
        Province5,
        Province6,
        Province7

    }

}