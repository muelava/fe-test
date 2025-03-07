import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() !== "") onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <input
                type="text"
                placeholder="Enter username"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="border border-neutral-400 rounded-lg p-2 w-full focus:outline-blue-500 transition-all duration-200 md:col-span-3"
            />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-lg cursor-pointer">
                Search
            </button>
        </form>
    );
}
