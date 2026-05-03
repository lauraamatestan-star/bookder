import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold">My React App</h1>
        <nav className="mt-2">
          <Link to="/" className="text-white hover:underline mx-2">Home</Link>
          <Link to="/about" className="text-white hover:underline mx-2">About</Link>
          <Link to="/contact" className="text-white hover:underline mx-2">Contact</Link>
        </nav>
      </div>
    </header>
  );
}