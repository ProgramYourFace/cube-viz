import * as React from "react";

import type { VariableDecl } from "@/spec";

/**
 * Ambient access to dashboard-variable ADMIN from inside the chart editor. Variables
 * are dashboard-level, but binding controls (deep in the chart editor) need to create
 * one inline. Rather than thread a callback through the overlay → pills → popovers,
 * the editor host (WidgetEditPanel) provides `createVariable` here and the binding
 * controls consume it. Absent provider (e.g. a standalone chart with no dashboard) →
 * inline creation is simply unavailable.
 */

export interface VariableAdmin {
  /** Create + register a new dashboard variable (and return it for immediate binding). */
  createVariable?: (decl: VariableDecl) => void;
}

const VariableAdminContext = React.createContext<VariableAdmin>({});

export function VariableAdminProvider({
  createVariable,
  children,
}: {
  createVariable?: (decl: VariableDecl) => void;
  children: React.ReactNode;
}): React.ReactElement {
  const value = React.useMemo<VariableAdmin>(() => ({ createVariable }), [createVariable]);
  return <VariableAdminContext.Provider value={value}>{children}</VariableAdminContext.Provider>;
}

export function useVariableAdmin(): VariableAdmin {
  return React.useContext(VariableAdminContext);
}
