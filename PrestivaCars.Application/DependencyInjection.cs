using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace PrestivaCars.Application
{
    /// <summary>
    /// This static class provides extension methods for configuring application services and dependencies.
    /// It allows for easy integration of application-level services into the dependency injection container.
    /// </summary>
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        { 
            services.AddMediatR(configuration =>
                configuration.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            var config = TypeAdapterConfig.GlobalSettings;              // Get the global TypeAdapterConfig instance
            config.Scan(Assembly.GetExecutingAssembly());               // Scan the current assembly for mapping configurations

            services.AddSingleton(TypeAdapterConfig.GlobalSettings);    // Register the global TypeAdapterConfig as a singleton service
            services.AddScoped<IMapper, ServiceMapper>();               // Register the ServiceMapper as a scoped service for mapping operations

            return services;
        }
    }
}
