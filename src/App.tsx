import React, { useState, useEffect, useMemo } from 'react';
import { Book, Tag, SortOption } from './types';
import BookCard from './components/BookCard';
import SearchBlock from './components/searchBlock';
import FilterBar from './components/FilterBlock';
import SortBlock from './components/SortBlock';
import FavToggle from './components/FavToggle';
import  styles from './App.module.css';


function App() {
  // initial states 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [ search, setSearch ] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<SortOption>("title-asc");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  // fetch books data
  useEffect(() => {
  setLoading(true);      // מתחילים טעינה
  setError(null);        // איפוס שגיאה

  fetch("books.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load books");
      return res.json();
    })
    .then((data: Book[]) => {
      setAllBooks(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError("Failed to load book data.");
      setLoading(false);
    });
  }, []);

  // load favorites from localStorage
  useEffect(() => {
    const storedFav = localStorage.getItem("favorites");
    if (storedFav) {
      setFavorites(JSON.parse(storedFav));
    }
  }, []);
  // derive all unique tags from books
  const allTags = Array.from(
    new Set(allBooks.flatMap(book => book.tags))
  );

  // filtering and sorting books, useMemo to optimize
  const filtered = useMemo(() => {
    // start with all books and filter by srarch(not case sensitive)
    let result = allBooks
      .filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      )
      // then by selected tag
      .filter(book =>
        selectedTag ? book.tags.includes(selectedTag) : true
      )
      // then by min rating
      .filter(book =>
        book.rating >= minRating
      );
    // then sort based on sort option
    if (sort === "title-asc") {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "title-desc") {
      result = result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sort === "rating-asc") {
      result = result.sort((a, b) => a.rating - b.rating);
    }

    if (sort === "rating-desc") {
      result = result.sort((a, b) => b.rating - a.rating);
    }
    // finally filter by favorites if needed
    if (showFavoritesOnly) {
      result = result.filter(book => favorites.includes(book.id));
    }

    return result;
  }, [
    allBooks,
    search,
    selectedTag,
    minRating,
    sort,
    favorites,
    showFavoritesOnly
  ]);
  // reset filter function, clears all filter states
  const resetFilter = () => {
    setSelectedTag(null);
    setMinRating(0);
    setSearch("");
  }
  // toggle favorite status and sync with localStorage
  function toggleFavorite(bookId: string) {
    setFavorites(prev => {
      let updated: string[];
      if (prev.includes(bookId)) {
        updated = prev.filter(id => id !== bookId);
      } else {
        updated = [...prev, bookId];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  }
  if (loading) {
   return <div className={styles.empty}>Loading books...</div>;
  }

  if (error) {
    return <div className={styles.empty}>{error}</div>;
  }

  return (
    
    <div>
      {/* App title */}
      <h1 className={styles.title}> Library Explorer </h1>
      {/* toolsBar: Search, Filter, Sort and favorites */}
      <div className={styles.tools}>
      <SearchBlock search={search} setSearch={setSearch} />
      <FilterBar
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        minRating={minRating}
        setMinRating={setMinRating}
        onReset={() => resetFilter()}
        tags={allTags}
      />
      <SortBlock sort={sort} setSortOption={setSort} />
      <FavToggle isFavorite={showFavoritesOnly} setShowFav={setShowFavoritesOnly} />
      </div>
      {/* Books grid , display books according to user filters or empty states */}
      <div className={styles.grid}>
        {/** empty states check */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>

            {showFavoritesOnly ? (
              <span>You have no favorite books yet.</span>
            
            ) : search ? (
              <span>No books found for "{search}".</span>
            
            ) : selectedTag || minRating > 0 ? (
              <span>No books match the selected filters.</span>
            
            ) : (
              <span>No books available.</span>
            )}

          </div>
        
        ) : (
          /** Display the books when not empty */
          filtered.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={() => toggleFavorite(book.id)}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default App;
