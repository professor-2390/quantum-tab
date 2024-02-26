import Settings from "@/components/custom/Settings";
import ClockWidget from "@/components/widgets/ClockWidget";
import DailyFocusWidget from "@/components/widgets/DailyFocusWidget";
import DateWidget from "@/components/widgets/DateWidget";
import QOTDWidget from "@/components/widgets/QOTDWidget";
import QuickSearchWidget from "@/components/widgets/QuickSearchWidget";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import { useState, useEffect } from "preact/hooks";

export type WidgetConfig = {
  clock: {
    enabled: boolean;
    use24HourFormat: boolean;
  };
  date: { enabled: boolean; useLongDateFormat: boolean };
  weather: { enabled: boolean };
  focus: { enabled: boolean };
  qotd: { enabled: boolean };
  search: { enabled: boolean };
};

export function App() {
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
    clock: { enabled: true, use24HourFormat: true },
    date: { enabled: true, useLongDateFormat: true },
    weather: { enabled: true },
    focus: { enabled: true },
    qotd: { enabled: true },
    search: { enabled: true },
  });

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleWidget = (widgetName: string) => {
    const widgetNameKey = widgetName as keyof WidgetConfig;
    setWidgetConfig((prevConfig) => {
      const updatedConfig = {
        ...prevConfig,
        [widgetNameKey]: {
          ...prevConfig[widgetNameKey],
          enabled: !prevConfig[widgetNameKey].enabled,
        },
      };
      localStorage.setItem("widgetConfig", JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  const toggleClock24HourFormat = (use24HourFormat: boolean) => {
    setWidgetConfig((prevConfig) => {
      const updatedConfig = {
        ...prevConfig,
        clock: {
          ...prevConfig.clock,
          use24HourFormat,
        },
      };
      localStorage.setItem("widgetConfig", JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  const toggleLongDateFormat = (useLongDateFormat: boolean) => {
    setWidgetConfig((prevConfig) => {
      const updatedConfig = {
        ...prevConfig,
        date: {
          ...prevConfig.date,
          useLongDateFormat,
        },
      };
      localStorage.setItem("widgetConfig", JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  const fetchRandomImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://source.unsplash.com/random/1920x1080/",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch image from Unsplash");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setBackgroundImage(url);
      localStorage.setItem("backgroundImage", url);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const storedConfigJson = localStorage.getItem("widgetConfig");
  //   const storedConfig: WidgetConfig | null = storedConfigJson
  //     ? JSON.parse(storedConfigJson)
  //     : null;
  //   if (storedConfig) {
  //     setWidgetConfig(storedConfig);
  //   }
  //   const cachedImageUrl = localStorage.getItem("backgroundImage");
  //   if (cachedImageUrl) {
  //     setBackgroundImage(cachedImageUrl);
  //   }
  //   const cleanup = () => {
  //     if (backgroundImage) {
  //       URL.revokeObjectURL(backgroundImage);
  //     }
  //   };
  //   fetchRandomImage();
  //   return cleanup;
  // }, []);

  useEffect(() => {
    const storedConfigJson = localStorage.getItem("widgetConfig");
    const storedConfig: WidgetConfig | null = storedConfigJson
      ? JSON.parse(storedConfigJson)
      : null;
    if (storedConfig) {
      setWidgetConfig(storedConfig);
    }

    const cachedImageUrl = localStorage.getItem("backgroundImage");
    if (cachedImageUrl) {
      setBackgroundImage(cachedImageUrl);
    }

    const cleanup = () => {
      if (backgroundImage) {
        URL.revokeObjectURL(backgroundImage);
      }
    };

    const fetchInitialData = async () => {
      try {
        await Promise.all([fetchRandomImage()]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    return cleanup;
  }, []);

  return (
    <>
      <div className="relative">
        {backgroundImage && (
          <div
            className={`absolute inset-0 z-0 transition-opacity duration-300 ${
              loading ? "opacity-60" : "opacity-80"
            }`}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
              minWidth: "100%",
              zIndex: -1,
            }}
          ></div>
        )}
        <div className="flex">
          <div className="container mx-auto mt-12">
            <Settings
              onToggleWidget={toggleWidget}
              onToggleClock24HourFormat={toggleClock24HourFormat}
              onToggleLongDateFormat={toggleLongDateFormat}
              widgetConfig={widgetConfig}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {widgetConfig.clock && (
                <ClockWidget
                  enabled={widgetConfig.clock.enabled}
                  use24HourFormat={widgetConfig.clock.use24HourFormat}
                  onToggle24HourFormat={toggleClock24HourFormat}
                />
              )}
              {widgetConfig.date && (
                <DateWidget
                  enabled={widgetConfig.date.enabled}
                  useLongDateFormat={widgetConfig.date.useLongDateFormat}
                  onToggleLongDateFormat={toggleLongDateFormat}
                />
              )}
              {widgetConfig.weather && (
                <WeatherWidget enabled={widgetConfig.weather.enabled} />
              )}
              {widgetConfig.qotd && (
                <QOTDWidget enabled={widgetConfig.qotd.enabled} />
              )}
              {widgetConfig.search && (
                <QuickSearchWidget enabled={widgetConfig.search.enabled} />
              )}
              {widgetConfig.focus && (
                <DailyFocusWidget enabled={widgetConfig.focus.enabled} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
