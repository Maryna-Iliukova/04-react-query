import css from "./SearchBar.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";


interface SearchBarProps {
    onSubmit: (query: string) => void;
}
  
export default function SearchBar({ onSubmit }: SearchBarProps) {
    const [query, setQuery] = useState("");
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            toast.error("Please enter your search query.");
            return;
        }

        onSubmit(trimmedQuery);
        setQuery("");
    };
  
    return (
        <header className={css.header}>
            <div className={css.container}>
                <a
                    className={css.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={css.form} onSubmit={handleSubmit}>
                    <input
                        className={css.input}
                        type="text"
                        placeholder="Search movies..."
                        autoFocus
                        autoComplete="off"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className={css.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}