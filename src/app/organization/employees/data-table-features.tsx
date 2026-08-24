import {
  tableFeatures,
  columnVisibilityFeature,
  rowSelectionFeature,
} from "@tanstack/react-table";

export const features = tableFeatures({
  columnVisibilityFeature,
  rowSelectionFeature,
});

export type DataTableFeatures = typeof features;
