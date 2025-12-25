import forzahorizon from "../assets/forzahorizon.jpg";
import { Link } from "react-router-dom";
import CanvasButton from "./CanvasButton";

export default function AllCard({ products }) {
  return (
    <div>
      <div className="row">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id}>
            <div className="position-relative h-100">
              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100">
                  <img
                    src={product.imageUrl || forzahorizon}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.category}</p>
                  </div>
                </div>
              </Link>
              {/* Bottone per il confronto, in alto a destra sulla card */}
              <div
                style={{ position: "absolute", bottom: 8, right: 8, zIndex: 2 }}
              >
                <CanvasButton product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}
