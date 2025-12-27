export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-1">&copy; {new Date().getFullYear()} Game Store - Progetto Boolean</p>
        <small className="">Creato da Umberto • Powered by Boolean</small>
      </div>
    </footer>
  );
}