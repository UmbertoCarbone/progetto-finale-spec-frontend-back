import { useGlobalContext } from "../contexts/useGlobalContext.jsx";
import forzahorizon from "../assets/forzahorizon.jpg";

export default function Homepage() {
  const { products } = useGlobalContext();

  return (
    <div className="">
      {/* Jumbotron */}
      <div className="bg-dark text-center  text-white p-5  ">
        <div className="container-fluid">
          <h1 className="display-2 pt-2">Benvenuto nel Game Store!</h1>
          <p className="display-6 pt-4">
            Scopri i migliori videogiochi, confrontali e aggiungi i tuoi
            preferiti!
          </p>
        </div>
      </div>
      {/* Fine Jumbotron */}
      <div className="container">
        <h1 className="text-center p-5">Titolo del momento</h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.imageUrl || forzahorizon}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.category}</p>
                  {/* Altri dettagli qui */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
