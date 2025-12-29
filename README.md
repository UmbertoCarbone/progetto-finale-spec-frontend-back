# Game Store - Progetto Boolean Spec

Progetto full-stack per un e-commerce di videogiochi con funzionalità di confronto prodotti e gestione preferiti. Architettura moderna con React 19 frontend e Node.js/Express backend.

---

## Indice

1. [Creazione del Progetto](#creazione-del-progetto)
2. [Stack Tecnologico](#stack-tecnologico)
3. [Setup Iniziale](#setup-iniziale)
4. [Architecture](#architecture)
5. [Components](#components)
6. [Contexts](#contexts)
7. [Pages](#pages)
8. [Backend](#backend)

---

## Creazione del Progetto

### Fase 1: Setup del Frontend con Vite

Il frontend è stato generato utilizzando **Vite**, un bundler JavaScript moderno che offre:
- **HMR (Hot Module Replacement)**: Ricaricamento istantaneo durante lo sviluppo
- **Build velocissima**: Ottimizzazione con esbuild
- **Supporto nativo a React**: Plugin @vitejs/plugin-react integrato

**Comandi utilizzati:**
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### Fase 2: Installazione Dipendenze Frontend

```bash
npm install bootstrap@^5.3.8 bootstrap-icons@^1.13.1 react-router-dom@^7.11.0
npm install --save-dev eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh
```

**Dipendenze principali:**
- **React 19.2.0**: Framework UI
- **React Router DOM 7.11.0**: Gestione routing SPA
- **Bootstrap 5.3.8**: Framework CSS con sistema grid responsive
- **Bootstrap Icons 1.13.1**: Set icone SVG

### Fase 3: Setup del Backend con Node.js/Express

```bash
mkdir backend
cd backend
npm init -y
npm install express@^4.18.2 cors@^2.8.5 morgan@^1.10.0 zod@^3.22.4
npm install --save-dev typescript@^5.8.2
```

**Dipendenze principali:**
- **Express.js**: Framework HTTP server
- **CORS**: Middleware per Cross-Origin Resource Sharing
- **Morgan**: Logger middleware HTTP
- **Zod**: Schema validation TypeScript-first

### Fase 4: Struttura Directory Finale

```
progetto-finale-spec-frontend-back/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── assets/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── backend/
│   ├── server.js
│   ├── schema.js
│   ├── build-schema.js
│   ├── types.ts
│   ├── package.json
│   └── database/
│       └── product.json
│
└── README.md
```

---

## Stack Tecnologico

### Frontend Stack
| Tecnologia | Versione | Utilizzo |
|-----------|---------|----------|
| React | 19.2.0 | Framework UI, componenti |
| React Router | 7.11.0 | Routing SPA, navigazione |
| Vite | 7.2.4 | Bundler, dev server con HMR |
| Bootstrap | 5.3.8 | CSS framework, layout responsive |
| ESLint | 9.39.1 | Linting code JavaScript |

### Backend Stack
| Tecnologia | Versione | Utilizzo |
|-----------|---------|----------|
| Node.js | - | Runtime JavaScript server-side |
| Express | 4.18.2 | Framework HTTP, routing |
| Zod | 3.22.4 | Validazione schema dati |
| Morgan | 1.10.0 | HTTP request logging |
| CORS | 2.8.5 | Middleware CORS |

### Database
- **Formato**: JSON (File-based)
- **Posizione**: `backend/database/product.json`
- **Modello**: Array di oggetti Product

---

## Setup Iniziale

### Prerequisiti
- Node.js 18+ installato
- npm 9+ o yarn

### Installazione Locale

**1. Clone repository:**
```bash
git clone <repository-url>
cd progetto-finale-spec-frontend-back
```

**2. Setup Backend:**
```bash
cd backend
npm install
npm run build-schema
npm run dev  # Avvia server in watch mode
```

Server sarà disponibile su `http://localhost:3001`

**3. Setup Frontend (in nuovo terminale):**
```bash
cd frontend
npm install
npm run dev
```

Frontend sarà disponibile su `http://localhost:5173`

**4. Configurare variabili d'ambiente:**

Creare file `.env.local` nella cartella `frontend/`:
```env
VITE_REACT_APP_URL_JSON=http://localhost:3001/product
```

### Comandi Disponibili

**Frontend:**
```bash
npm run dev      # Avvia dev server Vite
npm run build    # Build per produzione
npm run preview  # Preview build produzione
npm run lint     # ESLint check
```

**Backend:**
```bash
npm run build-schema  # Genera schema.js da types.ts
npm run start         # Avvia server con schema build
npm run dev           # Avvia server in watch mode
```

---

## Architecture

### Flow Architetturale

```
┌─────────────────────────────────────────┐
│         React Frontend (Vite)           │
├─────────────────────────────────────────┤
│  Pages (Homepage, SingleProduct)        │
│  ↓                                      │
│  Components (Card, Comparison, etc.)    │
│  ↓                                      │
│  Contexts (GlobalContext con products)  │
│  ↓                                      │
│  Custom Hooks (useProductFetch)         │
└─────────────────────────────────────────┘
           ↓ (Fetch HTTP)
┌─────────────────────────────────────────┐
│      Express.js Backend (Node.js)       │
├─────────────────────────────────────────┤
│  Routes:                                │
│  GET /product          (lista)          │
│  GET /product/:id      (singolo)        │
│  POST /product         (crea)           │
│  PUT /product/:id      (modifica)       │
│  DELETE /product/:id   (elimina)        │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│    JSON Database (product.json)         │
└─────────────────────────────────────────┘
```

### State Management

Lo stato applicativo è gestito tramite:

1. **Context API (GlobalContext)**: Stato globale prodotti
   - Fetched all'avvio dall'endpoint `/product`
   - Memorizzato in `products` array

2. **Local State (useState)**: Stato locale componenti
   - `selectedIds`: Array IDs prodotti in confronto
   - `favorites`: Array IDs prodotti preferiti
   - `isFavOpen`: Boolean apertura offcanvas preferiti

3. **Query String State (React Router)**: Navigazione dinamica
   - `/` → Homepage
   - `/product/:id` → Dettaglio prodotto

---

## Components

### 1. Card

**Percorso**: `src/components/Card.jsx`

**Responsabilità**: Renderizza singola card prodotto con azioni

**Props**:
```javascript
{
  productId: number,           // ID prodotto per fetch
  onCompare: (id) => void,     // Callback toggle confronto
  isCompared: boolean,         // Stato se in confronto
  onFavorite: (id) => void,    // Callback toggle preferito
  isFavorite: boolean          // Stato se preferito
}
```

**Features**:
- Immagine prodotto (200px height, object-fit: cover)
- Titolo clickabile che naviga a `/product/:id`
- Bottone cuore (❤️/🤍) per preferiti
- Bottone "Confronta/In Confronto" con stato dinamico
- Loading state: "Caricamento..."

**Classi Bootstrap utilizzate**:
- `col-md-4 mb-4`: Grid 3 colonne responsive
- `card h-100`: Card con altezza 100%
- `btn btn-primary/btn-success`: Bottoni stile Bootstrap
- `position-absolute`: Bottone cuore sovrapposto

**Dipendenze**:
- `useProductFetch()`: Hook custom per fetch singolo prodotto
- `<Link>` da React Router: Navigazione senza reload

---

### 2. HeroSection

**Percorso**: `src/components/HeroSection.jsx`

**Responsabilità**: Sezione hero introduttiva con call-to-action

**Contenuto statico**:
- Titolo: "Prenota la tua esperienza"
- Sottotitolo: descrizione servizio
- Sfondo scuro (bg-dark)

**Classi Bootstrap**:
- `hero-section bg-dark py-5`: Sezione scura con padding verticale
- `display-4`: Titolo grande
- `fs-4`: Sottotitolo

**Utilizzo**: Inserito sopra la griglia prodotti

---

### 3. Comparison

**Percorso**: `src/components/Comparison.jsx`

**Responsabilità**: Offcanvas (sidebar scorrevole) per confrontare prodotti

**Props**:
```javascript
{
  selectedIds: number[],           // Array IDs prodotti selezionati (max 2)
  setSelectedIds: (ids) => void    // Setter per aggiornare selezione
}
```

**Features**:
- Offcanvas dal lato sinistro (offcanvas-start)
- Titolo dinamico: "Confronto (X/2)"
- Bottone chiusura (X) che resetta selectedIds
- Visibile solo se selectedIds.length > 0
- Width fissa 350px (max 90vw su mobile)

**Logica**:
- isOpen calcolato da `selectedIds.length > 0`
- Mostra ComparisonCard per ogni ID
- Callback onRemove filtra l'ID dalla lista

**Dipendenze**:
- `<ComparisonCard>`: Componente figlio per singola card

---

### 4. ComparisonCard

**Percorso**: `src/components/ComparisonCard.jsx`

**Responsabilità**: Card prodotto nel comparison, con dettagli completi

**Props**:
```javascript
{
  productId: number,        // ID per fetch
  onRemove: (id) => void    // Callback rimozione
}
```

**Features**:
- Immagine prodotto (180px height)
- Titolo prodotto
- Badge categoria
- Badge categoria (secondary)
- Prezzo con icona `bi-cash-stack`
- Descrizione prodotto
- Bottone chiusura (X) posizionato top-right

**Layout**:
- Card Bootstrap con border-0, shadow-sm
- Max-width 340px
- Immagine con border-radius superiore

---

### 5. FavoritesOffcanvas

**Percorso**: `src/components/FavoritesOffcanvas.jsx`

**Responsabilità**: Offcanvas preferiti side-right con gestione lista

**Props**:
```javascript
{
  favorites: number[],           // Array IDs preferiti
  setFavorites: (ids) => void,   // Setter preferiti
  isOpen: boolean,               // Visibilità controllata da parent
  onClose: () => void            // Callback chiusura
}
```

**Features**:
- Offcanvas dal lato destro (offcanvas-end)
- Header rosso (bg-danger text-white)
- Contatore dinamico: "I miei Preferiti (X)"
- Backdrop semi-trasparente quando aperto
- Lista FavoriteRow per ogni ID
- Bottone "Svuota Lista" se favoriti > 0

**Componente Figlio - FavoriteRow**:
- Immagine prodotto (45x45px)
- Titolo prodotto
- Bottone rimozione (×)
- Divider tra items

**Dipendenze**:
- `useProductFetch()`: Per fetch dati prodotto in lista

---

### 6. Footer

**Percorso**: `src/components/Footer.jsx`

**Responsabilità**: Footer statico con copyright e crediti

**Contenuto**:
- Copyright con anno dinamico (`new Date().getFullYear()`)
- Testo: "Game Store - Progetto Boolean"
- Crediti: "Creato da Umberto • Powered by Boolean"

**Styling**:
- `bg-dark text-white`: Sfondo scuro, testo bianco
- `py-4 mt-5`: Padding verticale, margin-top

---

## Contexts

### 1. GlobalContext

**Percorso**: `src/contexts/useGlobalContext.jsx`

**Responsabilità**: Definisce il Context API e hook personalizzato

**Contenuto**:
```javascript
export const GlobalContext = createContext()

export default function useGlobalContext() {
  return useContext(GlobalContext)
}
```

**Utilizzo**:
```javascript
const { products } = useGlobalContext()
```

**Valore fornito**: Oggetto con proprietà `products` (array prodotti)

---

### 2. GlobalProvider

**Percorso**: `src/contexts/GlobalContext.jsx`

**Responsabilità**: Provider che fetcha dati e fornisce il Context

**Flow**:
1. **useEffect** su mount: fetcha da `import.meta.env.VITE_REACT_APP_URL_JSON`
2. **Endpoint**: `/product` (lista completa)
3. **State**: `products` array inizialmente vuoto
4. **Error handling**: console.error se fetch fallisce
5. **Wrapping**: `<GlobalContext.Provider value={{ products }}>`

**Dipendenze**:
- `useState`: Per state `products`
- `useEffect`: Per fetch onmount con dipendenza da `url`
- `fetch API`: Nativo browser per HTTP

**Variabili d'ambiente**:
- `VITE_REACT_APP_URL_JSON`: URL base API (es: http://localhost:3001/product)

---

### 3. useProductFetch

**Percorso**: `src/contexts/useProductFetch.jsx`

**Responsabilità**: Hook custom per fetch singolo prodotto

**Signature**:
```javascript
function useProductFetch(productId: number): Product | null
```

**Flow**:
1. Riceve `productId` come parametro
2. Se `productId` falsy: ritorna nulla (skip fetch)
3. Fetcha `${url}/${productId}` ad ogni cambio `productId`
4. Parse risposta: accede a `.product` proprietà se presente
5. Setstate dati oppure null se errore

**Key Points**:
- Dipendenze: `[productId, url]`
- Skip intelligente se productId non definito
- Fallback per strutture risposta diverse (con/senza .product)
- Error handling: console.error + setData(null)

**Utilizzo tipico**:
```javascript
const item = useProductFetch(productId)
if (!item) return <Loading/>
return <ProductDetails {...item} />
```

---

## Pages

### 1. Homepage

**Percorso**: `src/pages/Homepage.jsx`

**Responsabilità**: Landing page principale, griglia prodotti

**State Locale**:
```javascript
const { products } = useGlobalContext()          // Prodotti globali
const [selectedIds, setSelectedIds] = useState([])    // Confronti selezionati
const [favorites, setFavorites] = useState([])        // Preferiti
const [isFavOpen, setIsFavOpen] = useState(false)     // UI apertura preferiti
```

**Funzioni Principali**:

**toggleSelect(id)**:
- Se `id` già in selectedIds → rimuovi
- Se < 2 items selezionati → aggiungi
- Max 2 prodotti confrontabili

**toggleFavorite(id)**:
- Se `id` già in favorites → rimuovi
- Altrimenti → aggiungi

**Layout**:
1. **Floating Button Preferiti** (bottom-right):
   - Visibile solo se `favorites.length > 0`
   - Posizione fixed, z-index 2000
   - Badge rosso con contatore
   - Click: apre FavoritesOffcanvas

2. **Griglia Prodotti** (row):
   - Map su `products` array
   - Card component per ogni prodotto
   - Props: `productId`, callbacks `onCompare`/`onFavorite`, states

3. **Comparison Offcanvas**:
   - Sempre presente in DOM
   - Props: `selectedIds`, `setSelectedIds`
   - Visibilità controllata da `selectedIds.length`

4. **FavoritesOffcanvas**:
   - Props: `favorites`, `setFavorites`, `isOpen`, `onClose`
   - Click bottone preferiti → `setIsFavOpen(true)`

**Design Pattern**:
- Controlled components: state gestito da parent (Homepage)
- Callbacks passati a figli per aggiornamenti
- Container/Presentational split

---

### 2. SingleProduct

**Percorso**: `src/pages/SingleProduct.jsx`

**Responsabilità**: Dettaglio singolo prodotto con layout hero

**Parametri URL**:
```javascript
const { id } = useParams()  // Estratto dalla route /product/:id
```

**Data Fetching**:
```javascript
const item = useProductFetch(id)
```

**Rendering**:

**Loading State**:
```jsx
if (!item) {
  return <h2>Caricamento prodotto in corso...</h2>
}
```

**Layout (Bootstrap Grid)**:
- Container centered (justify-content-center)
- Row gap-4 (spazio tra colonne)
- Col-md-6: Immagine (sinistra)
- Col-md-6: Dettagli (destra)
- Card con border-radius 2rem

**Sezione Immagine (Col-md-6)**:
- Bg-light rounded
- Immagine 100% width/height con object-fit: cover
- Border-radius 1rem

**Sezione Dettagli (Col-md-6)**:
- H1: Titolo prodotto (fw-bold)
- Badges: categoria, platform, releaseYear
  - `badge bg-primary`: Categoria
  - `badge bg-info`: Platform
  - `badge bg-dark`: Release Year
- Prezzo (fs-5): con icona `bi-cash-stack`
- Valutazione (fs-5): con icona `bi-star-fill` gialla
- Descrizione: testo muted italic
- Bottone: "Torna alla Home" (Link a "/", btn-primary btn-lg rounded-pill)

**Conditional Rendering**:
- `item.price !== undefined` → mostra prezzo
- `item.rating !== undefined` → mostra rating
- `item.description` → mostra descrizione
- `item.platform` → mostra badge platform
- `item.releaseYear` → mostra badge anno

**Responsive Design**:
- Col-lg-8 centerato in container
- Col-md-6 stack verticalmente su mobile (col-12)
- Immagine responsive con img-fluid

---

## Backend

### Server Setup (server.js)

**Port**: 3001

**Middleware Stack**:
1. **Morgan**: HTTP request logger (skipa OPTIONS requests)
2. **CORS**: Abilita cross-origin requests (origin: '*')
3. **Express.json**: Parser JSON payload illimitato

**Cache & Queue**:
- In-memory cache per tipo risorsa
- Write queue asincrona per operazioni file

### Routes API

#### GET /product
**Responsabilità**: Lista tutti i prodotti

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "title": "Elden Ring",
    "category": "RPG",
    "platform": "PS5",
    "price": 59.99,
    "rating": 5,
    "imageUrl": "https://...",
    "description": "Un epico GDR d'azione.",
    "releaseYear": 2022,
    "createdAt": "2025-12-24T15:43:59.227Z",
    "updatedAt": "2025-12-24T15:54:39.479Z"
  },
  ...
]
```

**Caching**:
- Dati loadati in memoria da product.json all'avvio
- Restituiti dal cache per ogni richiesta (veloce)
- Cache invalidato su POST/PUT/DELETE

---

#### GET /product/:id
**Responsabilità**: Singolo prodotto per ID

**Path Params**:
- `id`: Numero ID prodotto

**Response** (200 OK):
```json
{
  "product": {
    "id": 1,
    "title": "Elden Ring",
    ...
  }
}
```

**Error** (404 Not Found):
```json
{
  "error": "Risorsa non trovata"
}
```

---

#### POST /product
**Responsabilità**: Crea nuovo prodotto

**Request Body**:
```json
{
  "title": "Game Name",
  "category": "Category",
  "platform": "Platform",
  "price": 49.99,
  "rating": 4,
  "imageUrl": "https://...",
  "description": "Descrizione",
  "releaseYear": 2025
}
```

**Validazione** (Zod Schema):
- `title`: string (required)
- `category`: string (required)
- `platform`: string (optional)
- `price`: number (optional)
- `rating`: number (optional)
- `imageUrl`: string (optional)
- `description`: string (optional)
- `releaseYear`: number (required, readonly)
- Rifiuta proprietà extra (strict mode)

**Response** (201 Created):
```json
{
  "id": 5,
  "title": "Game Name",
  "createdAt": "2025-12-29T...",
  "updatedAt": "2025-12-29T...",
  ...
}
```

**Error** (400 Bad Request):
```json
{
  "error": "Errori di validazione:",
  "validations": [
    {
      "field": "title",
      "message": "Required"
    }
  ]
}
```

---

#### PUT /product/:id
**Responsabilità**: Modifica prodotto esistente

**Path Params**:
- `id`: Numero ID prodotto

**Request Body**: Subset dei campi (tutti opzionali)

**Proprietà Read-Only**:
- `releaseYear`: Non modificabile (errore 400 se tentato)
- `createdAt`, `id`: Non aggiornabili

**Response** (200 OK): Prodotto aggiornato

**Errors**:
- 404: Prodotto non trovato
- 400: Validazione fallita / tentativo modifica read-only

---

#### DELETE /product/:id
**Responsabilità**: Elimina prodotto

**Path Params**:
- `id`: Numero ID prodotto

**Response** (200 OK):
```json
{
  "message": "Prodotto eliminato"
}
```

**Error** (404 Not Found)

---

### Schema & Validazione (schema.js)

**Schema Zod per Product**:
```javascript
export const ProductSchema = z.object({
  id: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  title: z.string({ required_error: "Title is required" }),
  category: z.string({ required_error: "Category is required" }),
  platform: z.string().optional(),
  price: z.number().optional(),
  rating: z.number().optional(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  releaseYear: z.number(),
}).strict()
```

**Validazione**:
```javascript
function validateProduct(data) {
  // Ritorna { valid: true, data } o { valid: false, errors }
}
```

**Read-Only Properties**:
```javascript
export const readonlyProperties = {
  "product": ["releaseYear"]
}
```

---

### Database (product.json)

**Formato**: Array JSON con oggetti prodotto

**Esempio Entry**:
```json
{
  "title": "Elden Ring",
  "category": "RPG",
  "platform": "PS5",
  "price": 59.99,
  "rating": 5,
  "imageUrl": "https://gaming-cdn.com/...",
  "description": "Un epico GDR d'azione.",
  "releaseYear": 2022,
  "id": 1,
  "createdAt": "2025-12-24T15:43:59.227Z",
  "updatedAt": "2025-12-24T15:54:39.479Z"
}
```

**Campi automatici**:
- `id`: Auto-incremento (generato server)
- `createdAt`: Timestamp ISO creazione
- `updatedAt`: Timestamp ISO ultimo update

---

## Flusso Dati Completo

### Scenario: Visualizzazione Homepage

```
1. App monta
   ↓
2. GlobalProvider esegue fetch GET /product
   ↓
3. Backend legge product.json dal cache
   ↓
4. Risposta: Array di 300+ prodotti
   ↓
5. useState setProducts(data)
   ↓
6. GlobalContext.Provider value={{ products }}
   ↓
7. Homepage riceve tramite useGlobalContext()
   ↓
8. Map su products, renderizza Card per ogni
   ↓
9. Card mostra immagine, titolo, bottoni
```

### Scenario: Visualizzazione Singolo Prodotto

```
1. Click su Card → <Link to={`/product/${item.id}`}>
   ↓
2. Browser naviga a /product/1
   ↓
3. React Router monta <SingleProduct>
   ↓
4. useParams() estrae id=1
   ↓
5. useProductFetch(1) fetcha GET /product/1
   ↓
6. Backend cerca product.json per id 1
   ↓
7. Ritorna { product: {...} }
   ↓
8. Hook setData(finalData)
   ↓
9. Componente renderizza hero layout con dettagli
```

### Scenario: Confronto Prodotti

```
1. Homepage: click "Confronta" su 2 Card
   ↓
2. toggleSelect() aggiunge ID a selectedIds
   ↓
3. Comparison offcanvas diventa visibile
   ↓
4. Map su selectedIds, renderizza ComparisonCard
   ↓
5. ComparisonCard useProductFetch(id) per dati
   ↓
6. Mostra side-by-side comparison
   ↓
7. Click X rimuove: setSelectedIds(prev => prev.filter(...))
```

---

## Configurazione Sviluppo

### Variabili d'Ambiente

**Frontend (.env.local)**:
```env
VITE_REACT_APP_URL_JSON=http://localhost:3001/product
```

**Accesso in codice**:
```javascript
const url = import.meta.env.VITE_REACT_APP_URL_JSON
```

### ESLint Configuration (eslint.config.js)

Configurazione base con:
- JavaScript rules
- React hooks linting
- React refresh auto-import support

**Eseguire lint**:
```bash
npm run lint
```

---

## Troubleshooting

### Frontend non fetcha dati

1. Verificare `VITE_REACT_APP_URL_JSON` in `.env.local`
2. Verificare backend in esecuzione su port 3001
3. Verificare CORS enabled (`origin: '*'` in Express)
4. Controllare Network tab DevTools

### Backend non accetta connessioni

1. Verificare PORT 3001 libera: `netstat -ano | findstr :3001`
2. Verificare Express middleware order
3. Verificare database/product.json esiste e è valido JSON

### HMR (Hot Reload) non funziona

1. Vite di default su localhost:5173
2. Se errore di connessione: configurare in vite.config.js:
```javascript
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173
  }
})
```

---

## Performance Optimization

### Frontend
- **Bundle Splitting**: Vite automaticamente code-split routes
- **Lazy Loading**: React Router supporta lazy component loading
- **Cache Buster**: Build include hash nei nomi file

### Backend
- **In-Memory Cache**: Evita letture file per ogni GET
- **Write Queue**: Serializza operazioni file async
- **Compression**: CORS non comprime, aggiungere gzip middleware per produzione

---

## Estensioni Future

- Autenticazione utente (JWT)
- Carrello acquisti
- Pagamento (Stripe/PayPal)
- Filtri ricerca avanzati
- Paginazione backend
- WebSocket per real-time updates
- Server-side rendering (Next.js)
- Database relazionale (PostgreSQL)

---

**Ultimo aggiornamento**: 29 dicembre 2025  
**Autore**: Umberto  
**Licenza**: ISC
