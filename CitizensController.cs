using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MigrationBackend.Data;
using MigrationBackend.Models;

namespace MigrationBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitizensController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CitizensController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Citizens (Получить список всех граждан)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Citizen>>> GetCitizens()
        {
            return await _context.Citizens.ToListAsync();
        }

        // GET: api/Citizens/5 (Получить гражданина по ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Citizen>> GetCitizen(int id)
        {
            var citizen = await _context.Citizens.FindAsync(id);

            if (citizen == null)
            {
                return NotFound();
            }

            return citizen;
        }

        // POST: api/Citizens (Добавить нового гражданина)
        [HttpPost]
        public async Task<ActionResult<Citizen>> CreateCitizen(Citizen citizen)
        {
            _context.Citizens.Add(citizen);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCitizen), new { id = citizen.Id }, citizen);
        }
    }
}