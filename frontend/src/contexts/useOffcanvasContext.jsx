import { useContext } from "react";
import { OffcanvasContext } from "./OffcanvasContext.jsx";

export function useOffcanvasContext() {
  return useContext(OffcanvasContext);
}