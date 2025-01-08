namespace FamilyCookbook.Data;

using FamilyCookbook.Data.Entities;
using Microsoft.EntityFrameworkCore;

public class CookbookDataContext(DbContextOptions<CookbookDataContext> options) : DbContext(options)
{
    public DbSet<FamilyEntity> Families { get; set; }
    public DbSet<IngredientEntity> Ingrediants { get; set; }
    public DbSet<RecipeEntity> Recipies { get; set; }
    public DbSet<UnitEntity> Units { get; set; }
}
