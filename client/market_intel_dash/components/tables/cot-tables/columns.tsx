"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { COT } from "@/constants/data";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank,
  })
  // Return if the item should be filtered in/out
  return itemRank.passed
};

export const uniqueFilter = (rows) => {
  const assets = new Set();
  return rows.reduce((memo,item) => {
    const val = item.original.asset;
    if (!assets.has(val)) {
      assets.add(val)
      memo.push(item)
    }
    return memo;
  },[])
}

export const columns: ColumnDef<COT>[] = [
  {
    accessorKey: "asset",
    header: "Asset"
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
    header: "% Of Commercial Long"
  },
  {
    accessorKey: "percentOfOICommercialShortAll",
    header: "% Of Commercial Short"
  },
  {
    accessorKey:"noncommercialPositionsLongAll",
    header: "Non Commercial Long"
  },
  {
    accessorKey:"noncommercialPositionsShortAll",
    header: "Non Commercial Short"
  },
  {
    accessorKey:"percentOfOINoncommercialLongAll",
    header: "% None Commercial Long"
  },
  {
    accessorKey:"percentOfOINoncommercialShortAll",
    header: "% Non Commercial Short"
  },
  {
    accessorKey: "changeInOpenInterestAll",
    header: "Change in Open Interest"
  },
  {
    accessorKey: "openInterestAll",
    header: "Open Interest All"
  }
];


export const columnsRating:ColumnDef<> = []

export const columnsRetail:ColumnDef<COT> = [
  {
    accessorKey: "asset",
    header: "Asset",
    cell: info => info.getValue()
  },
  {
    accessorKey: "noncommercialPositionsLongAll",
    header: "Non Commercial Positions Long All"
  },
  {
    accessorKey: "noncommercialPositionsShortAll",
    header: "Non Commercial Positions Short All"
  },
  {
    accessorKey: "tradersNoncommercialLongAll",
    header: ""
  }
]