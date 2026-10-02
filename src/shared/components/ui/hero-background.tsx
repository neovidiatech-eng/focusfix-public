"use client";

import React from "react";

export const SubtleWaves = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="absolute w-full h-full opacity-[0.05]"
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,160 C320,300 420,0 720,160 C1020,320 1120,20 1440,160 V800 H0 Z"
          fill="#4f46e5"
        />
        <path
          d="M0,320 C320,460 420,160 720,320 C1020,480 1120,180 1440,320 V800 H0 Z"
          fill="#8b5cf6"
          opacity="0.5"
        />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,white_100%)]" />
    </div>
  );
};

export const SubtleGrid = ({ className, color = "#00000008" }: { className?: string; color?: string }) => {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} 
      />
    </div>
  );
};
