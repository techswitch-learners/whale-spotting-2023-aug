using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhaleSpotting.Migrations
{
    public partial class RenameColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "Posts",
                newName: "CreationTimestamp"
            );

            migrationBuilder.RenameColumn(name: "EventLink", table: "Events", newName: "Link");

            migrationBuilder.RenameColumn(
                name: "EventImageUrl",
                table: "Events",
                newName: "ImageUrl"
            );

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Events",
                newName: "DurationInHours"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreationTimestamp",
                table: "Posts",
                newName: "Timestamp"
            );

            migrationBuilder.RenameColumn(name: "Link", table: "Events", newName: "EventLink");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Events",
                newName: "EventImageUrl"
            );

            migrationBuilder.RenameColumn(
                name: "DurationInHours",
                table: "Events",
                newName: "Duration"
            );
        }
    }
}
