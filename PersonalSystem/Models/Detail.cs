using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalSystem.Models
{
    public class Detail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Salutation Salutation { get; set; }
        public string Phone { get; set; }
        public string Age { get; set; }
        public string Email { get; set; }
        public string Education { get; set; }
        public Gender Gender { get; set; }
    }
    public enum Salutation
    {
         Mr,
         Ms,
         Mrs
     }

    public enum Gender
    {
        Male,
        Female
    }

}