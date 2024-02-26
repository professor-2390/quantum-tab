import Widget from "@/components/custom/Widget";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon as Icon } from "@/icons/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { h, Component } from "preact";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Search query must be at least 1 character.",
  }),
});

interface WidgetProps {
  enabled: boolean;
}

export default class EngineCard extends Component<WidgetProps> {
  render(): h.JSX.Element | null {
    const { enabled } = this.props;

    if (!enabled) {
      return null;
    }

    function onSubmit(data: z.infer<typeof FormSchema>): void {
      window.location.href = `https://duckduckgo.com/?q=${data.username.replace(
        " ",
        "+",
      )}`;
    }

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        username: "",
      },
    });

    return (
      <Widget title="Quick Search" icon={<Icon />}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-100 space-y-6 focus:outline-0"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search here"
                      {...field}
                      className="border-[3px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" style="width:100%;">
              🔍 Search
            </Button>
          </form>
        </Form>
      </Widget>
    );
  }
}
