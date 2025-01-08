namespace FamilyCookbook.Data;

using FamilyCookbook.Data.Entities;
using Microsoft.EntityFrameworkCore;

public class CookbookDataContext(DbContextOptions<CookbookDataContext> options) : DbContext(options)
{
    public DbSet<FamilyEntity> Families { get; set; }
    public DbSet<FamilyMemberEntity> FamilyMembers { get; set; }
    public DbSet<IngredientEntity> Ingredients { get; set; }
    public DbSet<RecipeEntity> Recipes { get; set; }
    public DbSet<UnitEntity> Units { get; set; }
}
