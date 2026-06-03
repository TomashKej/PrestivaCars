using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PrestivaCars.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddVehicleFeaturesManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VehicleFeatures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleFeatures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VehicleVehicleFeatures",
                columns: table => new
                {
                    VehicleId = table.Column<int>(type: "int", nullable: false),
                    VehicleFeatureId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleVehicleFeatures", x => new { x.VehicleId, x.VehicleFeatureId });
                    table.ForeignKey(
                        name: "FK_VehicleVehicleFeatures_VehicleFeatures_VehicleFeatureId",
                        column: x => x.VehicleFeatureId,
                        principalTable: "VehicleFeatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VehicleVehicleFeatures_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VehicleVehicleFeatures_VehicleFeatureId",
                table: "VehicleVehicleFeatures",
                column: "VehicleFeatureId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VehicleVehicleFeatures");

            migrationBuilder.DropTable(
                name: "VehicleFeatures");
        }
    }
}
