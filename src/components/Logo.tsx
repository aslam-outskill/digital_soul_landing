import React from 'react';

const Logo = ({ className = "w-8 h-8", textClassName = "text-xl" }: { className?: string; textClassName?: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <img 
        src="/1.png" 
        alt="Digital Soul Logo" 
        className={`${className} object-contain`}
      />
      <span className={`${textClassName} font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
        Digital Soul
      </span>
    </div>
  );
};

export default Logo;