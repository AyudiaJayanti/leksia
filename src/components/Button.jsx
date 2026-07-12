export default function Button({ children, onClick, size = "md", className = "" }) {
  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2 text-sm", 
    lg: "px-8 py-2.5 text-base"
  };

  return (
    <button
      onClick={onClick}
      className={`font-linotte font-bold bg-brand hover:bg-brand-hover text-white rounded-full shadow-sm hover:shadow-md transition-all duration-150 ease-in-out cursor-pointer tracking-wide transform hover:-translate-y-0.5 ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}