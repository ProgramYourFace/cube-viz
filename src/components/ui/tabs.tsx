import * as React from "react";

import { cn } from "@/components/ui/utils";

/**
 * A minimal, dependency-free Tabs (Radix tabs is NOT installed). Controlled or
 * uncontrolled via `value`/`defaultValue` + `onValueChange`. Styling mirrors the
 * shadcn "new-york" Tabs so it reads identically to the rest of the kit. Used by
 * the editor panels to switch between config sub-sections (e.g. Data / Display /
 * Format) at narrow container widths where horizontal Sections would crowd.
 */

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error(`<${component}> must be used within <Tabs>`);
  return ctx;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function Tabs({
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps): React.ReactElement {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = React.useState<string>(defaultValue ?? "");
  const value = isControlled ? valueProp : internal;
  const reactId = React.useId();

  const setValue = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange],
  );

  const ctx = React.useMemo<TabsContextValue>(
    () => ({ value, setValue, baseId: reactId }),
    [value, setValue, reactId],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div data-slot="tabs" className={cn("cv-tabs", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      role="tablist"
      data-slot="tabs-list"
      className={cn("cv-tabs-list", className)}
      {...props}
    />
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabsTrigger({
  value,
  className,
  ...props
}: TabsTriggerProps): React.ReactElement {
  const { value: active, setValue, baseId } = useTabsContext("TabsTrigger");
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-trigger-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-content-${value}`}
      data-slot="tabs-trigger"
      data-state={selected ? "active" : "inactive"}
      onClick={() => setValue(value)}
      // Active/inactive styling keys off the data-state attribute in ui.css.
      className={cn("cv-tabs-trigger", className)}
      {...props}
    />
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({
  value,
  className,
  ...props
}: TabsContentProps): React.ReactElement | null {
  const { value: active, baseId } = useTabsContext("TabsContent");
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-content-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      data-slot="tabs-content"
      className={cn("cv-tabs-content", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
