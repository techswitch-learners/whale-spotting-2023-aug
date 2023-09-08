using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WhaleSpotting.Migrations
{
    public partial class DbTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTimestamp",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Users",
                type: "text",
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "ProfileImageUrl",
                table: "Users",
                type: "text",
                nullable: true
            );

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Users",
                type: "integer",
                nullable: true
            );

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "Users",
                type: "integer",
                nullable: true
            );

            migrationBuilder.CreateTable(
                name: "BodiesOfWater",
                columns: table =>
                    new
                    {
                        Id = table
                            .Column<int>(type: "integer", nullable: false)
                            .Annotation(
                                "Npgsql:ValueGenerationStrategy",
                                NpgsqlValueGenerationStrategy.IdentityByDefaultColumn
                            ),
                        Name = table.Column<string>(type: "text", nullable: true)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BodiesOfWater", x => x.Id);
                }
            );

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table =>
                    new
                    {
                        Id = table
                            .Column<int>(type: "integer", nullable: false)
                            .Annotation(
                                "Npgsql:ValueGenerationStrategy",
                                NpgsqlValueGenerationStrategy.IdentityByDefaultColumn
                            ),
                        StartDate = table.Column<DateOnly>(type: "date", nullable: true),
                        Duration = table.Column<int>(type: "integer", nullable: true),
                        Location = table.Column<string>(type: "text", nullable: true),
                        EventLink = table.Column<string>(type: "text", nullable: true),
                        EventImageUrl = table.Column<string>(type: "text", nullable: true)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                }
            );

            migrationBuilder.CreateTable(
                name: "Species",
                columns: table =>
                    new
                    {
                        Id = table
                            .Column<int>(type: "integer", nullable: false)
                            .Annotation(
                                "Npgsql:ValueGenerationStrategy",
                                NpgsqlValueGenerationStrategy.IdentityByDefaultColumn
                            ),
                        Name = table.Column<string>(type: "text", nullable: true),
                        LatinName = table.Column<string>(type: "text", nullable: true),
                        Description = table.Column<string>(type: "text", nullable: true)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Species", x => x.Id);
                }
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
                        Name = table.Column<string>(type: "text", nullable: true),
                        SpeciesId = table.Column<int>(type: "integer", nullable: true)
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

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table =>
                    new
                    {
                        Id = table
                            .Column<int>(type: "integer", nullable: false)
                            .Annotation(
                                "Npgsql:ValueGenerationStrategy",
                                NpgsqlValueGenerationStrategy.IdentityByDefaultColumn
                            ),
                        UserId = table.Column<int>(type: "integer", nullable: true),
                        Latitude = table.Column<double>(type: "double precision", nullable: true),
                        Longitude = table.Column<double>(type: "double precision", nullable: true),
                        Timestamp = table.Column<DateTime>(
                            type: "timestamp with time zone",
                            nullable: true
                        ),
                        SpeciesId = table.Column<int>(type: "integer", nullable: true),
                        ImageUrl = table.Column<string>(type: "text", nullable: true),
                        Description = table.Column<string>(type: "text", nullable: true),
                        ApprovalStatus = table.Column<int>(type: "integer", nullable: true),
                        WhaleTagNumber = table.Column<int>(type: "integer", nullable: true),
                        Rating = table.Column<int>(type: "integer", nullable: true),
                        BodyOfWaterId = table.Column<int>(type: "integer", nullable: true)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_BodiesOfWater_BodyOfWaterId",
                        column: x => x.BodyOfWaterId,
                        principalTable: "BodiesOfWater",
                        principalColumn: "Id"
                    );
                    table.ForeignKey(
                        name: "FK_Posts_Species_SpeciesId",
                        column: x => x.SpeciesId,
                        principalTable: "Species",
                        principalColumn: "Id"
                    );
                    table.ForeignKey(
                        name: "FK_Posts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id"
                    );
                    table.ForeignKey(
                        name: "FK_Posts_Whales_WhaleTagNumber",
                        column: x => x.WhaleTagNumber,
                        principalTable: "Whales",
                        principalColumn: "TagNumber"
                    );
                }
            );

            migrationBuilder.CreateIndex(
                name: "IX_Posts_BodyOfWaterId",
                table: "Posts",
                column: "BodyOfWaterId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SpeciesId",
                table: "Posts",
                column: "SpeciesId"
            );

            migrationBuilder.CreateIndex(name: "IX_Posts_UserId", table: "Posts", column: "UserId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "Events");

            migrationBuilder.DropTable(name: "Posts");

            migrationBuilder.DropTable(name: "BodiesOfWater");

            migrationBuilder.DropTable(name: "Whales");

            migrationBuilder.DropTable(name: "Species");

            migrationBuilder.DropColumn(name: "CreationTimestamp", table: "Users");

            migrationBuilder.DropColumn(name: "Email", table: "Users");

            migrationBuilder.DropColumn(name: "Name", table: "Users");

            migrationBuilder.DropColumn(name: "ProfileImageUrl", table: "Users");

            migrationBuilder.DropColumn(name: "Rating", table: "Users");

            migrationBuilder.DropColumn(name: "Role", table: "Users");
        }
    }
}
