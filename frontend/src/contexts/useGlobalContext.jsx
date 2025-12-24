import { useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";

export function useGlobalContext() {
  return useContext(GlobalContext);
}