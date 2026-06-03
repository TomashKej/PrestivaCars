using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrestivaCars.Application.Features.Vehicles.Messages.Commands;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;
using PrestivaCars.Application.Features.Vehicles.Messages.Queries;

namespace PrestivaCars.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController(IMediator mediator) : ControllerBase
    {
        /// <summary>
        /// This endpoint retrieves all vehicles from the system.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<VehicleDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllItems()
        {
            var query = new GetAllVehiclesQuery();

            return Ok (await mediator.Send(query));
        }

        /// <summary>
        /// This endpoint retrieves a specific vehicle by its ID. If the vehicle is not found, it returns a 404 Not Found response with a message indicating that the vehicle was not found.
        /// </summary>
        /// <param name="id">The ID of the vehicle to retrieve.</param>
        /// <returns>The vehicle with the specified ID, or a 404 Not Found response if not found.</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(VehicleDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetItemById(int id)
        {
            var query = new GetVehicleByIdQuery(id);
            var vehicle = await mediator.Send(query);

            if (vehicle == null)
            {
                return NotFound(new { message = $"The vehicle with Id number {id} was not found" });
            }

            return Ok(vehicle);
        }

        /// <summary>
        /// This endpoint creates a new vehicle in the system. It accepts a CreateVehicleCommand object in the request body, which contains the details of the vehicle to be created.
        /// If the creation is successful, it returns a 201 Created response with the created vehicle's details. 
        /// If there is an error during creation, it returns a 400 Bad Request response.
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(VehicleDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateItem(CreateVehicleCommand command)
        {
            try
            {
                var createdVehicle = await mediator.Send(command);

                return CreatedAtAction(
                    nameof(GetItemById),
                    new { id = createdVehicle.Id },
                    createdVehicle);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        /// <summary>
        /// This endpoint updates an existing vehicle in the system. It accepts an UpdateVehicleCommand object in the request body, which contains the updated details of the vehicle.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateVehicleCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest(new
                {
                    message = "The Id in the URL does not match the Id in the request body."
                });
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
        /// This endpoint deletes a specific vehicle by its ID. If the vehicle is successfully deleted, it returns a 204 No Content response.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var command = new DeleteVehicleCommand(id);

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