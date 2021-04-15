import {createContext} from "react";

const DataContext = createContext();

export default DataContext;
export const DataProvider = DataContext.Provider;