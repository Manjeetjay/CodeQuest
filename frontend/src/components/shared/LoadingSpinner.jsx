export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-2xl font-semibold text-white">{message}</div>
        </div>
    );
}
