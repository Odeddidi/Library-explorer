import React from 'react';
import styles from './SearchBlock.module.css';
interface sraechBlockProps {
    search:string;
    setSearch: (newSearch: string) => void;
}

export default function SearchBlock({search, setSearch}: sraechBlockProps) {
    return (
        <div className={styles.searchContainer}>
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