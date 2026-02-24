export default function ErrorMessage({ message, onAction, actionText = "Back to Problems" }) {
    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-2xl mx-auto text-center">
                <div className="text-red-300 text-lg mb-4">{message}</div>
                {onAction && (
                    <button
                        onClick={onAction}
                        className="btn-primary"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    );
}
