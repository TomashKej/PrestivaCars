using PrestivaCars.Infrastructure;
using PrestivaCars.Application;

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

            builder.Services.AddInfrastructure(builder.Configuration);
            builder.Services.AddApplication();

            builder.Services.AddOpenApi();
        }

        /// <summary>
        /// This method configures the HTTP request pipeline for the application, including middleware for handling requests, enabling HTTPS redirection, authorization, and mapping controllers.
        /// </summary>
        /// <param name="app"></param>
        public static void ConfigureRequestPipeline(WebApplication app)
        {
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
        }
    }
}
