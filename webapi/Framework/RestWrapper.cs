namespace webapi.Framework
{
    using Newtonsoft.Json;
    using System.Net.Http.Headers;
    using System.Text;
    using webapi.Helpers;

    public class RestWrapper
    {
        /// <summary>
		/// Realiza una llamada tipo GET (verbo HTTP) asíncrona, enviandole una solicitud en formato Json
		/// </summary>
		/// <param name="controller">Uri base del servicio</param>
		/// <param name="methodAddress">Uri del método del servicio que se va a consumir</param>
		/// <returns>Respuesta (objeto Response) que devuelve el servicio</returns>
		public async Task<TResponse> GetJsonAsync<TResponse>(string controller, string methodAddress) where TResponse : class
        {
            Uri baseAddress = new Uri(AppSettings.GetUrlBase().UrlBase);

            HttpClient client = new HttpClient()
            {
                BaseAddress = baseAddress
            };

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage responseMessage = await client.GetAsync($"{controller}/{methodAddress}").ConfigureAwait(false);

            var responseContent = string.Empty;
            if (!responseMessage.IsSuccessStatusCode)
            {
                responseContent = await responseMessage.Content.ReadAsStringAsync();
            }
            else
            {
                responseContent = await responseMessage.Content.ReadAsStringAsync();
            }

            TResponse result = JsonConvert.DeserializeObject<TResponse>(responseContent);

            return result;
        }

        /// <summary>
		/// Realiza una llamada tipo POST (verbo HTTP) asíncrona, enviandole una solicitud en formato Json
		/// </summary>
		/// <param name="controller">Uri base del servicio</param>
		/// <param name="methodAddress">Uri del método del servicio que se va a consumir</param>
		/// <param name="request">Objeto con los datos de la solicitud que se va a enviar al servicio</param>
		/// <returns>Respuesta (objeto Response) que devuelve el servicio</returns>
		public async Task<TResponse> PostJsonAsync<TResponse, TRequest>(string controller, string methodAddress, TRequest request, Dictionary<string, string> headers = null) where TRequest : class where TResponse : class
        {
            Uri baseAddress = new Uri(AppSettings.GetUrlBase().UrlBase);

            HttpClient client = new HttpClient()
            {
                BaseAddress = baseAddress
            };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            if (headers != null)
            {
                foreach (var item in headers)
                {
                    client.DefaultRequestHeaders.Add(item.Key, item.Value);
                }
            }

            var serializedRequest = JsonConvert.SerializeObject(request);


            var requestContent = new StringContent(serializedRequest, Encoding.Unicode, "application/json");

            var responseMessage = await client.PostAsync($"{controller}/{methodAddress}", requestContent).ConfigureAwait(false);

            var responseContent = string.Empty;

            if (!responseMessage.IsSuccessStatusCode)
            {
                responseContent = await responseMessage.Content.ReadAsStringAsync();
            }
            else
            {
                responseContent = await responseMessage.Content.ReadAsStringAsync();

            }

            var result = JsonConvert.DeserializeObject<TResponse>(responseContent);
            return result;
        }

        /// <summary>
		/// Realiza una llamada tipo POST (verbo HTTP) asíncrona, enviandole una solicitud en formato Json
		/// </summary>
		/// <param name="controller">Uri base del servicio</param>
		/// <param name="methodAddress">Uri del método del servicio que se va a consumir</param>
		/// <param name="request">Objeto con los datos de la solicitud que se va a enviar al servicio</param>
		/// <returns>Respuesta (objeto Response) que devuelve el servicio</returns>
		public async Task<TResponse> PostJsonAsync<TResponse>(string controller, string methodAddress, MultipartFormDataContent request, Dictionary<string, string> headers = null) where TResponse : class
        {
            Uri baseAddress = new Uri(AppSettings.GetUrlBase().UrlBase);

            HttpClient client = new HttpClient
            {
                BaseAddress = baseAddress
            };

            client.DefaultRequestHeaders.Accept.Clear();

            HttpResponseMessage responseMessage = await client.PostAsync($"{controller}/{methodAddress}", request).ConfigureAwait(false);

            string responseContent = string.Empty;

            if (responseMessage.IsSuccessStatusCode)
            {
                responseContent = await responseMessage.Content.ReadAsStringAsync();
            }
            else
            {
                responseContent = $"{responseMessage.ReasonPhrase} ";
                responseContent += await responseMessage.Content.ReadAsStringAsync();
            }

            return JsonConvert.DeserializeObject<TResponse>(responseContent);
        }
    }
}
