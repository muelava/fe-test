import { useState } from "react";
import SearchBar from "./components/SearchBox";
import UserList from "./components/UserList";
import { searchUsers, getUserRepos } from "./api/github";
import { Skeleton } from "./components/Skeleton";

export default function App() {
  const [users, setUsers] = useState<{ login: string; avatar_url: string }[]>([]);
  const [repos, setRepos] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchUsers(query);
      setUsers(data.items || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSelectUser = async (username: string) => {
    setSelectedUser(username);
    setLoading(true);
    try {
      const data = await getUserRepos(username);
      setRepos(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="container max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">GitHub Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      <Skeleton />
      {loading && <Skeleton />}
      <UserList users={users} onSelectUser={handleSelectUser} />
      {selectedUser && (
        <div className="p-4">
          <h2 className="text-xl font-semibold">{selectedUser}'s Repositories:</h2>
          <ul>
            {repos.map((repo) => (
              <li key={repo.name} className="border p-2 rounded-lg">
                {repo.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
