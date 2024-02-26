import Widget from "@/components/custom/Widget";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FocusIcon as Icon } from "@/icons/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { h, Component } from "preact";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FocusWidgetState {
  focus: string;
}

const FormSchema = z.object({
  focus: z.string().min(1, {
    message: "Focus must be at least 1 character.",
  }),
});

interface WidgetProps {
  enabled: boolean;
}

export default class FocusWidget extends Component<
  WidgetProps,
  FocusWidgetState
> {
  constructor(props: WidgetProps) {
    super(props);
    const storedFocus = localStorage.getItem("dailyFocus") || "";
    this.state = {
      focus: storedFocus,
    };
  }

  componentDidUpdate(prevProps: WidgetProps): void {
    const { enabled } = this.props;

    if (enabled !== prevProps.enabled) {
      if (enabled) {
        const storedFocus = localStorage.getItem("dailyFocus") || "";
        this.setState({ focus: storedFocus });
      }
    }
  }

  render(): h.JSX.Element | null {
    const { enabled } = this.props;

    if (!enabled) {
      return null;
    }

    const onSubmit = (data: { focus: string }, event: any) => {
      event.preventDefault();
      localStorage.setItem("dailyFocus", data.focus);
      this.setState({ focus: data.focus });
      form.reset();
      event.target.reset();
    };

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        focus: "",
      },
    });

    return (
      <Widget title="What's your focus today?" icon={<Icon />}>
        <Form {...form}>
          <form
            onSubmit={(event) =>
              form.handleSubmit((data) => onSubmit(data, event))(event)
            }
            className="w-100  space-y-6 focus:outline-0"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="focus"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your focus"
                      {...field}
                      className="border-[3px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <ScrollArea className="h-[50px] overflow-auto pt-3">
          {this.state.focus && (
            <div className="text-sm font-bold text-yellow-300">
              {this.state.focus}
            </div>
          )}
        </ScrollArea>
      </Widget>
    );
  }
}
