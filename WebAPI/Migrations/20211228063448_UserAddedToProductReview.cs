using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class UserAddedToProductReview : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdentityUserId",
                table: "ProductReviews",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductReviews_IdentityUserId",
                table: "ProductReviews",
                column: "IdentityUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReviews_AspNetUsers_IdentityUserId",
                table: "ProductReviews",
                column: "IdentityUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductReviews_AspNetUsers_IdentityUserId",
                table: "ProductReviews");

            migrationBuilder.DropIndex(
                name: "IX_ProductReviews_IdentityUserId",
                table: "ProductReviews");

            migrationBuilder.DropColumn(
                name: "IdentityUserId",
                table: "ProductReviews");
        }
    }
}
