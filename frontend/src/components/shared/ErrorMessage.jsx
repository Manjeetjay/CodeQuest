export default function ErrorMessage({ message, onAction, actionText = "Back to Problems" }) {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
                <div className="text-red-500 text-xl mb-4">{message}</div>
                {onAction && (
                    <button
                        onClick={onAction}
                        className="px-6 py-3 bg-white text-black rounded hover:bg-gray-200 transition-colors font-medium"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    );
}
