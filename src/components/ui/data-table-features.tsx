import {
  tableFeatures,
  rowSortingFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  columnSizingFeature,
} from "@tanstack/react-table";

export const features = tableFeatures({
  rowSortingFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  columnSizingFeature,
});

export type DataTableFeatures = typeof features;
