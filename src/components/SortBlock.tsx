import { SortOption } from "../types";
import styles from "./SortBlock.module.css";

interface SortBlockProps {
  sort: SortOption;
  setSortOption: (option: SortOption) => void;
}

export default function SortBlock({ sort, setSortOption }: SortBlockProps) {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>Sort by:</label>
            <select
                className={styles.select}
                value={sort}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
            >
                <option value="title-asc">Title (A-{'>'}Z)</option>
                <option value="title-desc">Title (Z-{'>'}A)</option>
                <option value="rating-asc">Rating (Low-{'>'}High)</option>
                <option value="rating-desc">Rating (High-{'>'}Low)</option>
            </select>
        </div>

    );
}