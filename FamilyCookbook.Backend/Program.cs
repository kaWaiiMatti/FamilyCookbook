using FamilyCookbook.Backend.Dto;
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

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseAuthorization();

var group = app
    .MapGroup("/api/")
    .RequireAuthorization();

group.MapGet("recipes", async (CookbookDataContext dataContext) => await dataContext.Recipes.ToListAsync());
group.MapPost("recipes", async Task<Results<Created<RecipeDto>, ValidationProblem>> (IRecipeLogic logic, NewRecipeDto recipe, IValidator<NewRecipeDto> validator) =>
    {
        var validationResult = await validator.ValidateAsync(recipe);
        if (!validationResult.IsValid)
        {
            return TypedResults.ValidationProblem(validationResult.ToDictionary());
        }
        var result =  await logic.CreateNew(recipe);
        return TypedResults.Created($"/api/recipe/{result.Id}", result);
    });
group.MapGet("units", async (CookbookDataContext dataContext) => await dataContext.Units.ToListAsync());

app.Run();
