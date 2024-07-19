using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Dynamic;
using System.Globalization;
using System.Reflection;
using System.Resources;
using System.Text.Json.Nodes;

namespace webapi.Helpers
{
    public static class Helper
    {
        public static string GetResource(string resourceName, string resourceKey)
        {
            ResourceManager resource = new ResourceManager(resourceName, Assembly.Load("Resources"));
            string resourceValue = resource.GetString(resourceKey);
            
            return resourceValue;
        }

        public static dynamic? ParseJsonObject(object jsonRequest)
        {
            var converter = new ExpandoObjectConverter();
            var exObjExpandoObject = JsonConvert.DeserializeObject<ExpandoObject>(jsonRequest.ToString(), converter) as dynamic;

            return exObjExpandoObject;
        }

        public static object? ParseResponse(object jsonResponse, string property)
        {
            IDictionary<string, object> dictionary = (IDictionary<string, object>)jsonResponse;

            var properyValue = dictionary[property];

            return properyValue;
        }
    }
}
