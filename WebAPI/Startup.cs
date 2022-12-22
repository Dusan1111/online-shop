using System.IO;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using WebApi.Repositories.SQLRepositories;
using WebApi.Token;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<OnlineShopDbContext>(opt => opt.UseSqlServer(connectionString));

            services.AddCors(options =>
                      {
                          options.AddPolicy("AllowAll", p =>
                          {
                              p.AllowAnyOrigin()
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                          });
                      });

            services.AddControllers();

            services.AddScoped<IJWTTokenGenerator, JWTTokenGenerator>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
            });

            //Repository registration
            services.AddTransient<IProductReviewRepository, ProductReviewSQLRepository>();
            services.AddTransient<IOrderRepository, OrderSQLRepository>();
            services.AddTransient<IProductRepository, ProductSQLRepository>();
            services.AddTransient<IProductCategoryRepository, ProductCategorySQLRepository>();
            services.AddTransient<IDiscountRepository, DiscountSQLRepository>();

            services.AddIdentity<IdentityUser, IdentityRole>(opt => 
                {
                    opt.Password.RequireDigit = false;
                    opt.Password.RequireLowercase = false;
                    opt.Password.RequireNonAlphanumeric = false;
                    opt.Password.RequireUppercase = false;
                    opt.Password.RequiredLength = 4;

                    opt.User.RequireUniqueEmail= true;
                }

            ).AddEntityFrameworkStores<OnlineShopDbContext>();
        
            services.AddAuthentication(cfg =>
			{
				cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

			}).AddJwtBearer(options =>
			   {
				   options.RequireHttpsMetadata = false;
				   options.TokenValidationParameters = new TokenValidationParameters
				   {
					   ValidateIssuerSigningKey = true,
					   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:Key"])),
					   ValidIssuer = Configuration["Token:Issuer"],
					   ValidateIssuer = true,
					   ValidateAudience = false,
				   };
			   });

               services.AddAuthorization(options => {
                  options.AddPolicy("Administrator",
                    policy => policy.RequireRole("admin"));
               });

                 services.AddControllers().AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        { 
            app.UseAuthentication();
            app.UseCors("AllowAll");
           
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
            }
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            //da bi se slike mogle citati iz Photos foldera
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Images")),
                RequestPath = "/Images"
            });
        }
    }
}
