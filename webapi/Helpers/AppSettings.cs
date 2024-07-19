namespace webapi.Helpers
{
    public class AppSettings
    {
        private static AppSettings appSettings;

        public string UrlBase { get; set; }

        public AppSettings(IConfiguration config)
        {
            this.UrlBase = config.GetValue<string>("Prod");
            
            //#if DEBUG
            //    this.UrlBase = config.GetValue<string>("Dev");
            //#endif

            // Now set Current
            appSettings = this;
        }

        public static AppSettings Current
        {
            get
            {
                if (appSettings == null)
                {
                    appSettings = GetUrlBase();
                }

                return appSettings;
            }
        }

        public static AppSettings GetUrlBase()
        {
            var builder = new ConfigurationBuilder()
                            .SetBasePath(Directory.GetCurrentDirectory())
                            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                            .AddEnvironmentVariables();

            IConfigurationRoot configuration = builder.Build();

            var settings = new AppSettings(configuration.GetSection("UrlBase"));

            return settings;
        }
    }
}
