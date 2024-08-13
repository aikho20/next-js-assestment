"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/config/store";
import Search from "@/components/ui/search";
import { CustomChart } from "@/components/ui/custom-chart";

export default function Home() {
  const stocks = useSelector((state: RootState) => state.stocks);
  return (
    <div className="p-5">
      <div>
        <p className="text-2xl text-gray-600 p-2">
          {stocks?.companyInfo?.companyName}
        </p>
        <Search />
      </div>
      <div className="grid md:grid-cols-7 grid-cols-1">
        <div className="col-span-4">
          <CustomChart value={stocks?.stockValue} />
        </div>
        <div className="col-span-3 border-1 p-4 overflow-auto ">
          <div className="bg-slate-100 p-2 rounded-md">
            <p className="text-gray-600 text-md text-bold mx-2">
              {stocks?.companyInfo?.symbol}
            </p>
            <div className=" p-2 rounded flex flex-row justify-around">
              <div className="flex flex-row p-4 justify0-center items-center">
                <p className="text-gray-800 text-lg">
                  {stocks?.companyInfo?.price}
                </p>
                <p className="text-gray-600 text-lg">
                  {stocks?.companyInfo?.currency}
                </p>
              </div>
              <div
                className={`flex flex-row p-4 justify0-center items-center ${
                  stocks?.companyInfo?.changes > 0
                    ? "text-lime-500"
                    : "text-red-500"
                }`}
              >
                <p className=" text-sm">{stocks?.companyInfo?.changes}</p>
                <p className=" text-xs">({stocks?.companyInfo?.mktCap})</p>
              </div>
            </div>
          </div>
          <div className="gap-x-2 flex flex-col space-y-3 p-3 border mt-3 rounded-md">
            <p className="text-gray-600 text-md text-bold">
              {stocks?.companyInfo?.companyName}
            </p>
            <p className="text-gray-600 text-xs">
              {stocks?.companyInfo?.exchange}
            </p>
            <p className="text-gray-600 text-xs">
              {stocks?.companyInfo?.website}
            </p>
            <p className="text-gray-600 text-xs">{stocks?.companyInfo?.ceo}</p>
            <p className="text-gray-600 text-xs">
              {stocks?.companyInfo?.currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
