import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  action: (formData: FormData) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
  const handleAction = (formData: FormData) => {
    const rawQuery = formData.get("query");
    const query = typeof rawQuery === "string" ? rawQuery.trim() : "";

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    action(formData);
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
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAction(formData);
          }}
        >
          <input
            className={css.input}
            type="text"
            name="query"
            placeholder="Search movies..."
            autoFocus
            autoComplete="off"
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
