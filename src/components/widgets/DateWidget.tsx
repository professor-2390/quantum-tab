import Widget from "@/components/custom/Widget";
import { DateIcon as Icon } from "@/icons/icons";
import { h, Component } from "preact";

interface DateWidgetProps {
  enabled: boolean;
  useLongDateFormat: boolean;
  onToggleLongDateFormat: (useLongDateFormat: boolean) => void;
}

interface DateWidgetState {
  currentDate: string;
  intervalId: NodeJS.Timeout | null;
}

export default class DateWidget extends Component<
  DateWidgetProps,
  DateWidgetState
> {
  constructor(props: DateWidgetProps) {
    super(props);
    this.state = {
      currentDate: this.getCurrentDate(),
      intervalId: null,
    };
  }

  componentDidMount(): void {
    if (this.props.enabled) {
      this.startInterval();
    }
  }

  componentDidUpdate(prevProps: DateWidgetProps): void {
    if (prevProps.enabled !== this.props.enabled) {
      if (this.props.enabled) {
        this.startInterval();
      } else {
        this.stopInterval();
      }
    }

    if (prevProps.useLongDateFormat !== this.props.useLongDateFormat) {
      this.setState({ currentDate: this.getCurrentDate() });
    }
  }

  componentWillUnmount(): void {
    this.stopInterval();
  }

  private getCurrentDate(): string {
    const { useLongDateFormat } = this.props;
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: useLongDateFormat ? "long" : "short", // Update the month format based on the prop value
      day: "numeric",
    };
    return new Date().toLocaleDateString(undefined, options);
  }

  private startInterval(): void {
    const now: any = new Date();
    const midnight: any = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight - now;

    const intervalId = setInterval(() => {
      this.setState({
        currentDate: this.getCurrentDate(),
      });
    }, timeUntilMidnight);

    this.setState({ intervalId });
  }

  private stopInterval(): void {
    const { intervalId } = this.state;
    if (intervalId) {
      clearInterval(intervalId);
      this.setState({ intervalId: null });
    }
  }

  render(): h.JSX.Element | null {
    const { enabled } = this.props;

    if (!enabled) {
      return null;
    }
    return (
      <Widget title="Current Date" icon={<Icon />}>
        <div className="text-4xl font-bold">{this.state.currentDate}</div>
        <p className="pt-2 text-[15px] text-muted-foreground">Current Date</p>
      </Widget>
    );
  }
}
