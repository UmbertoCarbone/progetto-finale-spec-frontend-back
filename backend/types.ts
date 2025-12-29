export type Product = {
  title: string;           // Obbligatorio
  category: string;        // Obbligatorio
  platform?: string;       // Opzionale
  price?: number;          // Opzionale
  rating?: number;         // Opzionale
  imageUrl?: string;       // Opzionale
  description?: string;    // Opzionale
  readonly releaseYear: number; // Solo in creazione
};