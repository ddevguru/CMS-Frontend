export function Card({ children, className }) {
    return <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="border-b pb-2 font-bold">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="mt-2">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h2 className="text-lg font-semibold">{children}</h2>;
  }
  