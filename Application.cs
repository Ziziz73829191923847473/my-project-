using System.ComponentModel.DataAnnotations.Schema;

namespace MigrationBackend.Models
{
    [Table("applications")]
    public class Application
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("citizen_id")]
        public int CitizenId { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("address")]
        public string Address { get; set; } = string.Empty;

        [Column("entry_date")]
        public DateTime EntryDate { get; set; }

        [Column("purpose")]
        public string Purpose { get; set; } = string.Empty;

        [Column("status")]
        public string Status { get; set; } = "pending";

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}