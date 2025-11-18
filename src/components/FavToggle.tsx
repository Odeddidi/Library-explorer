import styles from './FavToggle.module.css';

interface FavToggleProps {
    isFavorite: boolean;
    setShowFav: (value: boolean) => void;
}

export default function FavToggle({ isFavorite, setShowFav }: FavToggleProps) {
    return (
       <button
       onClick={() => setShowFav(!isFavorite)}
         className= {`${styles.favBtn} ${isFavorite ? styles.active : ''}`}
         >
            {isFavorite ? "Show All Books" : "Show Favorites only"}
         </button>
    );
}