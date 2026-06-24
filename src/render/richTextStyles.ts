/**
 * The ONE typography class for rich text — shared by the read-only {@link TextWidget}
 * and the editable TextWidgetEditor so what you type looks exactly like what renders.
 *
 * The actual styles live in `./richtext.css` as PLAIN CSS (explicit `.cube-viz-prose
 * h1 { … }` selectors), bundled into dist/cube-viz.css. This used to be a list of
 * Tailwind arbitrary variants (`[&_h1]:text-2xl`, …), but a consumer's Tailwind build
 * doesn't reliably extract classes from a JS constant, so headings rendered unstyled.
 * Plain CSS makes rich text render identically regardless of any host Tailwind.
 */
import "./richtext.css";

export const RICH_TEXT_CLASS = "cube-viz-prose";
