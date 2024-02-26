import Widget from "@/components/custom/Widget";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuoteIcon as Icon } from "@/icons/icons";
import { h, Component } from "preact";

const QUOTABLE_API_URL = "https://api.quotable.io/random";

interface WidgetProps {
  enabled: boolean;
}

interface QOTDWidgetState {
  currentQuote: string | null;
}

export default class QOTDWidget extends Component<
  WidgetProps,
  QOTDWidgetState
> {
  private cachedQuoteKey = "cachedQuote";
  private lastUpdateDateKey = "lastUpdateDate";

  constructor(props: WidgetProps) {
    super(props);
    this.state = {
      currentQuote: null,
    };
  }

  componentDidMount(): void {
    const { enabled } = this.props;
    if (enabled) {
      this.fetchNewQuoteIfNeeded();
    }
  }

  componentDidUpdate(prevProps: WidgetProps): void {
    const { enabled } = this.props;
    if (enabled !== prevProps.enabled && enabled) {
      this.fetchNewQuoteIfNeeded();
    }
  }

  private fetchNewQuoteIfNeeded = async (): Promise<void> => {
    const cachedQuote = localStorage.getItem(this.cachedQuoteKey);
    const lastUpdateDate = localStorage.getItem(this.lastUpdateDateKey);

    if (cachedQuote && lastUpdateDate) {
      const currentDate = new Date().toISOString().slice(0, 10);
      if (currentDate === lastUpdateDate) {
        // Use cached quote if it was updated today
        this.setState({ currentQuote: cachedQuote });
        return;
      }
    }

    // Fetch new quote if it's a new day or no cached quote exists
    await this.fetchNewQuote();
  };

  private fetchNewQuote = async (): Promise<void> => {
    try {
      const response = await fetch(QUOTABLE_API_URL);
      const data = await response.json();
      const currentQuote = `${data.content} - ${data.author}`;

      // Update state with new quote
      this.setState({ currentQuote });

      // Cache the new quote and update the last update date
      localStorage.setItem(this.cachedQuoteKey, currentQuote);
      const currentDate = new Date().toISOString().slice(0, 10);
      localStorage.setItem(this.lastUpdateDateKey, currentDate);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  render(): h.JSX.Element | null {
    const { currentQuote } = this.state;
    const { enabled } = this.props;

    if (!enabled) {
      return null;
    }

    return (
      <Widget title="Quote of the Day" icon={<Icon />}>
        <ScrollArea className="h-[104px] rounded-md border border-none text-base">
          {currentQuote || "Loading..."}
        </ScrollArea>
      </Widget>
    );
  }
}
