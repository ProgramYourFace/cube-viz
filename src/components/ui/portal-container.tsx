import * as React from "react";

/**
 * The node Radix portals (popovers, selects, dropdowns) should render INTO.
 *
 * Why this exists: cube-viz scopes its theme tokens to the provider subtree — the
 * `.cv-root` wrapper carries `.dark` / `.cube-viz-light`, and everything below it
 * reads `--background`, `--foreground`, … from there. A Radix `Portal` defaults to
 * `document.body`, which is OUTSIDE that subtree, so a portalled surface resolved
 * its tokens against `:root` and painted in the LIGHT palette no matter what mode
 * the provider was in. Pointing every portal back at `.cv-root` puts the surface
 * under the same token scope as the control that opened it — and, just as
 * importantly, under the HOST's own theme when a host themes cube-viz itself.
 *
 * `null` (no provider, e.g. a bare component in a test) means "Radix default".
 */
const PortalContainerContext = React.createContext<HTMLElement | null>(null);

export function PortalContainerProvider({
  container,
  children,
}: {
  container: HTMLElement | null;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <PortalContainerContext.Provider value={container}>{children}</PortalContainerContext.Provider>
  );
}

/** The themed portal target, or `undefined` to let Radix fall back to the body. */
export function usePortalContainer(): HTMLElement | undefined {
  return React.useContext(PortalContainerContext) ?? undefined;
}
