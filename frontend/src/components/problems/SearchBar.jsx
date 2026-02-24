export default function SearchBar({ value, onChange }) {
    return (
        <div className="flex-1">
            <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-300/60"
                placeholder="Search problems..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
