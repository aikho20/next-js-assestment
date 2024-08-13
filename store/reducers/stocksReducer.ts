import { RootState } from "@/lib/config/store";
import {
  SearchItemProps,
  CompanyInfoProps,
  stockValueProps,
} from "@/types/types";
import {
  companyInfoInitValues,
  historyInitialValues,
} from "@/utils/initialValues";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  search: SearchItemProps[];
  companyInfo: CompanyInfoProps;
  stockValue: {
    symbol: string;
    historical: stockValueProps[];
  };
}
const initialState: InitialState = {
  stockValue: historyInitialValues,
  search: [],
  companyInfo: companyInfoInitValues,
};

const stocksReducer = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSearch: (state, actions) => {
      state.search = actions.payload || [];
    },
    setCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
    setStockValue: (state, action) => {
      state.stockValue = action.payload;
    },
  },
});
export const getStoreState = createSelector(
  (state: RootState) => state,
  ({ stocks }) => stocks
);
export const { setSearch, setCompanyInfo, setStockValue } =
  stocksReducer.actions;

export default stocksReducer.reducer;
