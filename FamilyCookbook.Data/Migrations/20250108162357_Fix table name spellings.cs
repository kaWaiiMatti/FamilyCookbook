using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyCookbook.Data.Migrations
{
    /// <inheritdoc />
    public partial class Fixtablenamespellings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingrediants_Recipies_RecipeId",
                table: "Ingrediants");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingrediants_Units_UnitId",
                table: "Ingrediants");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipies_Families_FamilyId",
                table: "Recipies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Recipies",
                table: "Recipies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingrediants",
                table: "Ingrediants");

            migrationBuilder.RenameTable(
                name: "Recipies",
                newName: "Recipes");

            migrationBuilder.RenameTable(
                name: "Ingrediants",
                newName: "Ingredients");

            migrationBuilder.RenameIndex(
                name: "IX_Recipies_FamilyId",
                table: "Recipes",
                newName: "IX_Recipes_FamilyId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingrediants_UnitId",
                table: "Ingredients",
                newName: "IX_Ingredients_UnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingrediants_RecipeId",
                table: "Ingredients",
                newName: "IX_Ingredients_RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Recipes",
                table: "Recipes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Recipes_RecipeId",
                table: "Ingredients",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Units_UnitId",
                table: "Ingredients",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Families_FamilyId",
                table: "Recipes",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Recipes_RecipeId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Units_UnitId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Families_FamilyId",
                table: "Recipes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Recipes",
                table: "Recipes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients");

            migrationBuilder.RenameTable(
                name: "Recipes",
                newName: "Recipies");

            migrationBuilder.RenameTable(
                name: "Ingredients",
                newName: "Ingrediants");

            migrationBuilder.RenameIndex(
                name: "IX_Recipes_FamilyId",
                table: "Recipies",
                newName: "IX_Recipies_FamilyId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredients_UnitId",
                table: "Ingrediants",
                newName: "IX_Ingrediants_UnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredients_RecipeId",
                table: "Ingrediants",
                newName: "IX_Ingrediants_RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Recipies",
                table: "Recipies",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingrediants",
                table: "Ingrediants",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingrediants_Recipies_RecipeId",
                table: "Ingrediants",
                column: "RecipeId",
                principalTable: "Recipies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingrediants_Units_UnitId",
                table: "Ingrediants",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipies_Families_FamilyId",
                table: "Recipies",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
