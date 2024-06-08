"use client"
import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { CotTable } from "@/components/tables/cot-tables/cot-table";
import { Skeleton } from "@/components/ui/skeleton"
import { fetchCOTReportAction } from "@/redux/features/cotReportsSlice";

type paramsProps = {  
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams: paramsProps }) {
  const dispatch = useDispatch();
  const { status, reports, error } = useSelector((state) => state.cotReports);

  useEffect(() => {
    const dateStr =  "2024-03-26";
    dispatch(fetchCOTReportAction({from:dateStr,to:dateStr}))
  },[dispatch])

  console.log(status)
  if (status === 'loading') {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* <Skeleton className="h-[500px] w-100 rounded-xl" /> */}
      </div>
    )
  } else if (status === 'failed') {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <CotTable
          data={reports}
        />
      </div>
    </>
  )
}