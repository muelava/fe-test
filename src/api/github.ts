const GITHUB_API_URL = "https://api.github.com";

export async function searchUsers(username: string) {
  const response = await fetch(`${GITHUB_API_URL}/search/users?q=${username}&per_page=5`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

export async function getUserRepos(username: string) {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos`);
  if (!response.ok) throw new Error("Failed to fetch repositories");
  return response.json();
}
