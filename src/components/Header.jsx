import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CATEGORIES = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="header">
      <div className="logo-title">
        <Link to="/">📚 Gutendex Books</Link>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Søk etter boktittel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Søk</button>
      </form>

      <nav className="nav">
        <Link to="/favorites">⭐ Favoritter</Link>
      </nav>

      <nav className="categories">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
          >
            {cat}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
