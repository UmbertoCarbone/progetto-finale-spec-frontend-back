import { createContext, useContext } from "react";

// Creiamo il Context qui dentro
export const GlobalContext = createContext();

// Esportiamo l'hook come default
export default function useGlobalContext() {
  return useContext(GlobalContext);
}