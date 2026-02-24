export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-xl font-semibold text-slate-200">{message}</div>
        </div>
    );
}
