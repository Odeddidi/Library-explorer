import styles from './FavToggle.module.css';

// Props interface
interface FavToggleProps {
    isFavorite: boolean;
    setShowFav: (value: boolean) => void;
}

// FavToggle component
export default function FavToggle({ isFavorite, setShowFav }: FavToggleProps) {
    return (
        
       <button
       /* toggle favorite filter on click, change design */
       onClick={() => setShowFav(!isFavorite)}
         className= {`${styles.favBtn} ${isFavorite ? styles.active : ''}`}
         >
            {/* change button text based on favorite state */}
            {isFavorite ? "Show All Books" : "Show Favorites only"}
         </button>
    );
}