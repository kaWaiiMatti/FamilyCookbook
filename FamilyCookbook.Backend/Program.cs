using FamilyCookbook.Backend.Dto;
using FamilyCookbook.Backend.Endpoints;
using FamilyCookbook.Backend.Logic;
using FamilyCookbook.Backend.Validation;
using FamilyCookbook.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.HttpResults;
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

// Logic
builder.Services.AddScoped<IRecipeLogic, RecipeLogic>();

// Validators
builder.Services.AddScoped<IValidator<NewRecipeDto>, NewRecipeValidator>();
builder.Services.AddScoped<IValidator<NewUnitDto>, NewUnitValidator>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseAuthorization();

var group = app
    .MapGroup("/api/")
    .RequireAuthorization();

group.RegisterRecipeEndpoints();
group.RegisterUnitEndpoints();


app.Run();
