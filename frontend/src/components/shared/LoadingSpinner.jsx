export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 animate-fade-up">
            <div className="relative w-8 h-8">
                <div className="absolute inset-0 border border-tech-border/30 animate-spin" style={{ animationDuration: "1.2s" }}></div>
                <div className="absolute inset-1 border-t border-tech-accent animate-spin" style={{ animationDuration: "0.8s" }}></div>
            </div>
            <div className="text-sm font-light text-tech-muted uppercase tracking-[0.15em]">{message}</div>
        </div>
    );
}
