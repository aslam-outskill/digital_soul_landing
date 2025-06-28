import React from 'react';

const Logo = ({ className = "w-8 h-8", textClassName = "text-xl" }: { className?: string; textClassName?: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`${className} bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg`}>
        {/* Soul essence - flowing particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 animate-pulse"></div>
        
        {/* Central soul symbol */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5/6 h-5/6 text-white" fill="currentColor">
            {/* Stylized soul/heart with digital elements */}
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            {/* Digital circuit lines */}
            <circle cx="8" cy="8" r="1" opacity="0.7"/>
            <circle cx="16" cy="8" r="1" opacity="0.7"/>
            <circle cx="12" cy="12" r="1" opacity="0.7"/>
            <line x1="8" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
            <line x1="16" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
          </svg>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
      </div>
      <span className={`${textClassName} font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
        Digital Soul
      </span>
    </div>
  );
};

export default Logo;