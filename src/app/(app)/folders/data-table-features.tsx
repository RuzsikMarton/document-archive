import {
  tableFeatures,
  rowSortingFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  columnOrderingFeature,
  columnSizingFeature,
  columnPinningFeature,
} from "@tanstack/react-table";

export const features = tableFeatures({
  rowSortingFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  columnOrderingFeature,
  columnSizingFeature,
  columnPinningFeature,
  manualFiltering: true,
});

export type DataTableFeatures = typeof features;
