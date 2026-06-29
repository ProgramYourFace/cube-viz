import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/** Isolates a render-time crash in one widget to that widget — renders the same
 *  destructive Alert chrome as ChartRenderer's fetch-error state (message only,
 *  never leaks tenant data) so a sibling crash can't blank the whole dashboard. */
export class ChartErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error("cube-viz: chart render failed", error, info.componentStack);
  }
  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      return (
        <Alert variant="destructive" className="cv:w-full">
          <AlertCircle />
          <AlertTitle>Failed to render chart</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      );
    }
    return this.props.children;
  }
}
