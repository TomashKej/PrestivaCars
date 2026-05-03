using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrestivaCars.Application.Features.VehiclesCategories.DTOs;
using PrestivaCars.Application.Features.VehiclesCategories.Queries;

namespace PrestivaCars.API.Controllers
{
    /// <summary>
    /// This controller handles HTTP requests related to vehicle categories. It uses MediatR to send queries and retrieve data from the application layer. 
    /// The GetAllItems method responds to GET requests and returns a list of all vehicle categories as VehicleCategoryDto objects.
    /// </summary>
    /// <param name="mediator"></param>
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleCategoryController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<VehicleCategoryDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllItems()
        {
            var query = new GetAllVehicleCategoriesQuery();
            return Ok(await mediator.Send(query));
        }
    }
}
