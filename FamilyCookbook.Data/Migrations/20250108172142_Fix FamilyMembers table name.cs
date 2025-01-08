using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyCookbook.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixFamilyMemberstablename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyMemberEntity_Families_FamilyId",
                table: "FamilyMemberEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FamilyMemberEntity",
                table: "FamilyMemberEntity");

            migrationBuilder.RenameTable(
                name: "FamilyMemberEntity",
                newName: "FamilyMembers");

            migrationBuilder.RenameIndex(
                name: "IX_FamilyMemberEntity_FamilyId",
                table: "FamilyMembers",
                newName: "IX_FamilyMembers_FamilyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FamilyMembers",
                table: "FamilyMembers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyMembers_Families_FamilyId",
                table: "FamilyMembers",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyMembers_Families_FamilyId",
                table: "FamilyMembers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FamilyMembers",
                table: "FamilyMembers");

            migrationBuilder.RenameTable(
                name: "FamilyMembers",
                newName: "FamilyMemberEntity");

            migrationBuilder.RenameIndex(
                name: "IX_FamilyMembers_FamilyId",
                table: "FamilyMemberEntity",
                newName: "IX_FamilyMemberEntity_FamilyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FamilyMemberEntity",
                table: "FamilyMemberEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyMemberEntity_Families_FamilyId",
                table: "FamilyMemberEntity",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
