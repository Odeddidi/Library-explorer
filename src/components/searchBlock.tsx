import React from 'react';
import styles from './SearchBlock.module.css';
// Props interface
interface SearchBlockProps {
    search:string;
    setSearch: (newSearch: string) => void;
}

export default function SearchBlock({search, setSearch}: SearchBlockProps) {
    return (
        <div className={styles.searchContainer}>
            {/* block input for search */}
        <input
        className={styles.input}
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}