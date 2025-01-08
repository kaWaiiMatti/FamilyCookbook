using FamilyCookbook.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var tenantId = builder.Configuration["Auth:TenantId"] ?? throw new NullReferenceException("No tenant id found");
var clientId = builder.Configuration["Auth:ClientId"] ?? throw new NullReferenceException("No client id found");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = $"https://login.microsoftonline.com/{tenantId}";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = $"https://{tenantId}.ciamlogin.com/{tenantId}/v2.0",
            ValidAudience = clientId,
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddDbContext<CookbookDataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("cookbook")));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseAuthorization();

app
    .MapGet("/api/recipes", async (CookbookDataContext dataContext) => await dataContext.Recipes.ToListAsync())
    .RequireAuthorization();

app
    .MapGet("/api/units", async (CookbookDataContext dataContext) => await dataContext.Units.ToListAsync())
    .RequireAuthorization();

app.Run();
