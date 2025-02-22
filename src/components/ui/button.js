export function Button({ children, onClick, variant = "primary", size = "md", className = "" }) {
    const baseStyles = "rounded px-4 py-2 transition-all duration-200 focus:outline-none";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      ghost: "text-gray-700 hover:bg-gray-200",
    };
    const sizes = {
      sm: "text-sm px-3 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
      icon: "p-2",
    };
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
      </button>
    );
  }
  