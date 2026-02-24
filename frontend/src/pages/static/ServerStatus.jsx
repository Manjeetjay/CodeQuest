import React, { useState, useEffect, useCallback } from "react";
import { getServerStatus } from "../../api/api";
import { RefreshCw } from "lucide-react";

/**
 * Compact server-status badge.
 * Shows a pulsing dot + "Live" / "Down" label with a refresh button.
 * Designed to sit inline on the Landing page (e.g. inside the hero).
 */
export default function ServerStatus() {
    const [status, setStatus] = useState("checking"); // "live" | "down" | "checking"
    const [spinning, setSpinning] = useState(false);

    const check = useCallback(async () => {
        setStatus("checking");
        setSpinning(true);
        try {
            const res = await getServerStatus();
            // Backend returns "Good Health" when healthy
            setStatus(res === "Good Health" ? "live" : "down");
        } catch {
            setStatus("down");
        } finally {
            // keep the spin animation for at least 600 ms so it feels intentional
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
            className="group inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide transition-colors select-none
                       border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] disabled:opacity-70 disabled:cursor-wait"
        >
            {/* Pulsing status dot */}
            <span className="relative flex h-2 w-2">
                {isLive && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${isChecking
                            ? "bg-amber-400"
                            : isLive
                                ? "bg-emerald-400"
                                : "bg-red-500"
                        }`}
                />
            </span>

            {/* Label */}
            <span
                className={
                    isChecking
                        ? "text-amber-400"
                        : isLive
                            ? "text-emerald-400"
                            : "text-red-400"
                }
            >
                {isChecking ? "Checking…" : isLive ? "Live" : "Down"}
            </span>

            {/* Refresh icon */}
            <RefreshCw
                className={`h-3 w-3 text-slate-500 transition-transform group-hover:text-slate-300 ${spinning ? "animate-spin" : ""
                    }`}
            />
        </button>
    );
}