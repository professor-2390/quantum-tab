import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Component, ComponentChildren } from "preact";

interface WidgetProps {
  title: string;
  icon: object;
  children: ComponentChildren;
}

class Widget extends Component<WidgetProps, {}> {
  render({ title, icon, children }: WidgetProps) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent className="w-100">{children}</CardContent>
      </Card>
    );
  }
}

export default Widget;
