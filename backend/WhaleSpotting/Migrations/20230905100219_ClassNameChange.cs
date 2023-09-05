using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhaleSpotting.Migrations
{
    public partial class ClassNameChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tag_Number",
                table: "Posts",
                newName: "TagNumber");

            migrationBuilder.RenameColumn(
                name: "Post_date",
                table: "Posts",
                newName: "PostDate");

            migrationBuilder.RenameColumn(
                name: "Post_Image",
                table: "Posts",
                newName: "PostImageUrl");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TagNumber",
                table: "Posts",
                newName: "Tag_Number");

            migrationBuilder.RenameColumn(
                name: "PostImageUrl",
                table: "Posts",
                newName: "Post_Image");

            migrationBuilder.RenameColumn(
                name: "PostDate",
                table: "Posts",
                newName: "Post_date");
        }
    }
}
