import { CotTable } from "@/components/tables/cot-tables/cot-table";
import CotData from './cot.json'

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams: paramsProps }) {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1>test</h1>
        <CotTable
          data={CotData}
        />
      </div>
    </>
  )
}