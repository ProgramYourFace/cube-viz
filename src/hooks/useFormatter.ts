import { useMemo } from "react";

import { useCubeVizContext } from "@/provider";
import type { ValueFormatter } from "@/format";
import { createUnitsFormatter, mergeUnitConversions } from "@/units";

/**
 * The one DRY formatting path for hosts (docs/03-override-theme-preview.md §A2.5).
 *
 * Units are a CORE, on-by-default feature: when the host does NOT supply a
 * `locale.formatValue`, this returns the core {@link createUnitsFormatter}, built
 * from {@link mergeUnitConversions}(provider `locale.units`) so any host-registered
 * conversions are folded over the defaults. A host-supplied `formatValue` still
 * fully overrides (the pluggable seam stays). The result is memoized so the
 * formatter identity is stable across renders. The same formatter the families use,
 * exposed for a host that renders its own surface from `useNormalizedSeries`.
 *
 * @example
 *   const fmt = useFormatter();
 *   fmt({ value: 12345, member: "device_trips.total_distance", role: "value" });
 */
export function useFormatter(): ValueFormatter {
  const { locale } = useCubeVizContext();
  const { formatValue, units } = locale;
  return useMemo<ValueFormatter>(
    () => formatValue ?? createUnitsFormatter(mergeUnitConversions(units)),
    [formatValue, units],
  );
}
