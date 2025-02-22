export function Avatar({ src, alt }) {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden border">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export function AvatarFallback({ children }) {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300">
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }) {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}
