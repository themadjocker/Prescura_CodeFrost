function Heartbeat() {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur rounded-full shadow-sm border border-slate-100">
            <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></div>
            <svg viewBox="0 0 100 20" className="w-20 h-5 stroke-rose-500 fill-none stroke-2">
                <path d="M0,10 L10,10 L15,0 L20,20 L25,10 L30,10 L40,10" className="animate-[dash_2s_linear_infinite]" strokeDasharray="100" strokeDashoffset="100">
                    <animate attributeName="stroke-dashoffset" from="100" to="-100" dur="2s" repeatCount="indefinite" />
                </path>
            </svg>
            <span className="text-xs font-bold text-slate-500">SYS.ONLINE</span>
        </div>
    );
}

window.Heartbeat = Heartbeat;