export default function SearchBar({ value, onChange }) {
    return (
        <div className="flex-1">
            <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-tech-border bg-white/[0.05] text-tech-text placeholder-slate-500 focus:outline-none focus:border-tech-accent/60"
                placeholder="Search problems..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
