export default function SearchBar({ value, onChange }) {
    return (
        <div className="flex-1">
            <input
                type="text"
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                placeholder="Search problems..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
