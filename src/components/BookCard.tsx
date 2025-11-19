import React, { useState, useEffect, useRef } from "react";
import { Book } from "../types";
import styles from "./BookCard.module.css";

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function BookCard({ book, isFavorite, onToggleFavorite }: BookCardProps) {
    // state to track if description is expanded
  const [expanded, setExpanded] = useState(false);
  // state to track if description is overflowing
  const [isOverflowing, setIsOverflowing] = useState(false);
  // ref to the description div
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descRef.current) {
      const el = descRef.current;
    
      // check if description overflows its container
      const overflowing = el.scrollHeight > el.clientHeight + 5;

      setIsOverflowing(overflowing);
    }
  }, [book.description]);

  return (
    <div className={styles.card}>
        {/* favorite star toggle, change on click */}
      <div className={styles.favStar} onClick={onToggleFavorite}>
        {isFavorite ? "★" : "☆"}
      </div>
       {/* book title and author */}
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>

      <div className={styles.details}>
        {book.year} • Rating: {book.rating}
      </div>

      <div>
        {book.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      {/* description */}
      <div
        ref={descRef}
        className={expanded ? styles.descExpanded : styles.desc}
      >
        {book.description}
      </div>

      {/* read more button — shown only if there is actually overflow */}
      {isOverflowing && (
        <button
          className={styles.readMoreBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read less ▲" : "Read more ▼"}
        </button>
      )}
    </div>
  );
}
