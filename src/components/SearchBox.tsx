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
        <form onSubmit={handleSubmit} className="flex gap-2 p-4">
            <input
                type="text"
                placeholder="Search GitHub users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded-lg p-2 w-full"
            />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-lg cursor-pointer ">
                Search
            </button>
        </form>
    );
}
