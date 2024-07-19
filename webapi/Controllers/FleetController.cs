using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Nodes;
using webapi.Framework;
using webapi.Helpers;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FleetController : ControllerBase
    {
        [HttpGet("{route}/{endpoint}/{parameter?}")]
        public async Task<IActionResult> Get(string route, string endpoint, string parameter = null)
        {
            RestWrapper restService = new RestWrapper();

            if (parameter != null)
            {
                endpoint = $"{endpoint}/{parameter}";
            }

            ExpandoObject jsonResponse = restService.GetJsonAsync<ExpandoObject>(route, endpoint).Result;

            object statusCode = Helper.ParseResponse(jsonResponse, "StatusCode") ?? 0;

            return StatusCode(Int32.Parse(statusCode.ToString() ?? "0") == 0 ? 200 : Int32.Parse(statusCode.ToString() ?? "0"), jsonResponse);
        }

        [HttpPost("{route}/{endpoint}")]
        public async Task<IActionResult> Post(string route, string endpoint, [FromBody] object jsonObject)
        {
            RestWrapper restService = new RestWrapper();

            ExpandoObject jsonResponse = restService.PostJsonAsync<ExpandoObject, dynamic?>(route, endpoint, Helper.ParseJsonObject(jsonObject)).Result;

            object statusCode = Helper.ParseResponse(jsonResponse, "StatusCode") ?? 0;

            return StatusCode(Int32.Parse(statusCode.ToString() ?? "0") == 0 ? 200 : Int32.Parse(statusCode.ToString() ?? "0"), jsonResponse);
        }

        [HttpPost("file/{route}/{endpoint}/{parameter?}")]
        public async Task<IActionResult> Upload(IFormFile file, string route, string endpoint, string parameter = null)
        {
            if (file != null && file.Length > 0)
            {
                RestWrapper restService = new RestWrapper();

                var content = new MultipartFormDataContent();
                var fileContent = new StreamContent(file.OpenReadStream());
                fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse(file.ContentType);

                content.Add(fileContent, "file", file.FileName);

                if (parameter != null)
                {
                    content.Add(new StringContent(parameter), "section");
                }

                ExpandoObject jsonResponse = restService.PostJsonAsync<ExpandoObject>(route, endpoint, content).Result;

                object statusCode = Helper.ParseResponse(jsonResponse, "StatusCode") ?? 0;

                return StatusCode(Int32.Parse(statusCode.ToString() ?? "0") == 0 ? 200 : Int32.Parse(statusCode.ToString() ?? "0"), jsonResponse);
            }

            return BadRequest();
        }
    }
}
