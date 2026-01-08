export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container text-center">
        <small>© {year} GameHub • Tutti i diritti riservati</small>
      </div>
    </footer>
  );
}
