import React from "react";
import { Tag } from "../types";
import styles from "./FilterBlock.module.css";

interface FilterBarProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (v: boolean) => void;

  selectedTag: Tag | null;
  setSelectedTag: (tag: Tag | null) => void;

  minRating: number;
  setMinRating: (value: number) => void;

  onReset: () => void;
}

const TAGS: Tag[] = [
  "tech",
  "non-fiction",
  "fiction",
  "fantasy",
  "history",
  "self-help",
  "science",
];

export default function FilterBar({
  isFilterOpen,
  setIsFilterOpen,
  selectedTag,
  setSelectedTag,
  minRating,
  setMinRating,
  onReset,
}: FilterBarProps) {
  return (
    <div className={styles.wrapper}>

      {/* הכפתור והפאנל עטופים כדי שהפאנל ייפתח מתחת לכפתור */}
      <div className={styles.filterContainer}>
        <button
          className={styles.toggleBtn}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filters {isFilterOpen ? "▲" : "▼"}
        </button>

        {isFilterOpen && (
          <div className={styles.panel}>
            {/* Tag selection */}
            <div className={styles.section}>
              <label className={styles.label}>Tag:</label>
              <div className={styles.tags}>
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    className={
                      selectedTag === tag
                        ? styles.tagBtnActive
                        : styles.tagBtn
                    }
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating selection */}
            <div className={styles.section}>
              <label className={styles.label}>Minimum rating:</label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                className={styles.numberInput}
                value={minRating}
                onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v >= 0 && v <= 5) setMinRating(v);
                }}
                />
            </div>
          </div>
        )}
      </div>

      {/* Reset נפרד משמאל לכפתור */}
      <button className={styles.resetBtn} onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
}
