using PrestivaCars.API.ExceptionHandlers;
using PrestivaCars.Application;
using PrestivaCars.Infrastructure;
using PrestivaCars.Infrastructure.Data;

namespace PrestivaCars.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
            RegisterServices(builder);

            var app = builder.Build();

            ConfigureRequestPipeline(app);

            app.Run();
        }

        /// <summary>
        /// This method registers the necessary services for the application, including controllers, infrastructure services, application services, and OpenAPI documentation generation.
        /// </summary>
        /// <param name="builder"></param>
        public static void RegisterServices(WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();

            builder.Services.AddProblemDetails();
            builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

            builder.Services.AddInfrastructure(builder.Configuration);
            builder.Services.AddApplication();

            // Healt check
            builder.Services.AddHealthChecks().AddDbContextCheck<ApplicationDbContext>(name: "database");

            builder.Services.AddOpenApi();
        }

        /// <summary>
        /// This method configures the HTTP request pipeline for the application, including middleware for handling requests, enabling HTTPS redirection, authorization, and mapping controllers.
        /// </summary>
        /// <param name="app"></param>
        public static void ConfigureRequestPipeline(WebApplication app)
        {
            app.UseExceptionHandler();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();

                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/openapi/v1.json", "v1");
                });
            }
            //app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapControllers();
            app.MapHealthChecks("/health");
        }
    }
}
