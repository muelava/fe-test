import { useState } from "react";
import SearchBar from "./components/SearchBox";
import { searchUsers, getUserRepos } from "./api/github";
import { Skeleton } from "./components/Skeleton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";
import { ExternalLink, Loader, Star, UserRoundSearch } from "lucide-react";
import { Repo } from "./lib/types/App";


export default function App() {
  const [users, setUsers] = useState<{ login: string; avatar_url: string }[]>([]);
  const [repos, setRepos] = useState<{ [key: string]: { name: string }[] }>({});
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>("");

  const handleSearch = async (query: string) => {
    setQuery(query)
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
        {query && <p className="text-sm my-3">Showing users for "<b>{query}</b>" </p>}


        <Accordion type="single" className="mt-4 cursor-pointer" collapsible>
          {users.length > 0 ? (
            users.map((user) => (
              <AccordionItem key={user.login} value={user.login}>
                <AccordionTrigger
                  className="flex items-center gap-4 p-2 border-b rounded-lg justify-start hover:bg-gray-100 transition-all hover:no-underline hover:cursor-pointer mb-2"
                  onClick={() => fetchRepos(user.login)}
                >
                  <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
                  <span className="font-bold me-auto text-base">{user.login}</span>
                </AccordionTrigger>
                <AccordionContent>
                  {loading && !repos[user.login] ? (
                    <Skeleton count={1} />
                  ) : repos[user.login] && repos[user.login].length > 0 ? (
                    <ul className="list-none mt-3 pl-3">
                      {repos[user.login].map((repo: Repo) => (
                        <li key={repo.name}>
                          <a href={repo.html_url} target="_blank" className="text-neutral-700 p-3 mb-2 border rounded-lg flex justify-between hover:bg-gradient-to-l hover:from-blue-50/50 hover:to-blue-50/0 hover:text-blue-600 h-24 group relative place-items-center">
                            <div className="h-full">
                              <p className="text-sm font-semibold">{repo.name}</p>
                              <span className="line-clamp-2 text-neutral-500">{repo.description}</span>
                            </div>
                            <div className="h-full">
                              <div className="flex gap-2 items-center">
                                <span className="h-auto">{repo.stargazers_count}</span>
                                <Star size={14} className="text-yellow-500" />
                              </div>
                            </div>
                            <div className="absolute bottom-5 right-5 hidden group-hover:block">
                              <ExternalLink className="text-blue-600" size="18" />
                            </div>
                          </a>
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
            <div className="max-w-md mx-auto flex items-center flex-col mt-10">
              <UserRoundSearch size={90} className="text-blue-300" />
              <p className="text-neutral-700">No users found.</p>
            </div>
          )}
        </Accordion>

      </div>
    </>
  );
}
