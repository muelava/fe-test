import { UserRoundSearch } from "lucide-react";

interface UserListProps {
    users: { login: string; avatar_url: string }[];
    onSelectUser: (username: string) => void;
}

export default function UserList({ users, onSelectUser }: UserListProps) {
    return (
        <div className="p-4">
            {users.length === 0 && (
                <>
                    <div className="max-w-md mx-auto flex items-center flex-col">
                        <UserRoundSearch size={90} className="text-blue-300" />
                        <p className="text-neutral-700">No users found.</p>
                    </div>
                </>
            )}
            {users.map((user) => (
                <div
                    key={user.login}
                    className="flex items-center gap-4 p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => onSelectUser(user.login)}
                >
                    <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
                    <span>{user.login}</span>
                </div>
            ))}
        </div>
    );
}
