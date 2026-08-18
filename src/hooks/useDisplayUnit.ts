import * as React from "react";

import { useCubeVizContext } from "@/provider";
import { mergeUnitConversions } from "@/units";

/**
 * Storage-unit → DISPLAY-unit mapper for the current viewer ("km" → "mi" when the
 * locale says imperial; identity otherwise). One hook so the axis badge, the field
 * picker's unit chips and the placed-pill chips can never disagree about what unit
 * the chart will actually render. Stable across renders for a given locale.
 */
export function useDisplayUnit(): (unit?: string) => string | undefined {
  const { locale } = useCubeVizContext();
  const conversions = React.useMemo(() => mergeUnitConversions(locale?.units), [locale?.units]);
  return React.useCallback(
    (unit?: string): string | undefined =>
      unit && locale?.unitSystem === "imperial" && conversions[unit]
        ? conversions[unit].imperialUnit
        : unit,
    [locale?.unitSystem, conversions],
  );
}
