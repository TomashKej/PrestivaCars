using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace PrestivaCars.API.ExceptionHandlers
{
    /// <summary>
    /// Handles unhandled exceptions thrown during HTTP request processing
    /// and converts them into consistent ProblemDetails responses.
    /// </summary>
    /// <param name="logger"></param>
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            logger.LogError(exception, "An unhandled exception occurred while processing the request.");

            var problemDetails = CreateProblemDetails(httpContext, exception);

            httpContext.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status500InternalServerError;

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }

        private static ProblemDetails CreateProblemDetails(HttpContext httpContext, Exception exception)
        {
            return exception switch
            {
                KeyNotFoundException => new ProblemDetails
                {
                    Status = StatusCodes.Status404NotFound,
                    Title = "Resource not found",
                    Detail = exception.Message,
                    Instance = httpContext.Request.Path
                },

                ArgumentException => new ProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "Invalid request",
                    Detail = exception.Message,
                    Instance = httpContext.Request.Path
                },

                _ => new ProblemDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Title = "Internal server error",
                    Detail = "An unexpected error occurred.",
                    Instance = httpContext.Request.Path
                }
            };
        }
    }
}