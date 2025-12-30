export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const baseClass =
    "relative overflow-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none";

  let variantClass = "";
  if (variant === "primary") {
    variantClass = "btn-primary";
  } else if (variant === "destructive") {
    variantClass =
      "px-8 py-3 rounded-full bg-red-100 text-red-600 font-heading font-semibold hover:bg-red-500 hover:text-white hover:shadow-lg";
  } else if (variant === "ghost") {
    variantClass = "btn-ghost";
  }

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}


