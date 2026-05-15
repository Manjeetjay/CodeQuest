import React, { useState, useEffect, useCallback } from "react";
import { getServerStatus } from "../../api/systemApi";
import { RefreshCw } from "lucide-react";

export default function ServerStatus() {
    const [status, setStatus] = useState("checking");
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
            setTimeout(() => setSpinning(false), 600);
        }
    }, []);

    useEffect(() => { check(); }, [check]);

    const isLive = status === "live";
    const isChecking = status === "checking";

    return (
        <button onClick={check} disabled={isChecking} title="Check if the render service is running"
            className="group inline-flex items-center gap-2 border px-3 py-1 text-xs font-medium tracking-wide transition-colors select-none
                       border-[#222] bg-[#111]/50 hover:bg-[#111] disabled:opacity-70 disabled:cursor-wait rounded">
            <span className="relative flex h-2 w-2">
                {isLive && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isChecking ? "bg-amber-400" : isLive ? "bg-orange-500" : "bg-red-500"}`} />
            </span>
            <span className={isChecking ? "text-amber-400" : isLive ? "text-orange-500" : "text-red-400"}>
                {isChecking ? "Checking…" : isLive ? "Live" : "Down"}
            </span>
            <RefreshCw className={`h-3 w-3 text-gray-500 transition-transform group-hover:text-gray-300 ${spinning ? "animate-spin" : ""}`} />
        </button>
    );
}