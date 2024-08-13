"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";

import { SearchItemProps } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyInfo,
  setSearch,
  setStockValue,
} from "@/store/reducers/stocksReducer";
import { RootState } from "@/lib/config/store";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { SearchIcon } from "lucide-react";
import {
  useGetCompanySearchMutation,
  useGetStockValueMutation,
  useGetCompanyDetailsMutation,
} from "@/store/action/stocksAction";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [getStocks, { isLoading: isSearchingCompany }] =
    useGetCompanySearchMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const stocks = useSelector(
    (state: RootState) => state.stocks || { search: [] }
  );
  const [getCompanyDetails, { isLoading: isGettingCompanyInfo }] =
    useGetCompanyDetailsMutation();
  const [getStockValue, { isLoading: isFetchingStockValue }] =
    useGetStockValueMutation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) handleSearch(searchQuery);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async (e: string) => {
    const res = await getStocks({ symbol: e }).unwrap();
    dispatch(setSearch(res));
  };
  const handleCompanyProfileInfo = async (e: string) => {
    const res = await getCompanyDetails({ symbol: e }).unwrap();
    dispatch(setCompanyInfo(res?.[0]));
  };

  const handleStockValue = async (e: string) => {
    const date = new Date();
    const res = await getStockValue({
      symbol: e,
      from: date.setDate(date.getDate() - 30).toString(),
      to: date.toString(),
    }).unwrap();
    dispatch(setStockValue(res));
    console.log(res);
  };

  const searchResult = useMemo(
    () => (isSearchingCompany ? Array(5).fill({}) : stocks.search || []),
    [isSearchingCompany, stocks?.search]
  );

  return (
    <div className="w-full">
      <Popover open={isOpen}>
        <PopoverAnchor asChild>
          <div className="flex md:w-[375px] w-full">
            <div className="relative grow p-px">
              <SearchIcon
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                onClick={() => setIsOpen(true)}
                placeholder="Search..."
                className="rounded-2.5 pl-[40px] text-4 md:w-[375px] w-full"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                value={searchQuery}
              />
            </div>
          </div>
        </PopoverAnchor>
        <PopoverContent className="md:w-[375px] w-full">
          <div className="max-h-[400px] overflow-auto w-full">
            {isSearchingCompany ? (
              <p className="text-sm tex-center p-4 text-gray-400 w-full">
                Searching...
              </p>
            ) : (
              <div className="min-w-full">
                {Array.isArray(searchResult) && searchResult.length > 0 ? (
                  searchResult?.map((items: SearchItemProps, index: number) => (
                    <div
                      className="flex flex-row justify-end hover:bg-slate-100 cursor-pointer w-full p-2 rounded"
                      key={index}
                      onClick={() => {
                        setIsOpen(false);
                        setSearchQuery(items.symbol);
                        handleCompanyProfileInfo(items.symbol);
                        handleStockValue(items.symbol);
                      }}
                    >
                      <p className="w-full text-xs text-gray-600 p-1 truncate">
                        {items.symbol} - {items.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm p-4 text-gray-400 min-w-full">
                    No result found.
                  </p>
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
