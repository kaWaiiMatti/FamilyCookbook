using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyCookbook.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixRecipeIdspelling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReciceId",
                table: "Ingrediants");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReciceId",
                table: "Ingrediants",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
