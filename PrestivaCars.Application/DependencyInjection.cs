using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace PrestivaCars.Application
{
    /// <summary>
    /// This static class provides an extension method for IServiceCollection to register application services, including MediatR handlers, from the current assembly. 
    /// It allows for easy integration of application-level services into the dependency injection container.
    /// This class saying : "register application services, including MediatR handlers, from the current assembly."
    /// Thats mean that the application services and MediatR handlers defined in the current assembly will be registered with the dependency injection container
    /// ,making them available for use throughout the application.
    /// </summary>
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        { 
            services.AddMediatR(configuration =>
                configuration.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            return services;
        }
    }
}
