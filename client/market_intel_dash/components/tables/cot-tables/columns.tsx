"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { COT } from "@/constants/data";

export const columns: ColumnDef<COT>[] = [
  {
    accessorKey: "asset",
    header: "Asset",
  },
  {
    accessorKey: "commercialPositionsLongAll",
    header: "Commercial Long Contracts",
  },
  {
    accessorKey: "commercialPositionsShortAll",
    header: "Commercial Short Contracts",
  },
  {
    accessorKey: "changeInCommercialLongAll",
    header: "Change In Commercial Long"
  },
  {
    accessorKey: "changeInCommercialShortAll",
    header: "Change in Commercial Short"
  },
  {
    accessorKey: "percentOfOICommercialLongAll",
    header: "Percent Of Commercial Long"
  },
  {
    accessorKey: "percentOfOICommercialShortAll",
    header: "Percent Of Commercial Short"
  },
  {
    accessorKey: "changeInOpenInterestAll",
    header: "Change in Open Interest"
  },
];
