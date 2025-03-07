import { useState } from "react";
import SearchBar from "./components/SearchBox";
import { searchUsers, getUserRepos } from "./api/github";
import { Skeleton } from "./components/Skeleton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";
import { Loader, UserRoundSearch } from "lucide-react";
import { Repo } from "./lib/types/App";


export default function App() {
  const [users, setUsers] = useState<{ login: string; avatar_url: string }[]>([]);
  const [repos, setRepos] = useState<{ [key: string]: { name: string }[] }>({});
  const [loading, setLoading] = useState(false);

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

  const fetchRepos = async (username: string) => {
    if (!repos[username]) {
      setLoading(true);
      try {
        const data = await getUserRepos(username);
        setRepos((prevRepos) => ({
          ...prevRepos,
          [username]: data,
        }));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };
  console.log(users)
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900/10 flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      )}
      <div className="container max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-5">GitHub Explorer</h1>
        <SearchBar onSearch={handleSearch} />

        <Accordion type="multiple" className="mt-4 cursor-pointer">
          {users.length > 0 ? (
            users.map((user) => (
              <AccordionItem key={user.login} value={user.login}>
                <AccordionTrigger
                  className="flex items-center gap-4 p-2 border rounded-lg justify-start hover:bg-gray-100 transition-all hover:no-underline hover:cursor-pointer mb-2"
                  onClick={() => fetchRepos(user.login)}
                >
                  <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
                  <span className="font-semibold me-auto">{user.login}</span>
                </AccordionTrigger>
                <AccordionContent>
                  {loading && !repos[user.login] ? (
                    <Skeleton count={1} />
                  ) : repos[user.login] && repos[user.login].length > 0 ? (
                    <ul className="list-none mt-3 pl-3">
                      {repos[user.login].map((repo: Repo) => (
                        <li key={repo.name} className="text-neutral-700 p-2 mb-2 border-b ">
                          <p className="text-base font-semibold">{repo.name}</p>
                          <span>{repo.description}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No repositories found.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="max-w-md mx-auto flex items-center flex-col">
              <UserRoundSearch size={90} className="text-blue-300" />
              <p className="text-neutral-700">No users found.</p>
            </div>
          )}
        </Accordion>

      </div>
    </>
  );
}
