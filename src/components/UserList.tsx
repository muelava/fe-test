interface UserListProps {
    users: { login: string; avatar_url: string }[];
    onSelectUser: (username: string) => void;
}

export default function UserList({ users, onSelectUser }: UserListProps) {
    return (
        <div className="p-4">
            {users.length === 0 && <p>No users found.</p>}
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
