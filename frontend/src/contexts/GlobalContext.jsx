import { createContext, useState, useEffect } from "react";

// Creazione del contesto globale
const GlobalContext = createContext();
// URL dell'API, preso dalle variabili d'ambiente
const apiUrl = import.meta.env.VITE_REACT_APP_URL_JSON;

const GlobalProvider = ({ children }) => {
  // Stato per la lista dei prodotti
  const [products, setProducts] = useState([]);

  // Stato per i preferiti, inizializzato da localStorage se presente
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("my_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  // Stato per la visibilità del popup dei preferiti
  const [isFavOpen, setIsFavOpen] = useState(false);
  //Apri a chiude pag di confronto
  const [showPanel, setShowPanel] = useState(false);

  // Stato per la lista di confronto prodotti (max 2)
  const [compareList, setCompareList] = useState([]);

  // Salva i preferiti su localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem("my_favorites", JSON.stringify(favorites));
  }, [favorites]);

  //apri e chiude pag di confronto
  useEffect(() => {
    setShowPanel(compareList.length > 0);
  }, [compareList]);

  // Aggiunge o rimuove un prodotto dai preferiti
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (!exists) setIsFavOpen(true); // Mostra popup se aggiunto
      return exists
        ? prev.filter((p) => p.id !== product.id) // Rimuovi se già presente
        : [...prev, product]; // Aggiungi se non presente
    });
  };

  // Aggiunge o rimuove un prodotto dalla lista di confronto (max 2 prodotti)
  const toggleCompare = (product) => {
    setCompareList((list) => {
      const exists = list.some((p) => p.id === product.id);
      if (exists) return list.filter((p) => p.id !== product.id); // Rimuovi se già presente
      if (list.length >= 2) return list; // Non aggiungere se già 2 prodotti
      return [...list, product]; // Aggiungi se non presente
    });
  };

  // Recupera tutti i prodotti dall'API e aggiorna lo stato
  async function fetchProducts() {
    try {
      const response = await fetch(apiUrl);
      const list = await response.json();

      const promises = list.map(async (item) => {
        const res = await fetch(`${apiUrl}/${item.id}`);
        const data = await res.json();
        return data.product;
      });

      const fullData = await Promise.all(promises);
      setProducts(fullData);
      //log dei dati
      console.log(
        "%cProdotti caricati dal globalContext:",
        "color: #00bfff; font-weight: bold;",
        fullData
      );
    } catch (err) {
      console.error("Errore fetch:", err);
    }
  }
  //Recupero prodotti tramite id (pagina singleProduct)
  async function fetchProductById(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      console.log("Prodotto singolo caricato da GlobalContext:", data.product);
      return data.product;
    } catch (err) {
      console.error("Errore fetch singolo prodotto:", err);
      return null;
    }
  }
  // Espone stati e funzioni tramite il provider
  return (
    <GlobalContext.Provider
      value={{
        products, // Array dei prodotti disponibili
        setProducts, // Funzione per aggiornare la lista prodotti
        fetchProducts, // Funzione per recuperare tutti i prodotti dall'API
        fetchProductById, // Funzione per recuperare un singolo prodotto tramite ID
        favorites, // Array dei prodotti preferiti
        toggleFavorite, // Funzione per aggiungere/rimuovere un prodotto dai preferiti
        isFavOpen, // Stato che indica se il popup dei preferiti è visibile
        setIsFavOpen, // Funzione per mostrare/nascondere il popup dei preferiti
        compareList, // Array dei prodotti selezionati per il confronto (max 2)
        toggleCompare, // Funzione per aggiungere/rimuovere prodotti dalla lista di confronto
        showPanel, // Stato del pannello aperto e chiuso
        setShowPanel, //funzione del pannello
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
