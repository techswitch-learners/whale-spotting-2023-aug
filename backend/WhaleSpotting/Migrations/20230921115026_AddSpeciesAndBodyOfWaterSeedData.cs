using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhaleSpotting.Migrations
{
    public partial class AddSpeciesAndBodyOfWaterSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "BodiesOfWater",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { -81, "Kane Basin" },
                    { -80, "Gulf of Yana" },
                    { -79, "Shelikhova Gulf" },
                    { -78, "Gulf of Bothnia" },
                    { -77, "Irish Sea" },
                    { -76, "English Channel" },
                    { -75, "Bay of Biscay" },
                    { -74, "Gulf of St. Lawrence" },
                    { -73, "Adriatic Sea" },
                    { -72, "Gulf of Maine" },
                    { -71, "Balearic Sea" },
                    { -70, "Alboran Sea" },
                    { -69, "Gulf of Oman" },
                    { -68, "Gulf of Aden" },
                    { -67, "Gulf of Thailand" },
                    { -66, "Buli Bay" },
                    { -65, "Molucca Sea" },
                    { -64, "Gulf of Tomini" },
                    { -63, "Makassar Strait" },
                    { -62, "Gulf of Carpentaria" },
                    { -61, "Geographe Bay" },
                    { -60, "Marguerite Bay" },
                    { -59, "George VI Sound" },
                    { -58, "Denmark Strait" },
                    { -57, "Gulf of Anadyr" },
                    { -56, "Caspian Sea" },
                    { -55, "Tyrrhenian Sea" },
                    { -54, "Yellow Sea" },
                    { -53, "Red Sea" },
                    { -52, "Celebes Sea" },
                    { -51, "Timor Sea" },
                    { -50, "Lincoln Sea" },
                    { -49, "East Siberian Sea" },
                    { -48, "Chukchi Sea" },
                    { -47, "Gulf of Alaska" },
                    { -46, "Prydz Bay" },
                    { -45, "Laptev Sea" },
                    { -44, "Black Sea" },
                    { -43, "East China Sea" },
                    { -42, "Laccadive Sea" },
                    { -41, "Solomon Sea" },
                    { -40, "Arafura Sea" },
                    { -39, "Sea of Japan" },
                    { -38, "Andaman Sea" },
                    { -37, "Gulf of Guinea" },
                    { -36, "North Sea" },
                    { -35, "Davis Sea" },
                    { -34, "Drake Passage" },
                    { -33, "Bellingshausen Sea" },
                    { -32, "Labrador Sea" },
                    { -31, "Great Australian Bight" },
                    { -30, "Beaufort Sea" },
                    { -29, "Mozambique Channel" },
                    { -28, "Baffin Bay" },
                    { -27, "Mediterranean Sea" },
                    { -26, "Davis Strait" },
                    { -25, "Gulf of Mexico" },
                    { -24, "Scotia Sea" },
                    { -23, "Bay of Bengal" },
                    { -22, "Sea of Okhotsk" },
                    { -21, "Kara Sea" },
                    { -20, "Caribbean Sea" },
                    { -19, "South China Sea" },
                    { -18, "Greenland Sea" },
                    { -17, "Sargasso Sea" },
                    { -16, "Bering Sea" },
                    { -15, "Coral Sea" },
                    { -14, "Arabian Sea" },
                    { -13, "Tasman Sea" },
                    { -12, "Barents Sea" },
                    { -11, "Norwegian Sea" },
                    { -10, "Philippine Sea" },
                    { -9, "Weddell Sea" },
                    { -8, "Ross Sea" },
                    { -7, "Arctic Ocean" },
                    { -6, "North Atlantic Ocean" },
                    { -5, "Southern Ocean" },
                    { -4, "South Atlantic Ocean" },
                    { -3, "North Pacific Ocean" },
                    { -2, "Indian Ocean" },
                    { -1, "South Pacific Ocean" }
                }
            );

            migrationBuilder.InsertData(
                table: "Species",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { -13, "Sei whale" },
                    { -12, "Right whale" },
                    { -11, "Pilot whale" },
                    { -10, "Minke whale" },
                    { -9, "Killer whale" },
                    { -8, "Humpback whale" },
                    { -7, "Gray whale" },
                    { -6, "Fin whale" },
                    { -5, "False killer whale" },
                    { -4, "Bryde's whale" },
                    { -3, "Bowhead whale" },
                    { -2, "Blue whale" },
                    { -1, "Sperm whale" }
                }
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -81);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -80);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -79);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -78);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -77);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -76);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -75);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -74);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -73);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -72);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -71);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -70);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -69);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -68);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -67);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -66);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -65);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -64);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -63);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -62);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -61);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -60);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -59);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -58);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -57);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -56);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -55);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -54);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -53);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -52);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -51);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -50);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -49);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -48);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -47);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -46);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -45);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -44);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -43);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -42);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -41);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -40);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -39);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -38);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -37);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -36);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -35);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -34);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -33);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -32);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -31);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -30);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -29);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -28);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -27);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -26);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -25);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -24);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -23);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -22);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -21);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -20);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -19);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -18);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -17);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -16);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -15);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -14);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -13);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -12);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -11);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -10);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -9);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -8);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -7);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -6);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -5);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -4);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -3);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -2);

            migrationBuilder.DeleteData(table: "BodiesOfWater", keyColumn: "Id", keyValue: -1);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -13);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -12);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -11);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -10);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -9);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -8);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -7);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -6);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -5);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -4);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -3);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -2);

            migrationBuilder.DeleteData(table: "Species", keyColumn: "Id", keyValue: -1);
        }
    }
}
