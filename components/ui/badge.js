function Badge({ children, variant = "default", className = "" }) {
    const baseClass = "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider";
    
    let variantClass = "";
    if (variant === "default") {
        variantClass = "bg-primary-100 text-primary-600 border border-primary-200";
    } else if (variant === "critical") {
        variantClass = "bg-red-100 text-red-600 border border-red-200 animate-pulse";
    } else if (variant === "warning") {
        variantClass = "bg-orange-100 text-orange-600 border border-orange-200";
    } else if (variant === "success") {
        variantClass = "bg-emerald-100 text-emerald-600 border border-emerald-200";
    }

    return (
        <span className={`${baseClass} ${variantClass} ${className}`}>
            {children}
        </span>
    );
}

window.Badge = Badge;