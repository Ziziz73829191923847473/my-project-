using Microsoft.EntityFrameworkCore;
using MigrationBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Настройка CORS (разрешаем запросы с любого локального фронтенда)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 2. Строка подключения к MySQL из appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 3. Регистрация контекста БД через Pomelo
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 4. Swagger для тестирования API
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 5. Подключение middleware CORS
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.Run();