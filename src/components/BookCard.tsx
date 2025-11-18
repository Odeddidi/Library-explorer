import React, { useState } from "react";
import { Book } from "../types";
import styles from "./BookCard.module.css";

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function BookCard({
  book,
  isFavorite,
  onToggleFavorite,
}: BookCardProps) {

  // ✔ כאן הוא צריך להיות
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.card}>
      
      {/* Favorite star */}
      <div className={styles.favStar} onClick={onToggleFavorite}>
        {isFavorite ? "★" : "☆"}
      </div>

      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>

      <div className={styles.details}>
        {book.year} • Rating: {book.rating}
      </div>

      <div>
        {book.tags.map((tag_) => (
          <span key={tag_} className={styles.tag}>
            {tag_}
          </span>
        ))}
      </div>

      {/* ✔ תיאור עם קלאמפ */}
      <div className={expanded ? styles.descExpanded : styles.desc}>
        {book.description}
      </div>

      {/* ✔ כפתור read more */}
      <button
        className={styles.readMoreBtn}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read less ▲" : "Read more ▼"}
      </button>
    </div>
  );
}
