using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WhaleSpotting.Migrations
{
    public partial class RemoveSurplusInformation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Posts_Whales_WhaleTagNumber", table: "Posts");

            migrationBuilder.DropTable(name: "Whales");

            migrationBuilder.DropIndex(name: "IX_Posts_WhaleTagNumber", table: "Posts");

            migrationBuilder.DropColumn(name: "Description", table: "Species");

            migrationBuilder.DropColumn(name: "LatinName", table: "Species");

            migrationBuilder.DropColumn(name: "WhaleTagNumber", table: "Posts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Species",
                type: "text",
                nullable: false,
                defaultValue: ""
            );

            migrationBuilder.AddColumn<string>(
                name: "LatinName",
                table: "Species",
                type: "text",
                nullable: false,
                defaultValue: ""
            );

            migrationBuilder.AddColumn<int>(
                name: "WhaleTagNumber",
                table: "Posts",
                type: "integer",
                nullable: true
            );

            migrationBuilder.CreateTable(
                name: "Whales",
                columns: table =>
                    new
                    {
                        TagNumber = table
                            .Column<int>(type: "integer", nullable: false)
                            .Annotation(
                                "Npgsql:ValueGenerationStrategy",
                                NpgsqlValueGenerationStrategy.IdentityByDefaultColumn
                            ),
                        SpeciesId = table.Column<int>(type: "integer", nullable: true),
                        Name = table.Column<string>(type: "text", nullable: false)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Whales", x => x.TagNumber);
                    table.ForeignKey(
                        name: "FK_Whales_Species_SpeciesId",
                        column: x => x.SpeciesId,
                        principalTable: "Species",
                        principalColumn: "Id"
                    );
                }
            );

            migrationBuilder.CreateIndex(
                name: "IX_Posts_WhaleTagNumber",
                table: "Posts",
                column: "WhaleTagNumber"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Whales_SpeciesId",
                table: "Whales",
                column: "SpeciesId"
            );

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Whales_WhaleTagNumber",
                table: "Posts",
                column: "WhaleTagNumber",
                principalTable: "Whales",
                principalColumn: "TagNumber"
            );
        }
    }
}
