import forzahorizon from "../assets/forzahorizon.jpg";
import { Link } from "react-router-dom";

export default function AllCard({ products }) {

  
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id}>
          <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
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
        </div>
      ))}
      <hr />
      
    </div>
  );
}