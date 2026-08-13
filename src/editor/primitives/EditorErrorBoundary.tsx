import * as React from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Contains a render-time crash to the EDITOR SURFACE it wraps.
 *
 * The editor is a tree of small controls over one spec, and any one of them can be
 * handed a shape it did not expect — a value bound to a variable where a literal was
 * assumed, an option written by a newer library version, a half-migrated preset. Left
 * unguarded, one such control throws, React unmounts the whole tree, and the user
 * loses the entire dashboard to a blank "something went wrong" — with nothing naming
 * WHICH knob did it, and no way back in to fix the value that caused it.
 *
 * So every surface that can be reasoned about on its own — a config popover, a well,
 * the whole on-chart overlay — wraps itself in one of these. The failure then reads as
 * a message inside that surface, the rest of the editor keeps working, and the spec is
 * still editable everywhere else (including, usually, undo).
 *
 * `label` names the surface in the message ("Trend couldn't be shown"), which is the
 * part that turns a crash into an instruction.
 *
 * Reset: the boundary clears its error whenever `resetKey` changes, so editing the
 * offending value (a new spec object) puts the surface back without a remount by the
 * caller.
 */
interface Props {
  /** What this surface IS, in the user's words — e.g. "Trend", "Value axis". */
  label: string;
  /** Change this to clear a captured error (typically the spec being edited). */
  resetKey?: unknown;
  children: React.ReactNode;
}

interface State {
  error: Error | null;
  resetKey: unknown;
}

export class EditorErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null, resetKey: this.props.resetKey };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    // A new resetKey means the user changed something — give the surface another go
    // rather than leaving it stuck on a stale failure.
    if (props.resetKey !== state.resetKey) return { error: null, resetKey: props.resetKey };
    return null;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error(`cube-viz: ${this.props.label} failed to render`, error, info.componentStack);
  }

  render(): React.ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="cv-ed-broken" role="alert">
        <AlertTriangle className="cv-ed-broken-icon" aria-hidden />
        <div>
          <strong className="cv-ed-broken-title">{this.props.label} couldn’t be shown</strong>
          <p className="cv-ed-broken-msg">{error.message}</p>
          <p className="cv-ed-broken-hint">
            The rest of the chart is still editable — undo the last change to this
            control, or clear the value it holds.
          </p>
        </div>
      </div>
    );
  }
}
