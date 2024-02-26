import Widget from "@/components/custom/Widget";
import { ClockIcon as Icon } from "@/icons/icons";
import { h, Component } from "preact";

interface ClockWidgetState {
  currentTime: string;
}

interface WidgetProps {
  enabled: boolean;
  use24HourFormat: boolean;
  onToggle24HourFormat: (use24HourFormat: boolean) => void;
}

export default class ClockWidget extends Component<
  WidgetProps,
  ClockWidgetState
> {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props: WidgetProps) {
    super(props);
    this.state = {
      currentTime: this.getCurrentTime(),
    };
  }

  componentDidMount(): void {
    this.startInterval();
  }

  componentDidUpdate(prevProps: WidgetProps): void {
    if (
      prevProps.enabled !== this.props.enabled ||
      prevProps.use24HourFormat !== this.props.use24HourFormat
    ) {
      if (this.props.enabled) {
        this.stopInterval();
        this.setState(
          {
            currentTime: this.getCurrentTime(),
          },
          () => {
            this.startInterval();
          },
        );
      } else {
        this.stopInterval();
      }
    }
  }

  componentWillUnmount(): void {
    this.stopInterval();
  }

  private startInterval(): void {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: this.getCurrentTime(),
      });
    }, 1000);
  }

  private stopInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private getCurrentTime(): string {
    const now = new Date();
    const hours = this.props.use24HourFormat
      ? now.getHours().toString().padStart(2, "0")
      : (((now.getHours() + 11) % 12) + 1).toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  render(): h.JSX.Element | null {
    const { enabled } = this.props;

    if (!enabled) {
      return null;
    }

    return (
      <Widget title="Current Time" icon={<Icon />}>
        <div className="text-4xl font-bold">{this.state.currentTime}</div>
        <p className="pt-2 text-[15px] text-muted-foreground">
          Time Zone{" "}
          {
            new Date()
              .toLocaleTimeString("en", { timeZoneName: "short" })
              .split(" ")[2]
          }
        </p>
      </Widget>
    );
  }
}
