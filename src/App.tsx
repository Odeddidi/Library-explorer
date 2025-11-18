import React, { useState, useEffect } from 'react';
import { Book, Tag, SortOption } from './types';
import BookCard from './components/BookCard';
import SearchBlock from './components/searchBlock';
import FilterBar from './components/FilterBlock';
import SortBlock from './components/SortBlock';
import FavToggle from './components/FavToggle';
import  styles from './App.module.css';


function App() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [ search, setSearch ] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<SortOption>("title-asc");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  useEffect(() => {
    const storedFav = localStorage.getItem("favorites");
    if (storedFav) {
      setFavorites(JSON.parse(storedFav));
    }
  }, []);
  useEffect(() => {
    fetch("books.json")
    .then(res => res.json())
    .then((data:Book[]) =>setAllBooks(data))
    .catch(err => console.error(err))
  }, []);
  let filtered = allBooks
  // 1) search
  .filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  )
  // 2) tag
  .filter(book =>
    selectedTag ? book.tags.includes(selectedTag) : true
  )
  // 3) rating
  .filter(book =>
    book.rating >= minRating
  );

  if (sort === "title-asc") {
    filtered = filtered.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sort === "title-desc") {
    filtered = filtered.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  if (sort === "rating-asc") {
    filtered = filtered.sort((a, b) =>
      a.rating - b.rating
    );
  }

  if (sort === "rating-desc") {
    filtered = filtered.sort((a, b) =>
      b.rating - a.rating
    );
  }
  if (showFavoritesOnly) {
    filtered = filtered.filter(book => favorites.includes(book.id));
  }

  const resetFilter = () => {
    setSelectedTag(null);
    setMinRating(0);
    setSearch("");
  }
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
  return (
    <div>
    
      <h1 className={styles.title}> Library Explorer </h1>
      <div className={styles.a}>
      <SearchBlock search={search} setSearch={setSearch} />
      <FilterBar
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        minRating={minRating}
        setMinRating={setMinRating}
        onReset={() => resetFilter()}
      />
      <SortBlock sort={sort} setSortOption={setSort} />
      <FavToggle isFavorite={showFavoritesOnly} setShowFav={setShowFavoritesOnly} />
      </div>

      <div className={styles.grid}>
        {/** 🔵 EMPTY STATES CHECKS */}
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
          /** 🟢 Display the books when not empty */
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
