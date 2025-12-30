function Card({ children, className = "", variant = "glass" }) {
    // variant: 'glass' | 'neo' | 'plain'
    const baseClass = "overflow-hidden transition-all duration-300";
    
    let variantClass = "glass-panel"; // Default
    if (variant === "neo") variantClass = "neo-panel";
    if (variant === "plain") variantClass = "bg-white rounded-3xl shadow-sm border border-slate-100";

    return (
        <div className={`${baseClass} ${variantClass} ${className}`}>
            {children}
        </div>
    );
}

function CardHeader({ children, className = "" }) {
    return (
        <div className={`p-6 border-b border-slate-100/50 ${className}`}>
            {children}
        </div>
    );
}

function CardTitle({ children, className = "" }) {
    return (
        <h3 className={`text-xl font-heading font-bold text-slate-800 flex items-center gap-2 ${className}`}>
            {children}
        </h3>
    );
}

function CardContent({ children, className = "" }) {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
}

window.Card = Card;
window.CardHeader = CardHeader;
window.CardTitle = CardTitle;
window.CardContent = CardContent;