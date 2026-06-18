import { useCubeVizContext } from "@/provider";
import { defaultFormatter } from "@/format";
import type { ValueFormatter } from "@/format";

/**
 * The one DRY formatting path for hosts (docs/03-override-theme-preview.md §A2.5).
 *
 * Returns the resolved host-pluggable {@link ValueFormatter}: the provider's
 * `locale.formatValue` when supplied (where a host implements unit conversion /
 * duration humanization / quantity rules), otherwise the library's minimal
 * {@link defaultFormatter}. The same formatter the families use, exposed for a host
 * that renders its own surface from `useNormalizedSeries`.
 *
 * @example
 *   const fmt = useFormatter();
 *   fmt({ value: 12345, member: "device_trips.total_distance", role: "value" });
 */
export function useFormatter(): ValueFormatter {
  const { locale } = useCubeVizContext();
  return locale.formatValue ?? defaultFormatter;
}
