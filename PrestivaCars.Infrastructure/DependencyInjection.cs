using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Infrastructure.Data;

namespace PrestivaCars.Infrastructure
{
    /// <summary>
    /// This static class provides an extension method for IServiceCollection to register infrastructure services, including the ApplicationDbContext and its interface IApplicationDbContext.
    /// </summary>
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // This method registers the ApplicationDbContext with the dependency injection container, configuring it to use SQL Server with the connection string specified in the application's configuration.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // This line registers the IApplicationDbContext interface with the dependency injection container, allowing it to be resolved to the ApplicationDbContext implementation.
            services.AddScoped<IApplicationDbContext>(provider => 
                provider.GetRequiredService<ApplicationDbContext>());

            return services;
        }
    }
}
