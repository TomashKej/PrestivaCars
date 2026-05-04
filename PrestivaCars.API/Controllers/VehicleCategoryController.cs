using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.DTOs;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.Queries;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.Commands;

namespace PrestivaCars.API.Controllers
{
    /// <summary>
    /// This controller handles HTTP requests related to vehicle categories. It provides endpoints to retrieve all vehicle categories and to create a new vehicle category. 
    /// The controller uses MediatR to send commands and queries to the appropriate handlers.
    /// </summary>
    /// <param name="mediator"></param>
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleCategoryController(IMediator mediator) : ControllerBase
    {
        /// <summary>
        /// Handles HTTP GET requests to retrieve all vehicle categories.
        /// </summary>
        /// <returns>An <see cref="IActionResult"/> containing a collection of <see cref="VehicleCategoryDto"/> objects with HTTP
        /// status code 200 (OK).</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<VehicleCategoryDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllItems()
        {
            var query = new GetAllVehicleCategoriesQuery();
            return Ok(await mediator.Send(query));
        }

        /// <summary>
        /// Retrieves the vehicle category with the specified identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the vehicle category to retrieve.</param>
        /// <returns>An <see cref="IActionResult"/> containing the vehicle category data with status code 200 (OK) if found;
        /// otherwise, a status code 404 (Not Found) if no matching vehicle category exists.</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(VehicleCategoryDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetItemById(int id)
        {
            var query = new GetVehicleCategoryByIdQuery(id);
            var vehicleCategory = await mediator.Send(query);

            if (vehicleCategory is null)
            {
                return NotFound(new { message = $"The vehicle category with Id number {id} was not found." });
            }

            return Ok(vehicleCategory);
        }

        /// <summary>
        /// Handles HTTP POST requests to create a new vehicle category. It accepts a <see cref="CreateVehicleCategoryCommand"/> object in the request body, which contains the necessary data for creating the vehicle category. 
        /// Upon successful creation, it returns an HTTP status code 201 (Created) along with the created <see cref="VehicleCategoryDto"/> object and a Location header pointing to the newly created resource.
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(VehicleCategoryDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateItem(CreateVehicleCategoryCommand command)
        { 
            var createdVehicleCategory = await mediator.Send(command);

            return CreatedAtAction(
                nameof(GetItemById), new { id = createdVehicleCategory.Id },
                new
                {
                    message = "The vehicle category was successfully created.",
                    data = createdVehicleCategory
                });
        }

        /// <summary>
        /// Handles HTTP PUT requests to update an existing vehicle category. It accepts the vehicle category's unique identifier in the URL and an <see cref="UpdateVehicleCategoryCommand"/> object in the request body, which contains the updated data.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateVehicleCategoryCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest(new { message = "The Id in the URL does not match the Id in the request body." });
            }

            try
            {
                await mediator.Send(command);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            { 
                return NotFound(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Handles HTTP DELETE requests to delete an existing vehicle category. It accepts the vehicle category's unique identifier in the URL and sends a <see cref="DeleteVehicleCategoryCommand"/> to the mediator for processing.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var command = new DeleteVehicleCategoryCommand(id);

            try
            {
                await mediator.Send(command);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
