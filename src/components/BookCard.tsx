import React, { useState } from "react";
import { Book } from "../types";
import styles from "./BookCard.module.css";

// Props interface
interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// BookCard component
export default function BookCard({
  book,
  isFavorite,
  onToggleFavorite,
}: BookCardProps) {

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.card}>
      {/* Favorite star */}
      <div className={styles.favStar} onClick={onToggleFavorite}>
        {isFavorite ? "★" : "☆"}
      </div>
        {/* Title and author */}
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>
        {/* Year and rating */}
      <div className={styles.details}>
        {book.year} • Rating: {book.rating}
      </div>
        {/* mapping tags and display */}
      <div>
        {book.tags.map((tag_) => (
          <span key={tag_} className={styles.tag}>
            {tag_}
          </span>
        ))}
      </div>

      {/* Description  */}
      <div className={expanded ? styles.descExpanded : styles.desc}>
        {book.description}
      </div>

      {/* Read more/less button */}
      <button
        className={styles.readMoreBtn}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read less ▲" : "Read more ▼"}
      </button>
    </div>
  );
}
