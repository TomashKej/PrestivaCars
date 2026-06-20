using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.Commands;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.Queries;

namespace PrestivaCars.API.Controllers
{
    /// <summary>
    /// This controller handles HTTP requests related to vehicle features.
    /// It provides endpoints to retrieve, create, update and delete vehicle features.
    /// The controller uses MediatR to send commands and queries to the appropriate handlers.
    /// </summary>
    /// <param name="mediator"></param>
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleFeatureController(IMediator mediator) : ControllerBase
    {
        /// <summary>
        /// Handles HTTP GET requests to retrieve all vehicle features.
        /// </summary>
        /// <returns>An <see cref="IActionResult"/> containing a collection of <see cref="VehicleFeatureDto"/> objects with HTTP status code 200 (OK).</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<VehicleFeatureDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllItems()
        {
            var query = new GetAllVehicleFeaturesQuery();

            return Ok(await mediator.Send(query));
        }

        /// <summary>
        /// Retrieves the vehicle feature with the specified identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the vehicle feature to retrieve.</param>
        /// <returns>An <see cref="IActionResult"/> containing the vehicle feature data with status code 200 (OK) if found;
        /// otherwise, a status code 404 (Not Found) if no matching vehicle feature exists.</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(VehicleFeatureDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetItemById(int id)
        {
            var query = new GetVehicleFeatureByIdQuery(id);
            var vehicleFeature = await mediator.Send(query);

            if (vehicleFeature is null)
            {
                return NotFound(new { message = $"The vehicle feature with Id number {id} was not found." });
            }

            return Ok(vehicleFeature);
        }

        /// <summary>
        /// Handles HTTP POST requests to create a new vehicle feature.
        /// It accepts a <see cref="CreateVehicleFeatureCommand"/> object in the request body,
        /// which contains the necessary data for creating the vehicle feature.
        /// Upon successful creation, it returns an HTTP status code 201 (Created) along with the created <see cref="VehicleFeatureDto"/> object
        /// and a Location header pointing to the newly created resource.
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(VehicleFeatureDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateItem(CreateVehicleFeatureCommand command)
        {
            var createdVehicleFeature = await mediator.Send(command);

            return CreatedAtAction(
                nameof(GetItemById),
                new { id = createdVehicleFeature.Id },
                new
                {
                    message = "The vehicle feature was successfully created.",
                    data = createdVehicleFeature
                });
        }

        /// <summary>
        /// Handles HTTP PUT requests to update an existing vehicle feature.
        /// It accepts the vehicle feature's unique identifier in the URL and an <see cref="UpdateVehicleFeatureCommand"/> object in the request body,
        /// which contains the updated data.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateVehicleFeatureCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest(new { message = "The Id in the URL does not match the Id in the request body." });
            }

            //try
            //{
            //    await mediator.Send(command);

            //    return NoContent();
            //}
            //catch (KeyNotFoundException ex)
            //{
            //    return NotFound(new { message = ex.Message });
            //}

            await mediator.Send(command);
            return NoContent();
        }

        /// <summary>
        /// Handles HTTP DELETE requests to delete an existing vehicle feature.
        /// It accepts the vehicle feature's unique identifier in the URL and sends a <see cref="DeleteVehicleFeatureCommand"/> to the mediator for processing.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var command = new DeleteVehicleFeatureCommand(id);

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