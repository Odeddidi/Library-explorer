import React from "react";
import { Tag } from "../types";
import styles from "./FilterBlock.module.css";

// Props interface
interface FilterBarProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (v: boolean) => void;

  selectedTag: Tag | null;
  setSelectedTag: (tag: Tag | null) => void;

  minRating: number;
  setMinRating: (value: number) => void;

  onReset: () => void;
  tags: Tag[]
}


export default function FilterBar({
  isFilterOpen,
  setIsFilterOpen,
  selectedTag,
  setSelectedTag,
  minRating,
  setMinRating,
  onReset,
  tags,
}: FilterBarProps) {
  return (
    <div className={styles.wrapper}>

      {/* button and panel wrapped for the panel to open below the button */}
      <div className={styles.filterContainer}>
        {/* Filter toggle button */}
        <button
          className={styles.toggleBtn}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
        {/* button text changes based on panel state */}
          Filters {isFilterOpen ? "▲" : "▼"}
        </button>
        {/* Filter panel, shown/hidden based on isFilterOpen */}
        {isFilterOpen && (
          <div className={styles.panel}>
            {/* Tag selection */}
            <div className={styles.section}>
              <label className={styles.label}>Tag:</label>
              {/* go through all tags and create a button for each, highlighting the selected one */}
              <div className={styles.tags}>
                {tags.map((tag) => (
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
              <select
                className={styles.select}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                {/* Options from 0 to 5 in 0.5 increments */}
                {[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5].map((rating) => (
                    <option key={rating} value={rating}>
                    {rating}
                    </option>
                    ))}
                </select>
              
            </div>
          </div>
        )}
      </div>

      {/* reset button left to the filter button */}
      <button className={styles.resetBtn} onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
}
