import React, { useState, useEffect, useCallback } from "react";
import { getServerStatus } from "../../api/systemApi";
import { RefreshCw } from "lucide-react";

export default function ServerStatus() {
    const [status, setStatus] = useState("checking"); // "checking" | "live" | "down"
    const [spinning, setSpinning] = useState(false);

    const check = useCallback(async () => {
        setStatus("checking");
        setSpinning(true);
        try {
            const res = await getServerStatus();
            setStatus(res.status === "Good Health" ? "live" : "down");
        } catch {
            setStatus("down");
        } finally {
            // keep the spinner spinning for at least the animation duration
            setTimeout(() => setSpinning(false), 600);
        }
    }, []);

    useEffect(() => {
        check();
    }, [check]);

    const isLive = status === "live";
    const isChecking = status === "checking";

    return (
        <button
            onClick={check}

            disabled={isChecking}
            title="Check if the render service is running"
            className="group inline-flex items-center gap-2 rounded-tech border px-3 py-1 text-[11px] font-medium tracking-wide transition-colors select-none
                       border-tech-border bg-tech-panel/50 hover:bg-tech-panel disabled:opacity-70 disabled:cursor-wait"
        >
            <span className="relative flex h-2 w-2">
                {isLive && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tech-accent opacity-75" />
                )}
                <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${isChecking
                        ? "bg-amber-400"
                        : isLive
                            ? "bg-tech-accent"
                            : "bg-red-500"
                        }`}
                />
            </span>

            <span
                className={
                    isChecking
                        ? "text-amber-400"
                        : isLive
                            ? "text-tech-accent"
                            : "text-red-400"
                }
            >
                {isChecking ? "Checking…" : isLive ? "Live" : "Down"}
            </span>

            <RefreshCw
                className={`h-3 w-3 text-tech-muted transition-transform group-hover:text-tech-text ${spinning ? "animate-spin" : ""
                    }`}
            />
        </button>
    );
}