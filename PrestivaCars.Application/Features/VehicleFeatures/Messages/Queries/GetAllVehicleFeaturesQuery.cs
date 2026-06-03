using MediatR;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs;

namespace PrestivaCars.Application.Features.VehicleFeatures.Messages.Queries
{
    /// <summary>
    /// This class represents a query to retrieve all vehicle features in the Prestiva Cars application. 
    /// It implements the IRequest interface from the MediatR library, which allows it to be handled by a corresponding query handler. 
    /// The query does not require any parameters and is expected to return an IEnumerable of VehicleFeatureDto objects, which contain the details of each vehicle feature. 
    /// This query is typically used to fetch a list of all available vehicle features for display or further processing in the application.
    /// </summary>
    public class GetAllVehicleFeaturesQuery : IRequest<IEnumerable<VehicleFeatureDto>>
    {
    }
}