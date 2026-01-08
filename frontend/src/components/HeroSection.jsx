export default function HeroSection() {
  return (
    <div className="bg-dark text-white py-5 mb-5">
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: "50vh" }}>
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="display-3 fw-bold mb-4">
              Scopri il Mondo dei 
              <span className="text-primary"> Videogiochi</span>
            </h1>
            <p className="lead mb-4">
              La tua destinazione per i migliori giochi su tutte le piattaforme.
              Esplora, confronta e trova il tuo prossimo gioco preferito.
            </p>
            {/* <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
              <button className="btn btn-primary btn-lg px-4">
                Esplora Catalogo
              </button>
              <button className="btn btn-outline-light btn-lg px-4">
                Novità
              </button>
            </div> */}
          </div>
          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600"
              alt="Gaming Hero"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}